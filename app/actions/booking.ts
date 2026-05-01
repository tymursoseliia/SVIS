'use server';

import { supabase } from '@/lib/supabase';
import { sendTelegramNotification } from '@/lib/telegram';
import { revalidatePath } from 'next/cache';

const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
];

export async function getAvailableSlots(date: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return TIME_SLOTS.filter((_, i) => i !== 2 && i !== 5); // mock occupied slots
  }

  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('time')
      .eq('date', date)
      .eq('status', 'booked');

    if (error) {
      console.error('Error fetching bookings:', error);
      return TIME_SLOTS; // Fallback to all slots
    }

    const bookedTimes = bookings.map((b) => b.time);
    
    // Check if the entire day is blocked by admin
    if (bookedTimes.includes('ALL_DAY')) {
      return [];
    }

    return TIME_SLOTS.filter((time) => !bookedTimes.includes(time));
  } catch (error) {
    console.error('getAvailableSlots Error:', error);
    return TIME_SLOTS;
  }
}

export async function createBooking(formData: {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    await new Promise(r => setTimeout(r, 800)); // mock network delay
    return { success: true, data: { ...formData, id: 'mock-id' } };
  }

  try {
    // 1. Check if the slot is still available
    const { data: existing } = await supabase
      .from('bookings')
      .select('id')
      .eq('date', formData.date)
      .eq('time', formData.time)
      .eq('status', 'booked')
      .single();

    if (existing) {
      return { success: false, error: 'На жаль, цей час вже зайнято.' };
    }

    // 2. Insert the new booking
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          date: formData.date,
          time: formData.time,
          status: 'booked',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Booking Insert Error:', error);
      return { success: false, error: 'Помилка при збереженні запису.' };
    }

    // 3. Send Telegram Notification
    const message = `
🛎 <b>Новий запис на шиномонтаж!</b>
📅 Дата: ${formData.date}
⏰ Час: ${formData.time}
👤 Клієнт: ${formData.name}
📞 Телефон: ${formData.phone}
🔧 Послуга: ${formData.service}
    `;
    await sendTelegramNotification(message);

    // 4. Send to Google Sheets (Client Base)
    try {
      await fetch("https://script.google.com/macros/s/AKfycby-bdm4G5OqgxkZ8JIOAAVpFX9vNJF1ARDP75bXkvXA42S3ClTGQb3P0ZSmZqJmunvK/exec", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          date: formData.date,
          time: formData.time
        })
      });
    } catch (e) {
      console.error("Google Sheets Error:", e);
    }

    // Revalidate the homepage to show the updated slots
    revalidatePath('/');
    revalidatePath('/admin');

    return { success: true, data };
  } catch (error) {
    console.error('createBooking Error:', error);
    return { success: false, error: 'Сталася невідома помилка.' };
  }
}

export async function getAdminBookings(pwd: string, dateStr?: string) {
  // Mock mode for Admin
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { data: [
      { id: 'mock-1', name: 'Дмитро', phone: '0671234567', service: 'Шиномонтаж (комплекс)', date: dateStr || '', time: '09:30', status: 'active' },
      { id: 'mock-2', name: 'Олександр', phone: '0509876543', service: 'Рихтування дисків', date: dateStr || '', time: '11:30', status: 'active' }
    ], error: null };
  }

  if (pwd !== process.env.ADMIN_PASSWORD) {
    return { data: [], error: 'Невірний пароль' };
  }

  let query = supabase.from('bookings').select('*').order('date', { ascending: true }).order('time', { ascending: true });
  
  if (dateStr) {
    query = query.eq('date', dateStr);
  }

  const { data, error } = await query;
  return { data: data || [], error: null };
}

export async function cancelBooking(id: string, pwd: string) {
  // Mock mode
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: true };
  }

  if (pwd !== process.env.ADMIN_PASSWORD) {
    return { success: false, error: 'Цей запис не знайдено або він належить іншому номеру' };
  }

  const { error: cancelError } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', id);

  if (cancelError) {
    console.error('Cancel Error:', cancelError);
    return { success: false, error: 'Не вдалося скасувати запис' };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function blockDay(date: string, pwd: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { success: true };
  if (pwd !== process.env.ADMIN_PASSWORD) return { success: false, error: 'Невірний пароль' };

  const { error } = await supabase.from('bookings').insert([
    {
      name: 'SYSTEM_BLOCKED',
      phone: '0000000000',
      service: 'Вихідний день',
      date: date,
      time: 'ALL_DAY',
      status: 'booked',
    }
  ]);

  if (error) return { success: false, error: 'Помилка блокування дня' };
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function unblockDay(date: string, pwd: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { success: true };
  if (pwd !== process.env.ADMIN_PASSWORD) return { success: false, error: 'Невірний пароль' };

  const { error } = await supabase.from('bookings')
    .delete()
    .eq('date', date)
    .eq('time', 'ALL_DAY');

  if (error) return { success: false, error: 'Помилка розблокування дня' };
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function adminCreateBooking(formData: {
  date: string;
  time: string;
  name: string;
  phone: string;
  service: string;
  addToExcel: boolean;
}, pwd: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { success: true };
  if (pwd !== process.env.ADMIN_PASSWORD) return { success: false, error: 'Невірний пароль' };

  // 1. Check if the slot is still available
  const { data: existing } = await supabase
    .from('bookings')
    .select('id')
    .eq('date', formData.date)
    .eq('time', formData.time)
    .eq('status', 'booked')
    .single();

  if (existing) {
    return { success: false, error: 'На жаль, цей час вже зайнято.' };
  }

  const { error } = await supabase.from('bookings').insert([
    {
      name: formData.name || 'Офлайн клієнт',
      phone: formData.phone || '0000000000',
      service: formData.service || 'Шиномонтаж',
      date: formData.date,
      time: formData.time,
      status: 'booked',
    }
  ]);

  if (error) return { success: false, error: 'Помилка створення запису' };
  
  if (formData.addToExcel) {
    try {
      await fetch("https://script.google.com/macros/s/AKfycby-bdm4G5OqgxkZ8JIOAAVpFX9vNJF1ARDP75bXkvXA42S3ClTGQb3P0ZSmZqJmunvK/exec", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          date: formData.date,
          time: formData.time
        })
      });
    } catch (e) {
      console.error("GSheets Admin Push Error:", e);
    }
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function getActiveBookingsByPhone(phone: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { data: [
      { id: 'mock-abc', date: '2100-01-01', time: '12:00', service: 'Шиномонтаж (комплекс)', status: 'booked' }
    ], error: null };
  }

  // Only return bookings from today onwards
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('bookings')
    .select('id, date, time, service, status')
    .eq('phone', phone)
    .eq('status', 'booked')
    .gte('date', today)
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  return { data: data || [], error: error ? 'Помилка завантаження' : null };
}

export async function cancelBookingByPhone(id: string, phone: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    await new Promise(r => setTimeout(r, 600));
    return { success: true };
  }

  // Verify the booking belongs to this phone number
  const { data: existing } = await supabase
    .from('bookings')
    .select('id, date, time, name')
    .eq('id', id)
    .eq('phone', phone)
    .single();

  if (!existing) {
    return { success: false, error: 'Запис не знайдено або номер телефону не збігається.' };
  }

  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', id);

  if (error) {
    return { success: false, error: 'Помилка скасування запису.' };
  }

  // Notify admin
  const message = `
⚠️ <b>Клієнт самостійно скасував запис</b>
📅 Дата: ${existing.date}
⏰ Час: ${existing.time}
👤 Ім'я: ${existing.name}
📞 Телефон: ${phone}
  `;
  await sendTelegramNotification(message);

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function requestTires(formData: {
  width: string;
  profile: string;
  diameter: string;
  season: string;
  brand: string;
  name: string;
  phone: string;
}) {
  const message = `
🛞 <b>Новий запит на підбір шин!</b>

👤 <b>Клієнт:</b> ${formData.name}
📱 <b>Телефон:</b> ${formData.phone}

📏 <b>Параметри:</b>
• Ширина: ${formData.width || 'Не вказано'}
• Профіль: ${formData.profile || 'Не вказано'}
• Діаметр: ${formData.diameter || 'Не вказано'}

❄️/☀️ <b>Сезон:</b> ${formData.season || 'Будь-який'}
🏷 <b>Бажаний бренд:</b> ${formData.brand || 'Не вказано'}
`;

  const success = await sendTelegramNotification(message);
  
  // Send to Google Sheets (Client Base)
  try {
    await fetch("https://script.google.com/macros/s/AKfycby-bdm4G5OqgxkZ8JIOAAVpFX9vNJF1ARDP75bXkvXA42S3ClTGQb3P0ZSmZqJmunvK/exec", {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        service: `Підбір шин: ${formData.brand}, ${formData.width}/${formData.profile} R${formData.diameter}, ${formData.season}`,
        date: "",
        time: ""
      })
    });
  } catch (e) {
    console.error("Google Sheets Error:", e);
  }

  if (success) {
    return { success: true };
  } else {
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      console.log('Mocked Telegram Message:', message);
      return { success: true };
    }
    return { success: false, error: 'Помилка відправки запиту.' };
  }
}
