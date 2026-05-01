"use client";

import { useState } from "react";
import Link from "next/link";
import { getClientProfile, ClientProfile } from "@/app/actions/cabinet";

export default function CabinetPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ClientProfile | null>(null);

  const formatPhone = (val: string) => {
    // Впроваджуємо базове форматування для UX
    const cleaned = val.replace(/\D/g, "");
    if (cleaned.length === 0) return "";
    let formatted = cleaned;
    if (cleaned.startsWith("38")) formatted = cleaned.substring(2);
    if (formatted.length > 10) formatted = formatted.substring(0, 10);
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError("Введіть повний номер (10 цифр)");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const res = await getClientProfile(phone);
      if (res.success && res.data) {
        setProfile(res.data);
      } else {
        setError(res.error || "Сталася помилка при вході");
      }
    } catch {
      setError("Помилка з'єднання з сервером");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setProfile(null);
    setPhone("");
  };

  // --- ЕКРАН ВХОДУ ---
  if (!profile) {
    return (
      <main className="min-h-screen bg-dark pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
        {/* Фоновий ефект */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/10 via-dark to-dark opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
        
        <div className="max-w-md w-full mx-auto px-4 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand/30 shadow-[0_0_15px_rgba(57,255,20,0.2)]">
              <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            
            <h1 className="text-3xl font-display font-black text-center text-white mb-2 uppercase tracking-widest text-glow">
              Кабінет Клієнта
            </h1>
            <p className="text-gray-400 text-center mb-10">Введіть ваш номер телефону для входу</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Телефон</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">+38</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="067 XXX XX XX"
                    className="w-full bg-black/50 border border-white/10 focus:border-brand rounded-xl py-4 pl-14 pr-4 text-white font-medium outline-none transition-colors"
                  />
                  {phone.length === 10 && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </span>
                  )}
                </div>
                {error && <p className="text-red-400 text-sm mt-2 ml-1 animate-pulse">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading || phone.length < 10}
                className="w-full py-4 bg-brand text-dark font-black tracking-widest uppercase rounded-xl hover:bg-white transition-all btn-glow disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {loading ? (
                   <span className="w-6 h-6 border-2 border-dark border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Увійти"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // --- ЕКРАН ДАШБОРДУ ---
  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-20 relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand/5 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Кабінету */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-widest uppercase mb-1 drop-shadow-lg">
              Вітаємо, <span className="text-brand text-glow">{profile.name}</span>!
            </h1>
            <p className="text-gray-400 flex items-center gap-2">
              <span className="text-brand">●</span> Кабінет клієнта · {profile.phone}
            </p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="px-6 py-2.5 rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all text-sm font-bold tracking-widest uppercase flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Вийти
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            
            {/* Розумні нагадування */}
            {profile.reminder.type !== 'none' && (
              <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-brand/40 bg-brand/5 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand/20 rounded-full blur-3xl"></div>
                
                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-14 h-14 bg-brand/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-brand/30">
                    {profile.reminder.type === 'balance' ? (
                      <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    ) : (
                      <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-white mb-2">{profile.reminder.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">{profile.reminder.message}</p>
                    
                    {profile.reminder.progress !== undefined && (
                       <div className="space-y-2 mb-4">
                         <div className="flex justify-between text-xs font-bold text-gray-400">
                           <span>{profile.reminder.type === 'balance' ? 'Пробіг після монтажу' : 'До заміни'}</span>
                           <span className="text-brand">{profile.reminder.progress}%</span>
                         </div>
                         <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className={`h-full bg-gradient-to-r from-brand to-green-300 transition-all duration-1000 ${profile.reminder.progress > 90 ? 'animate-pulse' : ''}`}
                              style={{ width: `${profile.reminder.progress}%` }}
                            ></div>
                         </div>
                       </div>
                    )}

                    <Link href="/#booking" className="inline-flex items-center gap-2 bg-brand text-dark font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-white transition-all btn-glow text-sm">
                      {profile.reminder.type === 'balance' ? 'Записатись на Баланс' : 'Записатись на Монтаж'}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Гума на зберіганні */}
            <h2 className="text-2xl font-display font-bold uppercase text-white pb-2 flex items-center gap-3 border-b border-white/10">
              <span className="w-6 h-1 bg-brand rounded-full"></span> Мій склад
            </h2>
            
            {profile.storage.active ? (
               <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden relative group bg-[#0a0a0a]">
                 {/* Віртуальний стелаж (Background) */}
                 <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand/5 to-transparent border-t border-brand/10"></div>
                 <div className="absolute left-0 bottom-0 w-full h-8 bg-[#111] border-t-4 border-[#222]"></div>
                 
                 <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-8 sm:gap-12 items-center sm:items-start relative z-10 w-full">
                   
                   {/* Tire Visual on Shelf */}
                   <div className="relative flex-shrink-0 z-20 mt-4 sm:mt-0">
                      {/* Колеса запаковані */}
                      <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-tr from-[#050505] to-[#222] rounded-[40px] flex flex-col items-center justify-center border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                        {/* Імітація фірмового пакета SVIS */}
                        <div className="absolute inset-0 bg-brand/5 backdrop-blur-sm"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
                        <span className="font-display font-black text-brand text-4xl sm:text-5xl transform -rotate-12 z-10 opacity-70 drop-shadow-lg">SVIS</span>
                        <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-2 z-10">Фірмове пакування</span>
                      </div>
                      {/* Номер полиці */}
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-brand text-dark text-xs sm:text-sm font-black uppercase tracking-widest px-4 py-2 rounded-lg whitespace-nowrap border-b-4 border-r-4 border-green-800 shadow-xl flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        Місце {profile.storage.rackNumber}
                      </div>
                   </div>

                   {/* Stats & Document */}
                   <div className="flex-1 w-full text-center sm:text-left flex flex-col justify-between h-full">
                     <div>
                       <div className="flex items-center justify-center sm:justify-start gap-2 mb-3 text-brand font-bold uppercase tracking-widest text-[10px] sm:text-xs">
                         <span className="w-2 h-2 rounded-full bg-brand shadow-[0_0_10px_#39ff14] animate-pulse"></span>
                         Зберігається в ідеальних умовах
                       </div>
                       <h3 className="text-3xl sm:text-4xl font-display font-black text-white leading-none mb-2">{profile.storage.brand}</h3>
                       <div className="text-gray-400 font-medium text-xs sm:text-sm uppercase tracking-widest">
                         {profile.storage.season} • {profile.storage.diameter} • {profile.storage.type}
                       </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4 mt-8">
                       <div className="bg-black/60 p-4 rounded-xl border border-white/5 backdrop-blur-md">
                         <div className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 flex items-center justify-center sm:justify-start gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Протектор
                         </div>
                         <div className="flex items-end justify-center sm:justify-start gap-1">
                           <span className="text-2xl sm:text-3xl font-black text-white leading-none">{profile.storage.treadDepth}</span>
                           <span className="text-gray-400 text-xs mb-0.5">мм</span>
                           {profile.storage.treadDepth && profile.storage.treadDepth > 4.5 ? (
                             <span className="w-2 h-2 rounded-full bg-brand sm:ml-auto mb-1 shadow-[0_0_10px_#39ff14]"></span>
                           ) : (
                             <span className="w-2 h-2 rounded-full bg-yellow-500 sm:ml-auto mb-1 shadow-[0_0_10px_#eab308]"></span>
                           )}
                         </div>
                       </div>
                       <div className="bg-black/60 p-4 rounded-xl border border-white/5 backdrop-blur-md">
                         <div className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 flex items-center justify-center sm:justify-start gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Стан
                         </div>
                         <div className="text-lg sm:text-xl font-bold text-white leading-none mt-1">{profile.storage.condition}</div>
                       </div>
                     </div>

                     <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
                        <div className="text-xs text-gray-400 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          Оплачено до: <span className="text-white font-bold">{profile.storage.expiresAt}</span>
                        </div>
                        
                        {/* Акт прийому-передачі (Security Feature) */}
                        <button className="flex items-center gap-2 px-4 py-2 sm:py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest transition-all group/btn">
                          <svg className="w-4 h-4 text-brand group-hover/btn:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                          Акт (PDF)
                        </button>
                     </div>
                   </div>
                 </div>
               </div>
            ) : (
               <div className="glass-panel rounded-2xl p-8 border border-white/10 text-center flex flex-col items-center justify-center">
                 <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                 </div>
                 <h3 className="text-xl font-display font-bold text-white mb-2">Немає гуми на зберіганні</h3>
                 <p className="text-gray-400 max-w-sm mb-6">Залиште вашу гуму у нас на спеціалізованому складі. Відстежуйте її стан та записуйтесь на монтаж прямо з кабінету.</p>
                 <Link href="/prices" className="text-brand uppercase font-bold tracking-widest border border-brand/50 px-6 py-3 rounded-xl hover:bg-brand/10 transition-colors">
                   Тарифи на зберігання
                 </Link>
               </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl font-display font-bold uppercase text-white pb-2 flex items-center gap-3 border-b border-white/10">
              <span className="w-6 h-1 bg-white/20 rounded-full"></span> Історія візитів
            </h2>
            
            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
               <div className="divide-y divide-white/5">
                 {profile.history.map((visit, i) => (
                    <div key={visit.id} className="p-5 hover:bg-white/5 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-xs font-bold text-brand uppercase tracking-widest mb-1">{visit.date}</div>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-3 leading-tight">{visit.service}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          Успішно
                        </span>
                        <span className="font-bold text-gray-300">{visit.price}</span>
                      </div>
                    </div>
                 ))}
                 
                 {profile.history.length === 0 && (
                   <div className="p-8 text-center text-gray-500">
                     Історія візитів порожня
                   </div>
                 )}
               </div>
            </div>

            {/* Support Box */}
            <div className="bg-black/50 p-6 rounded-2xl border border-white/5 text-center mt-6">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Потрібна допомога?</p>
              <div className="flex flex-col gap-3">
                 <a href="tel:+380672454455" className="py-3 px-4 bg-white/5 rounded-xl text-white font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                   <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                   Зателефонувати
                 </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
