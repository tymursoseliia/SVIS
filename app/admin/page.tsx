'use client';

import { useState, useEffect } from 'react';
import { getAdminBookings, cancelBooking, blockDay, unblockDay, adminCreateBooking } from '@/app/actions/booking';
import { getVacancies, addVacancy, toggleVacancyStatus } from '@/app/actions/vacancies';

type Booking = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: string;
};

type Vacancy = {
  id: string;
  title: string;
  description: string;
  salary: string;
  active: boolean;
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [date, setDate] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Manual booking states
  const [manualTime, setManualTime] = useState('09:00');
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualService, setManualService] = useState('Шиномонтаж (на місці)');
  const [addToExcel, setAddToExcel] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Vacancy states
  const [tab, setTab] = useState<'bookings' | 'vacancies'>('bookings');
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [vacTitle, setVacTitle] = useState('');
  const [vacDesc, setVacDesc] = useState('');
  const [vacSalary, setVacSalary] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await getAdminBookings(password, date);
    if (result.error) {
      setError(result.error);
    } else {
      setBookings(result.data as Booking[]);
      setIsAuth(true);
    }
    setLoading(false);
  };

  const loadBookings = async () => {
    setLoading(true);
    const result = await getAdminBookings(password, date);
    if (!result.error) {
      setBookings(result.data as Booking[]);
    }
    setLoading(false);
  };

  const loadVacancies = async () => {
    setLoading(true);
    const result = await getVacancies();
    if (!result.error) {
      setVacancies(result.data as Vacancy[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuth) {
      if (tab === 'bookings' && date) loadBookings();
      if (tab === 'vacancies') loadVacancies();
    }
  }, [date, isAuth, tab]);

  const handleCancel = async (id: string) => {
    if (!confirm('Ви впевнені, що хочете скасувати цей запис?')) return;
    
    setLoading(true);
    const result = await cancelBooking(id, password);
    if (result.success) {
      await loadBookings();
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const isDayBlocked = bookings.some(b => b.time === 'ALL_DAY' && b.status === 'booked');

  const handleToggleBlockDay = async () => {
    const action = isDayBlocked ? 'розблокувати' : 'заблокувати';
    if (!confirm(`Ви впевнені, що хочете ${action} цей день?`)) return;

    setLoading(true);
    const result = isDayBlocked ? await unblockDay(date, password) : await blockDay(date, password);
    if (result.success) {
      await loadBookings();
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const TIME_SLOTS = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  ];

  const handleManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    const result = await adminCreateBooking({
      date,
      time: manualTime,
      name: manualName || 'Клієнт на місці',
      phone: manualPhone || '-',
      service: manualService,
      addToExcel
    }, password);

    if (result.success) {
      setManualName('');
      setManualPhone('');
      await loadBookings();
    } else {
      alert(result.error);
    }
    setIsAdding(false);
  };

  const handleAddVacancy = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    const result = await addVacancy({ title: vacTitle, description: vacDesc, salary: vacSalary }, password);
    if (result.success) {
      setVacTitle(''); setVacDesc(''); setVacSalary('');
      await loadVacancies();
    } else {
      alert(result.error);
    }
    setIsAdding(false);
  };

  const handleToggleVacancy = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    const result = await toggleVacancyStatus(id, currentStatus, password);
    if (result.success) {
      await loadVacancies();
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="glass-panel p-8 rounded-2xl max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6 text-center uppercase tracking-widest">Адмін Панель</h1>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-brand mb-6"
          />
          <button type="submit" disabled={loading} className="w-full bg-brand text-dark font-bold py-3 rounded-xl hover:bg-white transition-all">
            {loading ? 'Перевірка...' : 'Увійти'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white px-4 py-24 md:px-10 md:pt-32">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={() => setTab('bookings')} 
                className={`text-2xl md:text-3xl font-display font-bold uppercase tracking-wider transition-all ${tab === 'bookings' ? 'text-brand' : 'text-gray-500 hover:text-white'}`}
              >
                Записи
              </button>
              <span className="text-white/20">|</span>
              <button 
                onClick={() => setTab('vacancies')} 
                className={`text-2xl md:text-3xl font-display font-bold uppercase tracking-wider transition-all ${tab === 'vacancies' ? 'text-brand' : 'text-gray-500 hover:text-white'}`}
              >
                Вакансії
              </button>
            </div>
            {tab === 'bookings' && (
              <button 
                onClick={handleToggleBlockDay}
                className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider border transition-all ${isDayBlocked ? 'text-brand border-brand/50 hover:bg-brand/10' : 'text-red-400 border-red-500/50 hover:bg-red-500/10'}`}
              >
                {isDayBlocked ? '🔓 Розблокувати день' : '🔒 Заблокувати день (Вихідний)'}
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-brand font-medium appearance-none"
            />
            <button onClick={() => setIsAuth(false)} className="text-sm text-gray-400 hover:text-white underline">
              Вийти
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Завантаження...</div>
        ) : tab === 'bookings' ? (
          bookings.length === 0 ? (
            <div className="text-center py-20 text-gray-500 border border-white/5 rounded-2xl glass-panel">Немає записів на цей день.</div>
          ) : (
            <>
            {/* Ручне додавання запису */}
            <div className="glass-panel p-6 rounded-2xl mb-8 border border-white/10">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-brand">Додати запис вручну</h2>
              <form onSubmit={handleManualBooking} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <select 
                    value={manualTime} 
                    onChange={(e) => setManualTime(e.target.value)}
                    className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-brand"
                  >
                    {TIME_SLOTS.filter(t => !bookings.find(b => b.time === t && b.status === 'booked')).map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <input 
                    type="text" 
                    placeholder="Ім'я (необов'язково)" 
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-brand"
                  />
                  <input 
                    type="tel" 
                    placeholder="Телефон (необов'язково)" 
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-brand"
                  />
                  <input 
                    type="text" 
                    placeholder="Послуга" 
                    value={manualService}
                    onChange={(e) => setManualService(e.target.value)}
                    className="flex-x bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-brand"
                  />
                  <button 
                    type="submit" 
                    disabled={isAdding}
                    className="bg-brand text-dark font-bold py-3 px-6 rounded-xl hover:bg-white transition-all whitespace-nowrap"
                  >
                    {isAdding ? 'Збереження...' : '+ Зайняти час'}
                  </button>
                </div>
                <div className="flex items-center gap-2 px-2">
                  <input 
                    type="checkbox" 
                    id="addToExcel" 
                    checked={addToExcel} 
                    onChange={(e) => setAddToExcel(e.target.checked)} 
                    className="w-4 h-4 accent-brand"
                  />
                  <label htmlFor="addToExcel" className="text-sm font-bold text-gray-400 cursor-pointer">
                    Зберегти дані клієнта в таблицю Excel
                  </label>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.filter(b => b.time !== 'ALL_DAY').map((booking) => (
                <div key={booking.id} className={`glass-panel p-6 rounded-2xl border ${booking.status === 'cancelled' ? 'border-red-500/30 opacity-60' : 'border-brand/30'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-2xl font-bold text-white">{booking.time}</div>
                  <div className={`text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wider ${booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 'bg-brand/20 text-brand'}`}>
                    {booking.status === 'cancelled' ? 'Скасовано' : 'Активно'}
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="text-lg font-medium">{booking.name}</div>
                  <div className="text-gray-400 font-mono">{booking.phone}</div>
                  <div className="text-gray-300 text-sm bg-white/5 p-2 rounded-lg">{booking.service}</div>
                </div>
                {booking.status !== 'cancelled' && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="w-full py-2 rounded-xl text-sm font-bold text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all"
                  >
                    Звільнити місце
                  </button>
                )}
              </div>
            ))}
          </div>
          </>
          )
        ) : tab === 'vacancies' ? (
          <>
            <div className="glass-panel p-6 rounded-2xl mb-8 border border-brand/20 bg-brand/5">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-brand">Додати нову вакансію</h2>
              <form onSubmit={handleAddVacancy} className="flex flex-col gap-4">
                <input required type="text" placeholder="Посада (напр., Шиномонтажник)" value={vacTitle} onChange={e => setVacTitle(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-brand" />
                <input required type="text" placeholder="Зарплата (напр., 30 000 - 60 000 грн)" value={vacSalary} onChange={e => setVacSalary(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-brand" />
                <textarea required placeholder="Опис умов та вимог" value={vacDesc} onChange={e => setVacDesc(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-brand min-h-[100px]"></textarea>
                <button type="submit" disabled={isAdding} className="bg-brand text-dark font-bold py-3 px-6 rounded-xl hover:bg-white transition-all w-full md:w-auto self-start">
                  {isAdding ? 'Збереження...' : '+ Додати Вакансію'}
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {vacancies.length === 0 ? <p className="text-gray-500">Немає доданих вакансій</p> : 
                vacancies.map(v => (
                  <div key={v.id} className={`glass-panel p-6 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${v.active ? 'border-brand/30' : 'border-white/10 opacity-60'}`}>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white uppercase">{v.title}</h3>
                        <span className={`px-2 py-1 text-xs font-bold rounded-lg uppercase ${v.active ? 'bg-brand/20 text-brand' : 'bg-gray-500/20 text-gray-400'}`}>
                          {v.active ? 'Активна' : 'В архіві'}
                        </span>
                      </div>
                      <p className="text-brand font-display text-lg mb-2">{v.salary}</p>
                      <p className="text-gray-400 text-sm whitespace-pre-wrap">{v.description}</p>
                    </div>
                    <button onClick={() => handleToggleVacancy(v.id, v.active)} className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all border ${v.active ? 'text-red-400 border-red-500/30 hover:bg-red-500/10' : 'text-brand border-brand/30 hover:bg-brand/10'}`}>
                      {v.active ? 'Призупинити' : 'Активувати'}
                    </button>
                  </div>
                ))
              }
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
