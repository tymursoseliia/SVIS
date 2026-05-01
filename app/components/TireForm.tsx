'use client';

import { useState, useEffect } from 'react';
import { requestTires } from '@/app/actions/booking';

export default function TireForm({
  initialTire,
  isModal = false,
  onSuccess
}: {
  initialTire?: {
    width: string;
    profile: string;
    diameter: string;
    season: string;
    brand: string;
  };
  isModal?: boolean;
  onSuccess?: () => void;
}) {
  const [step, setStep] = useState(initialTire?.width ? 3 : 1);
  const [tireFormData, setTireFormData] = useState({
    width: initialTire?.width || '',
    profile: initialTire?.profile || '',
    diameter: initialTire?.diameter || '',
    season: initialTire?.season || 'Літо',
    brand: initialTire?.brand || '',
    name: '',
    phone: '',
  });
  const [tireLoading, setTireLoading] = useState(false);
  const [tireMessage, setTireMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null);

  useEffect(() => {
    if (initialTire?.width) {
      setStep(3);
      setTireFormData(prev => ({
        ...prev,
        width: initialTire.width,
        profile: initialTire.profile,
        diameter: initialTire.diameter,
        season: initialTire.season,
        brand: initialTire.brand,
      }));
    }
  }, [initialTire]);

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

  const handleTireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tireFormData.name || !tireFormData.phone) {
      setTireMessage({ text: 'Заповніть контактні дані.', type: 'error' });
      return;
    }

    setTireLoading(true);
    setTireMessage(null);

    const result = await requestTires(tireFormData);

    if (result.success) {
      setTireMessage({ text: 'Замовлення успішно прийнято! Впродовж 15хв менеджер зателефонує вам.', type: 'success' });
      setTireFormData({ width: '', profile: '', diameter: '', season: 'Літо', brand: '', name: '', phone: '' });
      setStep(1); // Reset to first step on success
      if (onSuccess) onSuccess();
    } else {
      setTireMessage({ text: result.error || 'Сталася помилка.', type: 'error' });
    }
    setTireLoading(false);
  };

  const nextStep = () => {
    if (step === 1 && (!tireFormData.width || !tireFormData.profile || !tireFormData.diameter)) {
      setTireMessage({ text: 'Введіть всі параметри шини (Ширина, профіль, діаметр).', type: 'error' });
      return;
    }
    setTireMessage(null);
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div id="tires" className={`glass-panel p-6 md:p-10 rounded-2xl w-full scroll-mt-32 max-w-2xl mx-auto relative overflow-hidden ${isModal ? 'shadow-[0_0_50px_rgba(57,255,20,0.15)] border-brand/40' : ''}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-3xl pointer-events-none rounded-full"></div>
      
      <h3 className="text-3xl md:text-4xl font-display font-bold text-center mb-8 uppercase tracking-widest text-white">
        {isModal ? 'Швидке' : 'Підбір'} <span className="text-brand text-glow">{isModal ? 'Замовлення' : 'Шин'}</span>
      </h3>
      
      {/* Progress Bar */}
      <div className="flex justify-center mb-8 gap-3 max-w-sm mx-auto">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 relative">
            <div className={`h-2 rounded-full transition-all duration-500 ${step >= s ? 'bg-brand shadow-[0_0_10px_rgba(57,255,20,0.5)]' : 'bg-white/10'}`}></div>
          </div>
        ))}
      </div>

      <form onSubmit={handleTireSubmit}>
        {tireMessage && (
          <div className={`mb-8 p-4 border rounded-xl text-center text-sm font-bold animate-in fade-in slide-in-from-top-2 ${tireMessage.type === 'success' ? 'bg-brand/10 text-brand border-brand/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
            {tireMessage.text}
          </div>
        )}

        {/* Step 1: Dimensions */}
        <div className={`transition-all duration-500 ${step === 1 ? 'opacity-100 translate-x-0 block' : 'opacity-0 absolute inset-0 pointer-events-none hidden'}`}>
          <h4 className="text-xl font-bold text-center text-gray-300 mb-6 uppercase tracking-wider">Крок 1: Вкажіть розмір</h4>
          <div className="grid grid-cols-3 gap-3 md:gap-5 mb-8">
            <div className="flex flex-col items-center">
              <label htmlFor="width" className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Ширина</label>
              <input type="text" id="width" value={tireFormData.width} onChange={(e) => setTireFormData({...tireFormData, width: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-2 py-4 md:py-5 text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all font-display font-bold text-center text-xl md:text-2xl" placeholder="205" />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="profile" className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Профіль</label>
              <input type="text" id="profile" value={tireFormData.profile} onChange={(e) => setTireFormData({...tireFormData, profile: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-2 py-4 md:py-5 text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all font-display font-bold text-center text-xl md:text-2xl" placeholder="55" />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="diameter" className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Діаметр</label>
              <input type="text" id="diameter" value={tireFormData.diameter} onChange={(e) => setTireFormData({...tireFormData, diameter: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-2 py-4 md:py-5 text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all font-display font-bold text-center text-xl md:text-2xl" placeholder="R16" />
            </div>
          </div>
          <button type="button" onClick={nextStep} className="w-full flex justify-center py-4 px-4 rounded-xl text-lg font-bold text-dark bg-brand hover:bg-white transition-all btn-glow uppercase tracking-widest">
            Далі
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>

        {/* Step 2: Season & Brand */}
        <div className={`transition-all duration-500 ${step === 2 ? 'opacity-100 translate-x-0 block' : 'opacity-0 absolute inset-0 pointer-events-none hidden'}`}>
          <h4 className="text-xl font-bold text-center text-gray-300 mb-6 uppercase tracking-wider">Крок 2: Сезон та Бренд</h4>
          
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide text-center">Оберіть сезон</label>
            <div className="grid grid-cols-3 gap-3">
              {['Літо', 'Зима', 'Всесезонні'].map((season) => (
                <button
                  key={season}
                  type="button"
                  onClick={() => setTireFormData({...tireFormData, season})}
                  className={`py-4 rounded-xl text-sm font-bold transition-all uppercase tracking-wide flex flex-col items-center gap-2 ${tireFormData.season === season ? 'bg-brand text-dark shadow-[0_0_15px_rgba(57,255,20,0.4)] border-transparent' : 'bg-[#0a0a0a] border border-white/10 text-gray-400 hover:border-brand/40'}`}
                >
                  {season === 'Літо' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>}
                  {season === 'Зима' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}
                  {season === 'Всесезонні' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>}
                  {season}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="brand" className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide text-center">Бажаний бренд (необов'язково)</label>
            <input type="text" id="brand" value={tireFormData.brand} onChange={(e) => setTireFormData({...tireFormData, brand: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-center font-bold text-lg" placeholder="Michelin, Continental, Pirelli..." />
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={prevStep} className="w-1/3 flex justify-center py-4 px-4 rounded-xl text-sm font-bold text-gray-400 border border-white/10 hover:border-white/30 hover:text-white transition-all uppercase tracking-widest bg-[#0a0a0a]">
              Назад
            </button>
            <button type="button" onClick={nextStep} className="w-2/3 flex justify-center items-center py-4 px-4 rounded-xl text-lg font-bold text-dark bg-brand hover:bg-white transition-all btn-glow uppercase tracking-widest">
              Далі
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>

        {/* Step 3: Contact Info */}
        <div className={`transition-all duration-500 ${step === 3 ? 'opacity-100 translate-x-0 block' : 'opacity-0 absolute inset-0 pointer-events-none hidden'}`}>
          <h4 className="text-xl font-bold text-center text-gray-300 mb-6 uppercase tracking-wider">Крок 3: Ваші контакти</h4>
          
          <div className="space-y-4 mb-8">
            <div>
              <label htmlFor="tireName" className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Ваше ім'я</label>
              <input type="text" id="tireName" required={step === 3} value={tireFormData.name} onChange={(e) => setTireFormData({...tireFormData, name: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all font-bold text-lg" placeholder="Ім'я" />
            </div>
            <div>
              <label htmlFor="tirePhone" className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Телефон</label>
              <input type="tel" id="tirePhone" required={step === 3} value={tireFormData.phone} onChange={(e) => setTireFormData({...tireFormData, phone: formatPhone(e.target.value)})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all font-bold text-lg" placeholder="+380 (67) 245-44-55" maxLength={19} />
            </div>
          </div>

          <div className="flex gap-4 border-t border-white/10 pt-6">
            <button type="button" onClick={prevStep} disabled={tireLoading} className="w-1/3 flex justify-center py-4 px-4 rounded-xl text-sm font-bold text-gray-400 border border-white/10 hover:border-white/30 hover:text-white transition-all uppercase tracking-widest bg-[#0a0a0a] disabled:opacity-50">
              Назад
            </button>
            <button type="submit" disabled={tireLoading} className="w-2/3 flex justify-center py-4 px-4 rounded-xl text-lg font-bold text-dark bg-brand hover:bg-white transition-all disabled:opacity-50 btn-glow uppercase tracking-widest">
              {tireLoading ? 'Надсилання...' : 'Отримати ціну'}
            </button>
          </div>
          <p className="text-center text-xs text-gray-600 mt-4 leading-relaxed">
            Натискаючи кнопку, ви погоджуєтеся на обробку персональних даних. Ми зателефонуємо з найкращими пропозиціями протягом 15 хвилин.
          </p>
        </div>

      </form>
    </div>
  );
}
