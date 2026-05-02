'use client';

import { useState, useEffect } from 'react';
import { getAvailableSlots, createBooking, getActiveBookingsByPhone, cancelBookingByPhone } from '@/app/actions/booking';
import { createWayForPayInvoice } from '@/app/actions/payment';
import WheelOfFortune from './WheelOfFortune';
import CustomDatePicker from './CustomDatePicker';
import { 
  CarCategory, Radius, StorageType,
  getStorageCategory, getAvailableRadii
} from '@/lib/pricing';
import { useSettings } from '@/app/providers/SettingsProvider';

const ALL_TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
];

export default function BookingForm() {
  const { prices } = useSettings();
  const [tab, setTab] = useState<'book' | 'manage'>('book');
  
  // Book Tab States
  const [date, setDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Комплекс шиномонтажу'
  });

  // Dynamic Calculator States
  const [carType, setCarType] = useState<CarCategory>('Легкові');
  const [radius, setRadius] = useState<Radius>('R15');
  const [isRunFlat, setIsRunFlat] = useState(false);
  const [storageType, setStorageType] = useState<StorageType>('Шини');
  const [wheelCount, setWheelCount] = useState(4);

  // Additional Services states
  const [washWheels, setWashWheels] = useState(false);
  const [copperGrease, setCopperGrease] = useState(false);
  const [tireBags, setTireBags] = useState(false);
  const [tireBlackening, setTireBlackening] = useState(false);
  const [mobileService, setMobileService] = useState(false);
  const [isEV, setIsEV] = useState(false);

  const [servicePackage, setServicePackage] = useState<'basic' | 'premium'>('basic');

  const handlePackageSelect = (pkg: 'basic' | 'premium') => {
    setServicePackage(pkg);
    if (pkg === 'premium') {
      setWashWheels(true);
      setCopperGrease(true);
      setTireBlackening(true);
    } else {
      setWashWheels(false);
      setCopperGrease(false);
      setTireBlackening(false);
    }
  };

  // Adjust radius if car type changes to prevent invalid combo
  useEffect(() => {
    if (carType === 'Легкові' && !getAvailableRadii('Легкові', prices).includes(radius)) setRadius('R15');
    if (carType === 'Кросовери' && !getAvailableRadii('Кросовери', prices).includes(radius)) setRadius('R17');
    if (carType === 'Мікроавтобуси') setRadius('R15-16');
  }, [carType, radius, prices]);

  const getCalculatedPrice = () => {
    let finalPrice = 0;
    if (formData.service === 'Комплекс шиномонтажу') {
      let basePrice = prices.mounting[carType]?.[radius] || 1100;
      if (isRunFlat) basePrice = Math.round(basePrice * 1.2);
      finalPrice = basePrice;
    } else if (formData.service === 'Зберігання шин') {
       const cat = getStorageCategory(radius);
       finalPrice = prices.storage.duration6[cat]?.[storageType] || 1000;
    } else if (formData.service === 'Утилізація шин') {
       finalPrice = wheelCount * 100;
    } else {
       finalPrice = prices.baseServices[formData.service] || 500;
    }

    if (formData.service === 'Комплекс шиномонтажу') {
      if (washWheels) finalPrice += 100;
      if (copperGrease) finalPrice += 200;
      if (tireBags) finalPrice += 100;
      if (tireBlackening) finalPrice += 100;
      if (mobileService) finalPrice += 1500;
    }

    return finalPrice;
  };

  const getServiceDetail = () => {
    if (formData.service === 'Комплекс шиномонтажу') {
       const features = [
         isEV ? 'EV/Гібрид' : '',
         isRunFlat ? 'Runflat' : '',
         washWheels ? 'Миття' : '',
         copperGrease ? 'Мастило' : '',
         tireBlackening ? 'Чорніння' : '',
         tireBags ? 'Пакети' : '',
         mobileService ? 'Виїзд' : ''
       ].filter(Boolean).join(', ');
       return `Шиномонтаж (${carType}, ${radius}${features ? '; ' + features : ''})`;
    }
    if (formData.service === 'Зберігання шин') {
       return `Зберігання шин (${radius}, ${storageType})`;
    }
    if (formData.service === 'Утилізація шин') {
       return `Утилізація шин (${wheelCount} шт)`;
    }
    return formData.service;
  };

  const currentPrice = getCalculatedPrice();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null);
  const [successBooking, setSuccessBooking] = useState<{ id: string, service: string, date: string, time: string, price: number } | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const formatPhone = (val: string) => {
    let digits = val.replace(/\D/g, '');
    if (digits.startsWith('380')) digits = digits.slice(3);
    else if (digits.startsWith('0')) digits = digits.slice(1);
    
    if (digits.length === 0) return '';
    
    let res = '+380 ';
    if (digits.length > 0) res += '(' + digits.substring(0, 2);
    if (digits.length >= 3) res += ') ' + digits.substring(2, 5);
    if (digits.length >= 6) res += '-' + digits.substring(5, 7);
    if (digits.length >= 8) res += '-' + digits.substring(7, 9);
    return res;
  };

  // Manage Tab States
  const [searchPhone, setSearchPhone] = useState('');
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [manageMessage, setManageMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null);

  // Set default date to today and listen for hash changes
  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    setDate(todayStr);

    const handleHashChange = () => {
      if (window.location.hash === '#booking') {
        setTab('book');
      }
    };
    
    // Initial check
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch slots when date changes
  useEffect(() => {
    if (!date || tab !== 'book') return;
    
    let isMounted = true;
    setLoading(true);
    setMessage(null);
    setSelectedTime('');

    getAvailableSlots(date).then((slots) => {
      if (isMounted) {
        setAvailableSlots(slots);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [date, tab]);

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalTime = selectedTime;
    if (formData.service === 'Утилізація шин') {
      finalTime = `Вільний час (${Date.now().toString().slice(-4)})`;
    } else if (!selectedTime) {
      setMessage({ text: 'Будь ласка, оберіть час.', type: 'error' });
      return;
    }

    if (!formData.name || !formData.phone) {
      setMessage({ text: 'Заповніть всі поля.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const detailedService = getServiceDetail();

    try {
      const result = await createBooking({
        ...formData,
        service: `${detailedService} - ${currentPrice} грн`,
        date,
        time: finalTime,
      });

      if (result.success) {
        setSuccessBooking({
          id: result.data?.id || `b-${Date.now()}`,
          service: detailedService,
          date,
          time: formData.service === 'Утилізація шин' ? 'Без привʼязки до часу' : finalTime,
          price: currentPrice
        });
        setFormData({ name: '', phone: '', service: 'Комплекс шиномонтажу' });
        setSelectedTime('');
        const slots = await getAvailableSlots(date);
        setAvailableSlots(slots);
      } else {
        setMessage({ text: result.error || 'Сталася помилка.', type: 'error' });
      }
    } catch (error) {
      console.error('Booking Client Error:', error);
      setMessage({ text: 'Сталася непередбачена помилка (таймаут). Спробуйте пізніше.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePayOnline = async () => {
    if (!successBooking) return;
    setPaymentLoading(true);
    const destination = `Оплата: ${successBooking.service} (${successBooking.date} о ${successBooking.time})`;
    const result = await createWayForPayInvoice(successBooking.price, successBooking.id, destination);
    if (result.success && result.pageUrl) {
      window.location.href = result.pageUrl;
    } else {
      alert(result.error || 'Помилка оплати');
      setPaymentLoading(false);
    }
  };

  const handleSearchBookings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchPhone) {
       setManageMessage({ text: 'Введіть номер телефону', type: 'error' });
       return;
    }
    
    setSearchLoading(true);
    setManageMessage(null);
    
    const { data, error } = await getActiveBookingsByPhone(searchPhone);
    if (error) {
      setManageMessage({ text: error, type: 'error' });
    } else {
      setMyBookings(data || []);
      if (!data || data.length === 0) {
        setManageMessage({ text: 'Активних записів не знайдено.', type: 'error' });
      }
    }
    
    setSearchLoading(false);
  };

  const handleCancelBooking = async (id: string) => {
    if (!confirm('Ви впевнені, що хочете скасувати цей запис?')) return;
    
    setSearchLoading(true);
    const result = await cancelBookingByPhone(id, searchPhone);
    
    if (result.success) {
      setManageMessage({ text: 'Запис успішно скасовано.', type: 'success' });
      handleSearchBookings(); // refresh list
    } else {
      setManageMessage({ text: result.error || 'Помилка скасування.', type: 'error' });
      setSearchLoading(false);
    }
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <div id="booking" className="glass-panel p-6 md:p-10 rounded-2xl w-full scroll-mt-32">
      <div className="flex space-x-4 mb-8 border-b border-white/10 pb-4">
        <button 
          onClick={() => setTab('book')}
          className={`text-lg md:text-xl font-bold uppercase tracking-wider pb-2 transition-all ${tab === 'book' ? 'text-brand border-b-2 border-brand' : 'text-gray-500 hover:text-white'}`}
        >
          Новий запис
        </button>
        <button 
          onClick={() => setTab('manage')}
          className={`text-lg md:text-xl font-bold uppercase tracking-wider pb-2 transition-all ${tab === 'manage' ? 'text-brand border-b-2 border-brand' : 'text-gray-500 hover:text-white'}`}
        >
          Мої записи
        </button>
      </div>

      {tab === 'book' && (successBooking ? (
        <div className="text-center py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="mb-10 w-full max-w-lg mx-auto">
             <WheelOfFortune onWin={(prize) => {
               console.log('Клієнт виграв:', prize.text);
               // Можна відправити на сервер або зберегти в LocalStorage
             }} />
          </div>

          <h3 className="text-3xl font-display font-bold text-white mb-2 uppercase tracking-wide">Ваш Запис Підтверджено!</h3>
          <p className="text-gray-400 mb-8 font-medium">Ваш час ({successBooking.time}) на дату {successBooking.date} безпечно заброньовано.</p>
          
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 mb-8 max-w-sm mx-auto text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-bl-full pointer-events-none"></div>
            <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">Послуга</div>
            <div className="text-white font-bold text-lg mb-4">{successBooking.service}</div>
            <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">До сплати</div>
            <div className="text-brand font-display text-2xl font-bold">{successBooking.price} грн</div>
          </div>
          
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            {!successBooking.service.includes('B2B') && (
              <button 
                onClick={handlePayOnline}
                disabled={paymentLoading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl text-lg font-bold text-white bg-black border hover:border-transparent border-white/20 hover:bg-[#1a1a1a] transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] btn-glow uppercase tracking-widest disabled:opacity-50"
              >
                {paymentLoading ? 'Генерація...' : 'Оплатити онлайн (Apple Pay)'}
                {!paymentLoading && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white"><path d="M16 2.5c-.88.13-2.02.68-2.61 1.4-.52.6-.96 1.55-.8 2.45.92.05 1.95-.5 2.52-1.16.55-.66.97-1.63.8-2.5-.04-.01-.08-.01-.12-.02-.12-.02-.27-.08-.57-.14l.78-.03zm4.99 15.65c-.47 1.25-1.46 2.76-2.61 2.75-.41 0-.89-.13-1.64-.13-.74 0-1.22.13-1.66.13-1.24.01-2.22-1.52-2.68-2.76-1.59-4.14-.54-7.51 1.73-8.87 1.05-.62 2.14-.94 3.01-.94 1.34 0 2.22.42 2.94.8.61.32.96.48 1.44.47.47-.02.83-.21 1.52-.56.84-.46 1.95-1.04 3.32-1.04 1.36.03 2.79.52 3.63 1.91-2.9 1.7-2.39 5.37.5 6.64-.53 1.47-1.21 2.94-1.92 3.99l-.82 1.22c-.67.96-1.39 1.99-2.59 1.99s-1.05-.33-1.98-.33c-1.05 0-1.4.34-2.01.34-.69.01-1.34-1.03-1.97-1.96-1.12-1.63-1.92-4.52-1.35-7.39zm3.51-6.85c-.09.07-.15.11-.29.13-.59.08-1.57.21-2.91-.43l-.44-.22c-.52-.3-.88-.47-1.37-.47s-.86.13-1.38.4l-.45.24c-1.39.73-2.4 1.07-3.79  1.07-2.73 0-5.11-2.31-5.11-5.1 0-.46.06-.9.17-1.32.22-.86.6-1.67 1.13-2.39.46-.62 1.02-1.15 1.66-1.55 1.13-.7 2.45-1.07 3.82-1.07 1.53 0 2.65.34 4.04.94l.43.2c.48.22.78.36 1.25.36.42 0 .72-.12 1.25-.37l.45-.21C18.66 4.96 19.86 4.6 21 4.6l.3.01.07-.05c2.47-.41 5.09.28 6.45 2.11-2.45 1.63-1.91 4.65.65 5.86-.46 1.4-1.14 2.73-1.95 3.98z" /></svg>}
              </button>
            )}
            <button 
              onClick={() => { setSuccessBooking(null); setTab('manage'); }}
              className="w-full flex justify-center items-center py-4 px-4 rounded-xl text-lg font-bold text-gray-400 bg-transparent border hover:border-gray-500 border-white/10 transition-all uppercase tracking-widest"
            >
              Оплачу на місці
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleBookSubmit}>
          <p className="text-gray-400 mb-6 font-medium text-sm">
            Бронюйте вільне віконце онлайн
          </p>

          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-brand/20 text-brand border border-brand/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            {formData.service !== 'Утилізація шин' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider text-center md:text-left">Оберіть дату</label>
              <CustomDatePicker 
                selectedDate={date} 
                onDateSelect={(newDate) => setDate(newDate)} 
                minDate={todayDate} 
              />
              <input type="hidden" id="date" required value={date} />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Вільні години</label>
              {loading && !availableSlots.length ? (
                <div className="text-gray-500 text-sm">Завантаження...</div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {ALL_TIME_SLOTS.map((time) => {
                    // Перевірка чи слот зайнятий у базі
                    const isBooked = !availableSlots.includes(time) && availableSlots.length !== ALL_TIME_SLOTS.length; 
                    // Якщо availableSlots.length === 0 і loading === false, всі зайняті.

                    // Перевірка чи минув час (Київ)
                    let isPast = false;
                    if (date === todayDate) {
                      const nowKyiv = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Kiev' }));
                      const currentVal = nowKyiv.getHours() * 60 + nowKyiv.getMinutes();
                      const [h, m] = time.split(':');
                      const slotVal = parseInt(h) * 60 + parseInt(m);
                      if (slotVal <= currentVal) isPast = true;
                    }

                    // Чи доступний взагалі?
                    const isDisabled = isBooked || isPast || (availableSlots.length === 0 && !loading);

                    return (
                      <button 
                        key={time} 
                        type="button" 
                        disabled={isDisabled}
                        onClick={() => setSelectedTime(time)} 
                        className={`py-2 rounded-lg text-sm font-bold transition-all ${
                          selectedTime === time 
                            ? 'bg-brand text-dark shadow-[0_0_15px_rgba(57,255,20,0.6)] border border-brand scale-105' 
                            : isDisabled
                              ? 'bg-[#111] text-gray-700 border border-transparent cursor-not-allowed opacity-50'
                              : 'bg-brand/10 border border-brand/40 text-brand hover:bg-brand hover:text-dark hover:scale-105'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Ваше ім'я</label>
                <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all font-medium" placeholder="Ім'я" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Телефон</label>
                <input type="tel" id="phone" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: formatPhone(e.target.value)})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all font-medium" placeholder="+380 (67) 245-44-55" maxLength={19} />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Послуга</label>
              <select id="service" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all font-medium appearance-none">
                <option value="Комплекс шиномонтажу">Заміна сезонної гуми (комплекс)</option>
                <option value="Балансування">Балансування</option>
                <option value="Рихтування дисків">Рихтування дисків</option>
                <option value="Зберігання шин">Зберігання шин</option>
                <option value="Утилізація шин">Утилізація шин</option>
                <option value="Корпоративне обслуговування (B2B)">Корпоративне обслуговування (B2B)</option>
              </select>
            </div>

            {/* Dynamic fields for Calculator */}
            {formData.service === 'Комплекс шиномонтажу' && (
              <div className="p-4 rounded-xl border border-brand/20 bg-brand/5 space-y-4 animate-in fade-in slide-in-from-top-2">
                <h4 className="text-brand font-bold uppercase tracking-wider text-xs mb-2">Деталі для розрахунку</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Тип авто</label>
                    <select value={carType} onChange={(e) => setCarType(e.target.value as CarCategory)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand">
                      <option value="Легкові">Легковий</option>
                      <option value="Кросовери">Кросовер / Джип</option>
                      <option value="Мікроавтобуси">Мікроавтобус / Бус</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Радіус</label>
                    <select value={radius} onChange={(e) => setRadius(e.target.value as Radius)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand">
                      {getAvailableRadii(carType, prices).map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* VIP Paсkages */}
                <div className="mt-4 pt-4 border-t border-brand/10">
                   <h4 className="text-brand font-bold uppercase tracking-wider text-[10px] mb-3">Оберіть пакет послуг</h4>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Basic */}
                      <div 
                        onClick={() => handlePackageSelect('basic')}
                        className={`cursor-pointer border p-4 rounded-2xl transition-all ${servicePackage === 'basic' ? 'bg-[#111] border-white/30 shadow-md transform scale-100' : 'bg-[#050505] border-transparent opacity-60 hover:opacity-100 scale-95'}`}
                      >
                         <div className="flex justify-between items-start mb-2">
                            <h5 className="font-display font-black text-white uppercase tracking-widest text-lg">Базовий</h5>
                            {servicePackage === 'basic' && <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>}
                         </div>
                         <p className="text-xs text-gray-500 font-medium">Стандартний монтаж, зняття, встановлення, точне 3D-балансування.</p>
                      </div>

                      {/* Premium */}
                      <div 
                        onClick={() => handlePackageSelect('premium')}
                        className={`relative overflow-hidden cursor-pointer border p-4 rounded-2xl transition-all ${servicePackage === 'premium' ? 'bg-brand/10 border-brand shadow-[0_0_20px_rgba(57,255,20,0.2)] transform scale-100' : 'bg-[#050505] border-white/10 hover:border-brand/40 scale-95'}`}
                      >
                         {servicePackage === 'premium' && <div className="absolute top-0 right-0 w-16 h-16 bg-brand/20 blur-xl rounded-full"></div>}
                         <div className="absolute top-0 right-0 bg-brand text-dark text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-widest">Вигідно</div>
                         <div className="flex justify-between items-start mb-2">
                            <h5 className="font-display font-black text-brand uppercase tracking-widest text-lg">Преміум VIP</h5>
                            {servicePackage === 'premium' && <div className="w-4 h-4 bg-brand rounded-full flex items-center justify-center"><svg className="w-3 h-3 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>}
                         </div>
                         <p className="text-xs text-gray-400 font-medium">Все що в базовому + <span className="text-brand font-bold">Миття коліс, Мідне мастило ступиць та Преміум Чорніння!</span></p>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-brand/10">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={isRunFlat} onChange={(e) => setIsRunFlat(e.target.checked)} className="w-5 h-5 rounded border-brand/50 bg-[#0a0a0a] text-brand focus:ring-brand accent-brand transition-colors" />
                    <span className="text-sm font-medium text-white group-hover:text-brand transition-colors">Низький профіль / RunFlat (+20%)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={washWheels} onChange={(e) => setWashWheels(e.target.checked)} className="w-5 h-5 rounded border-brand/50 bg-[#0a0a0a] text-brand focus:ring-brand accent-brand transition-colors" />
                    <span className="text-sm font-medium text-white group-hover:text-brand transition-colors">Миття коліс (+100 ₴)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={copperGrease} onChange={(e) => setCopperGrease(e.target.checked)} className="w-5 h-5 rounded border-brand/50 bg-[#0a0a0a] text-brand focus:ring-brand accent-brand transition-colors" />
                    <span className="text-sm font-medium text-white group-hover:text-brand transition-colors">Мідне мастило (+200 ₴)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={tireBlackening} onChange={(e) => setTireBlackening(e.target.checked)} className="w-5 h-5 rounded border-brand/50 bg-[#0a0a0a] text-brand focus:ring-brand accent-brand transition-colors" />
                    <span className="text-sm font-medium text-white group-hover:text-brand transition-colors">Чорніння гуми (+100 ₴)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={tireBags} onChange={(e) => setTireBags(e.target.checked)} className="w-5 h-5 rounded border-brand/50 bg-[#0a0a0a] text-brand focus:ring-brand accent-brand transition-colors" />
                    <span className="text-sm font-medium text-white group-hover:text-brand transition-colors">Фірмові пакети (+100 ₴)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={isEV} onChange={(e) => setIsEV(e.target.checked)} className="w-5 h-5 rounded border-brand/50 bg-[#0a0a0a] text-brand focus:ring-brand accent-brand transition-colors" />
                    <span className="text-sm font-medium text-white group-hover:text-brand transition-colors">Електро / Гібрид</span>
                  </label>
                </div>
                
                <div className="mt-4 pt-4 border-t border-brand/10 relative opacity-60 overflow-hidden rounded-xl bg-white/5 p-4 border border-white/5">
                   <div className="absolute right-3 top-3 bg-brand text-dark font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg animate-pulse">Скоро</div>
                   <label className="flex items-center gap-3 cursor-not-allowed group">
                    <input type="checkbox" disabled checked={false} onChange={() => {}} className="w-6 h-6 rounded border-gray-600 bg-[#050505] text-gray-500 cursor-not-allowed" />
                    <span className="text-base font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       Виїзний шиномонтаж 
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-2 ml-9 max-w-sm">Повноцінна мобільна майстерня в розробці. Ми зможемо приїхати до вас у будь-яку точку міста!</p>
                </div>
              </div>
            )}

            {formData.service === 'Зберігання шин' && (
              <div className="p-4 rounded-xl border border-brand/20 bg-brand/5 space-y-4 animate-in fade-in slide-in-from-top-2">
                <h4 className="text-brand font-bold uppercase tracking-wider text-xs mb-2">Деталі для розрахунку (за сезон)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Радіус</label>
                    <select value={radius} onChange={(e) => setRadius(e.target.value as Radius)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand">
                      <option value="R15">R13 - R16</option>
                      <option value="R17">R17 - R18</option>
                      <option value="R19">R19 - R23</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Комплектація</label>
                    <select value={storageType} onChange={(e) => setStorageType(e.target.value as StorageType)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand">
                      <option value="Шини">Тільки шини</option>
                      <option value="Гума з дисками">Шини з дисками</option>
                      <option value="Окремо диски">Окремо диски</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {formData.service === 'Утилізація шин' && (
              <div className="p-4 rounded-xl border border-brand/20 bg-brand/5 space-y-4 animate-in fade-in slide-in-from-top-2">
                <h4 className="text-brand font-bold uppercase tracking-wider text-xs mb-2">Кількість шин на утилізацію</h4>
                <div className="flex items-center gap-4">
                  <input type="range" min="1" max="8" value={wheelCount} onChange={(e) => setWheelCount(parseInt(e.target.value))} className="w-full accent-brand" />
                  <span className="text-xl font-bold text-white min-w-[30px]">{wheelCount} шт</span>
                </div>
              </div>
            )}

            {/* Calculated Price Display */}
            {['Комплекс шиномонтажу', 'Зберігання шин', 'Утилізація шин'].includes(formData.service) && (
               <div className="flex justify-between items-center bg-[#0a0a0a] p-5 rounded-xl border border-white/10 mt-4 shadow-inner">
                 <span className="text-gray-400 uppercase tracking-widest text-xs font-bold">Орієнтовна вартість</span>
                 <span className="text-brand font-display font-bold text-3xl text-glow">{currentPrice} ₴</span>
               </div>
            )}

            <button type="button" onClick={(e) => { if (selectedTime || formData.service === 'Утилізація шин') handleBookSubmit(e as any); else alert('Будь ласка, проскрольте вгору та оберіть вільний час для візиту!'); }} disabled={loading} className={`w-full flex justify-center py-4 px-4 rounded-xl text-lg font-display font-bold text-dark transition-all disabled:opacity-50 btn-glow mt-8 uppercase tracking-widest ${(!selectedTime && formData.service !== 'Утилізація шин') ? 'bg-gray-500 hover:bg-gray-400 cursor-not-allowed' : 'bg-brand hover:bg-white'}`}>
              {loading ? 'Збереження...' : (!selectedTime && formData.service !== 'Утилізація шин') ? 'Спочатку оберіть час' : 'Записатися'}
            </button>
            <div className="flex items-center justify-center gap-3 mt-4 text-gray-400 text-sm font-medium font-sans">
              <span className="flex items-center">
                Visa / Mastercard
              </span>
              <span className="opacity-30">|</span>
              <span className="flex items-center">
                Apple Pay / Google Pay
              </span>
            </div>
          </div>
        </form>
      ))}

      {tab === 'manage' && (
        <div>
          <p className="text-gray-400 mb-6 font-medium text-sm">
            Введіть свій номер телефону, щоб знайти та скасувати активні записи.
          </p>

          {manageMessage && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${manageMessage.type === 'success' ? 'bg-brand/20 text-brand border border-brand/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
              {manageMessage.text}
            </div>
          )}

          <form onSubmit={handleSearchBookings} className="flex gap-4 mb-8">
            <input 
              type="tel" 
              required 
              value={searchPhone} 
              onChange={(e) => setSearchPhone(formatPhone(e.target.value))} 
              className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all font-medium" 
              placeholder="+380 (67) 245-44-55" 
              maxLength={19}
            />
            <button 
              type="submit" 
              disabled={searchLoading || !searchPhone}
              className="px-6 py-3 rounded-xl font-bold text-dark bg-brand hover:bg-white transition-all disabled:opacity-50"
            >
              {searchLoading ? 'Пошук...' : 'Знайти'}
            </button>
          </form>

          {myBookings.length > 0 && (
            <div className="space-y-4">
              {myBookings.map((booking) => (
                <div key={booking.id} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="text-brand font-bold text-lg">{booking.date} о {booking.time}</div>
                    <div className="text-gray-400 text-sm mt-1">{booking.service}</div>
                  </div>
                  <button 
                    onClick={() => handleCancelBooking(booking.id)}
                    disabled={searchLoading}
                    className="px-4 py-2 rounded-lg font-bold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all text-sm w-full md:w-auto"
                  >
                    Скасувати запис
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
