'use server';

export type ClientStorage = {
  active: boolean;
  brand?: string;
  season?: 'Літня' | 'Зимова';
  diameter?: string;
  treadDepth?: number;
  rackNumber?: string;
  expiresAt?: string;
  condition?: 'Відмінний' | 'Добре' | 'Задовільно' | 'Потребує заміни';
  type?: 'Шини' | 'З дисками';
};

export type ClientReminder = {
  type: 'balance' | 'season' | 'storage_renewal' | 'none';
  title?: string;
  message?: string;
  progress?: number; // 0-100%
  kmLeft?: number;
};

export type ClientHistory = {
  id: string;
  date: string;
  service: string;
  price: string;
};

export type ClientProfile = {
  phone: string;
  name: string;
  storage: ClientStorage;
  reminder: ClientReminder;
  history: ClientHistory[];
  lastVisit: string;
};

// Простий генератор псевдовипадкових чисел на основі телефону (щоб результати були однакові для одного номера)
function hashPhone(phone: string): number {
  let hash = 0;
  for (let i = 0; i < phone.length; i++) {
    hash = Math.imul(31, hash) + phone.charCodeAt(i) | 0;
  }
  return Math.abs(hash);
}

export async function getClientProfile(phone: string): Promise<{ success: boolean; data?: ClientProfile; error?: string }> {
  // Симулюємо затримку мережі для UI
  await new Promise(r => setTimeout(r, 600));

  // Перевірка формату номера (базова)
  const cleanedPhone = phone.replace(/\D/g, '');
  if (cleanedPhone.length < 10) {
    return { success: false, error: 'Введіть коректний номер телефону' };
  }

  // Тимчасовий захист: демо-дані показуємо лише для тестового номера
  if (!cleanedPhone.endsWith('0666777721')) {
     return { success: false, error: 'Користувача не знайдено. Спочатку скористайтесь нашими послугами на сервісі.' };
  }

  const hash = hashPhone(cleanedPhone);
  
  // Генерація демо-даних на основі хешу
  
  // 1. Імена
  const names = ['Олександр', 'Дмитро', 'Андрій', 'Максим', 'Сергій', 'Олена', 'Наталія', 'Марина'];
  const name = names[hash % names.length];

  // 2. Зберігання (80% клієнтів мають зберігання у нашому моці)
  const hasStorage = hash % 10 < 8;
  const brands = ['Michelin Pilot Sport 4S', 'Goodyear Eagle F1', 'Continental PremiumContact-6', 'Pirelli P Zero', 'Bridgestone Turanza', 'Hankook Ventus Prime'];
  const racks = ['A-12', 'B-04', 'C-22', 'A-05', 'D-11', 'E-08'];
  
  const storage: ClientStorage = hasStorage ? {
    active: true,
    brand: brands[hash % brands.length],
    season: hash % 2 === 0 ? 'Літня' : 'Зимова',
    diameter: `R${15 + (hash % 6)}`,
    treadDepth: parseFloat((4 + ((hash % 40) / 10)).toFixed(1)), // від 4.0 до 7.9 мм
    rackNumber: racks[hash % racks.length],
    expiresAt: '2025-11-15',
    condition: (hash % 10 > 2) ? 'Добре' : 'Задовільно',
    type: hash % 3 === 0 ? 'З дисками' : 'Шини'
  } : { active: false };

  // 3. Нагадування (Балансування або Сезонка)
  let reminder: ClientReminder;
  const remType = hash % 3;
  
  if (remType === 0) {
    // Балансування
    const kmDriven = 2000 + (hash % 4000); // 2000-6000
    const kmTotal = 5000;
    const progress = Math.min(100, Math.round((kmDriven / kmTotal) * 100));
    
    reminder = {
      type: 'balance',
      title: 'Рекомендація: Балансування',
      message: `Ви проїхали орієнтовно ${kmDriven} км після останнього шиномонтажу. Рекомендуємо перевірити баланс після 5000 км.`,
      progress: progress,
      kmLeft: Math.max(0, kmTotal - kmDriven)
    };
  } else if (remType === 1 && hasStorage) {
    // Сезонна заміна
    reminder = {
      type: 'season',
      title: 'Час перевзуватись!',
      message: `Ваша ${storage.season === 'Літня' ? 'Літня' : 'Зимова'} гума вже чекає на вас на стелажі ${storage.rackNumber}. Запишіться на монтаж без черг.`,
      progress: 100
    };
  } else {
    // Немає нагадувань
    reminder = { type: 'none' };
  }

  // 4. Історія візитів
  const history: ClientHistory[] = [
    {
      id: `visit-${hash}-1`,
      date: '12 Травня 2024',
      service: 'Сезонний шиномонтаж + Зберігання',
      price: '2 800 грн'
    },
    {
      id: `visit-${hash}-2`,
      date: '04 Листопада 2023',
      service: 'Шиномонтаж (комплекс)',
      price: '1 400 грн'
    }
  ];

  const profile: ClientProfile = {
    phone: phone,
    name: name,
    storage: storage,
    reminder: reminder,
    history: history,
    lastVisit: history[0].date
  };

  return { success: true, data: profile };
}
