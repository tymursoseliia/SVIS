'use client';

import { useState, useMemo } from 'react';
import { DUMMY_TIRES, TireProduct, Season } from '@/lib/tiresData';
import TireForm from './TireForm';

export default function TireCatalog() {
  const [seasonFilter, setSeasonFilter] = useState<Season | 'Усі'>('Усі');
  const [widthFilter, setWidthFilter] = useState<string>('Усі');
  const [profileFilter, setProfileFilter] = useState<string>('Усі');
  const [diameterFilter, setDiameterFilter] = useState<string>('Усі');
  const [brandFilter, setBrandFilter] = useState<string>('Усі');
  
  const [selectedTire, setSelectedTire] = useState<TireProduct | null>(null);

  // Extract unique values for filters
  const uniqueWidths = useMemo(() => Array.from(new Set(DUMMY_TIRES.map(t => t.width))).sort(), []);
  const uniqueProfiles = useMemo(() => Array.from(new Set(DUMMY_TIRES.map(t => t.profile))).sort(), []);
  const uniqueDiameters = useMemo(() => Array.from(new Set(DUMMY_TIRES.map(t => t.diameter))).sort(), []);
  const uniqueBrands = useMemo(() => Array.from(new Set(DUMMY_TIRES.map(t => t.brand))).sort(), []);

  const filteredTires = useMemo(() => {
    return DUMMY_TIRES.filter(t => {
      if (seasonFilter !== 'Усі' && t.season !== seasonFilter) return false;
      if (widthFilter !== 'Усі' && t.width !== widthFilter) return false;
      if (profileFilter !== 'Усі' && t.profile !== profileFilter) return false;
      if (diameterFilter !== 'Усі' && t.diameter !== diameterFilter) return false;
      if (brandFilter !== 'Усі' && t.brand !== brandFilter) return false;
      return true;
    });
  }, [seasonFilter, widthFilter, profileFilter, diameterFilter, brandFilter]);

  const resetFilters = () => {
    setSeasonFilter('Усі');
    setWidthFilter('Усі');
    setProfileFilter('Усі');
    setDiameterFilter('Усі');
    setBrandFilter('Усі');
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-5xl font-display font-black text-center mb-10 tracking-widest uppercase text-white drop-shadow-lg">
        Каталог <span className="text-brand text-glow">Шин</span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* --- СІДБАР (ФІЛЬТРИ) --- */}
        <div className="w-full lg:w-1/4">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 sticky top-32">
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider flex items-center justify-between">
              Фільтр
              <button onClick={resetFilters} className="text-xs text-brand hover:text-white transition-colors">Скинути все</button>
            </h3>

            <div className="space-y-6">
              {/* Season */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">Сезон</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Усі', 'Літо', 'Зима', 'Всесезонні'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSeasonFilter(s as Season | 'Усі')}
                      className={`py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wide ${seasonFilter === s ? 'bg-brand text-dark shadow-[0_0_10px_rgba(57,255,20,0.4)]' : 'bg-[#0a0a0a] border border-white/10 text-gray-400 hover:border-brand/40'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Width */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Ширина</label>
                <select value={widthFilter} onChange={e => setWidthFilter(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand">
                  <option value="Усі">Всі ширини</option>
                  {uniqueWidths.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>

              {/* Profile */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Профіль</label>
                <select value={profileFilter} onChange={e => setProfileFilter(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand">
                  <option value="Усі">Усі профілі</option>
                  {uniqueProfiles.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              {/* Diameter */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Діаметр</label>
                <select value={diameterFilter} onChange={e => setDiameterFilter(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand">
                  <option value="Усі">Всі діаметри</option>
                  {uniqueDiameters.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Бренд</label>
                <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand">
                  <option value="Усі">Всі бренди</option>
                  {uniqueBrands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* Banner */}
             <div className="mt-8 p-4 rounded-xl border border-brand/20 bg-brand/5">
                <p className="text-xs text-gray-300">Не знайшли потрібного розміру? Залиште заявку, і ми підберемо шини індивідуально за найкращою ціною!</p>
                <button 
                  onClick={() => setSelectedTire(null)} 
                  className="mt-4 w-full text-xs font-bold bg-white text-dark py-2 rounded-lg hover:bg-brand transition-colors uppercase tracking-widest"
                >
                  Індивідуальний підбір
                </button>
             </div>
          </div>
        </div>

        {/* --- КАТАЛОГ (СІТКА ТОВАРІВ) --- */}
        <div className="w-full lg:w-3/4">
          <div className="mb-4 flex justify-between items-center text-sm font-bold text-gray-500 uppercase tracking-widest">
            <span>Знайдено: <span className="text-brand">{filteredTires.length}</span></span>
          </div>

          {filteredTires.length === 0 ? (
            <div className="glass-panel p-12 rounded-2xl text-center flex flex-col items-center justify-center border border-white/10">
               <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
               <h3 className="text-xl font-display font-bold text-white mb-2">Нічого не знайдено</h3>
               <p className="text-gray-400 mb-6 max-w-md">Змініть параметри фільтра або залиште заявку на індивідуальний підбір.</p>
               <button onClick={resetFilters} className="px-6 py-2 border border-brand text-brand hover:bg-brand/10 transition-colors rounded-xl font-bold uppercase tracking-widest text-sm">скинути фільтри</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTires.map(tire => (
                <div key={tire.id} className="relative glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-brand/40 transition-all group flex flex-col">
                  {/* Image mock / Header */}
                  <div className="h-40 bg-gradient-to-br from-black/80 to-black/20 flex flex-col items-center justify-center relative p-4">
                     {tire.stickers && tire.stickers.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                          {tire.stickers.map(st => (
                            <span key={st} className="bg-brand text-dark text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-lg">{st}</span>
                          ))}
                        </div>
                     )}
                     <div className="text-5xl font-black text-white/5 uppercase tracking-tighter absolute -rotate-12 transform scale-150">
                       {tire.brand}
                     </div>
                     <h3 className="text-2xl font-display font-bold text-white relative z-10 truncate w-full text-center drop-shadow-md">{tire.brand}</h3>
                     <p className="text-brand font-bold text-sm relative z-10 truncate w-full text-center">{tire.model}</p>
                  </div>
                  
                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                      <div className="flex gap-2 text-2xl font-black text-white px-2 py-1 bg-black/40 rounded-lg">
                        {tire.width} <span className="opacity-30">/</span> {tire.profile} <span className="opacity-30 ml-2"></span> <span className="text-brand">{tire.diameter}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-gray-400">
                        {tire.season === 'Літо' && <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>}
                        {tire.season === 'Зима' && <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}
                        {tire.season === 'Всесезонні' && <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="flex justify-between items-end mb-4">
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Ціна за 1 шт</span>
                        <div className="text-2xl font-display font-black text-white">{tire.price} <span className="text-brand text-lg">₴</span></div>
                      </div>

                      <button 
                        onClick={() => setSelectedTire(tire)}
                        disabled={!tire.inStock}
                        className="w-full py-3 rounded-xl font-bold uppercase tracking-widest transition-all text-sm flex items-center justify-center gap-2 
                        bg-brand text-dark hover:bg-white btn-glow disabled:opacity-50 disabled:bg-gray-800 disabled:text-gray-500 disabled:border-transparent disabled:shadow-none"
                      >
                         {tire.inStock ? (
                           <>
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                             В кошик
                           </>
                         ) : 'Немає в наявності'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Модальне вікно замовлення */}
      {selectedTire !== null && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedTire(null)}></div>
            <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
               {/* Кнопка закриття */}
               <button onClick={() => setSelectedTire(null)} className="absolute z-20 top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
               {/* Форма замовлення */}
               <TireForm 
                 initialTire={{
                   width: selectedTire.brand ? selectedTire.width : '',
                   profile: selectedTire.brand ? selectedTire.profile : '',
                   diameter: selectedTire.brand ? selectedTire.diameter : '',
                   season: selectedTire.brand ? selectedTire.season : 'Літо',
                   brand: selectedTire.brand ? `${selectedTire.brand} ${selectedTire.model}` : '',
                 }} 
                 isModal={true}
                 onSuccess={() => { setTimeout(() => setSelectedTire(null), 3000) }}
               />
            </div>
        </div>
      )}

    </div>
  );
}
