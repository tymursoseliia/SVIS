'use client';

import { useState, useEffect } from 'react';
import { updateSiteSettings } from '@/app/actions/settings';
import { useSettings } from '@/app/providers/SettingsProvider';
import { SitePrices, CarCategory, Radius, StorageCategory, StorageType } from '@/lib/pricing';

export default function SettingsPanel({ password }: { password: string }) {
  const { prices: initialPrices, sections: initialSections } = useSettings();
  
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Sections states
  const [heroTitle, setHeroTitle] = useState(initialSections.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(initialSections.heroSubtitle);

  // Prices state
  const [prices, setPrices] = useState<SitePrices>(initialPrices);

  useEffect(() => {
    setPrices(initialPrices);
    setHeroTitle(initialSections.heroTitle);
    setHeroSubtitle(initialSections.heroSubtitle);
  }, [initialPrices, initialSections]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 5) {
      alert('Пароль має бути не менше 5 символів');
      return;
    }
    
    setLoading(true);
    const res = await updateSiteSettings('admin_password', newPassword, password);
    if (res.success) {
      alert('Пароль успішно змінено! Перезавантажте сторінку та увійдіть з новим паролем.');
      window.location.reload();
    } else {
      alert(res.error);
    }
    setLoading(false);
  };

  const handleUpdateSections = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateSiteSettings('sections', { heroTitle, heroSubtitle }, password);
    if (res.success) {
      alert('Тексти успішно оновлено!');
    } else {
      alert(res.error);
    }
    setLoading(false);
  };

  const handleUpdatePrices = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateSiteSettings('prices', prices, password);
    if (res.success) {
      alert('Всі ціни успішно оновлено! Вони вже на сайті.');
    } else {
      alert(res.error);
    }
    setLoading(false);
  };

  // Helper to update deeply nested prices
  const updateMountingPrice = (car: CarCategory, r: string, val: number) => {
    setPrices(prev => ({
      ...prev,
      mounting: {
        ...prev.mounting,
        [car]: {
          ...prev.mounting[car],
          [r]: val
        }
      }
    }));
  };

  const updateStoragePrice = (duration: 'duration1' | 'duration6', cat: StorageCategory, type: StorageType, val: number) => {
    setPrices(prev => ({
      ...prev,
      storage: {
        ...prev.storage,
        [duration]: {
          ...prev.storage[duration],
          [cat]: {
            ...prev.storage[duration][cat],
            [type]: val
          }
        }
      }
    }));
  };

  const updateDiskAlloy = (r: keyof SitePrices['diskRepair']['alloy'], val: number) => {
    setPrices(prev => ({ ...prev, diskRepair: { ...prev.diskRepair, alloy: { ...prev.diskRepair.alloy, [r]: val } } }));
  }

  const updateDiskSteel = (r: keyof SitePrices['diskRepair']['steel'], val: number) => {
    setPrices(prev => ({ ...prev, diskRepair: { ...prev.diskRepair, steel: { ...prev.diskRepair.steel, [r]: val } } }));
  }

  const updateBaseService = (name: string, val: number) => {
    setPrices(prev => ({ ...prev, baseServices: { ...prev.baseServices, [name]: val } }));
  }

  return (
    <div className="space-y-12">
      {/* SECURITY */}
      <div className="glass-panel p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-red-400 flex items-center gap-2">
          🔒 Зміна пароля адміністратора
        </h2>
        <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4 max-w-sm">
          <input 
            type="text" 
            placeholder="Введіть новий пароль" 
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-red-400"
          />
          <button type="submit" disabled={loading} className="bg-red-500/20 text-red-400 border border-red-500/50 font-bold py-3 px-6 rounded-xl hover:bg-red-500/40 transition-all">
            {loading ? 'Збереження...' : 'Змінити пароль'}
          </button>
        </form>
      </div>

      {/* SECTIONS */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-white">Редагування Головної Сторінки</h2>
        <form onSubmit={handleUpdateSections} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1 font-bold">Головний Заголовок</label>
            <input 
              type="text" 
              value={heroTitle}
              onChange={e => setHeroTitle(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-brand"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1 font-bold">Підзаголовок</label>
            <input 
              type="text" 
              value={heroSubtitle}
              onChange={e => setHeroSubtitle(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-brand"
            />
          </div>
          <button type="submit" disabled={loading} className="bg-white/10 text-white font-bold py-3 px-6 rounded-xl hover:bg-white/20 transition-all w-full md:w-auto self-start mt-2 border border-white/20">
            {loading ? 'Збереження...' : 'Зберегти тексти'}
          </button>
        </form>
      </div>

      {/* PRICES */}
      <div className="glass-panel p-6 rounded-2xl border border-brand/30 bg-[#050505]">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
          <h2 className="text-2xl font-black uppercase tracking-wider text-brand">Управління Всіма Цінами</h2>
          <button onClick={handleUpdatePrices} disabled={loading} className="bg-brand text-dark font-black py-3 px-8 rounded-xl hover:bg-white transition-all btn-glow uppercase tracking-widest text-sm">
            {loading ? 'Збереження...' : 'ЗБЕРЕГТИ ВСІ ЦІНИ'}
          </button>
        </div>

        <div className="space-y-12">
          
          {/* MOUNTING */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white uppercase border-l-4 border-brand pl-3">Шиномонтаж (повний комплекс)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {(Object.keys(prices.mounting) as CarCategory[]).map(car => (
                <div key={car} className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="text-brand font-bold uppercase mb-4 text-center">{car}</h4>
                  <div className="space-y-2">
                    {Object.entries(prices.mounting[car]).map(([r, price]) => (
                      <div key={r} className="flex justify-between items-center gap-4">
                        <span className="text-gray-400 font-bold w-16">{r}</span>
                        <input 
                          type="number" 
                          value={price as number} 
                          onChange={e => updateMountingPrice(car, r, Number(e.target.value))}
                          className="w-24 bg-[#0a0a0a] border border-white/20 rounded px-3 py-1 text-white focus:border-brand text-right"
                        />
                        <span className="text-xs text-gray-500">₴</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STORAGE */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white uppercase border-l-4 border-brand pl-3">Зберігання (за 6 місяців)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {(Object.keys(prices.storage.duration6) as StorageCategory[]).map(cat => (
                <div key={cat} className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="text-brand font-bold uppercase mb-4 text-center">{cat}</h4>
                  <div className="space-y-2">
                    {(Object.keys(prices.storage.duration6[cat]) as StorageType[]).map(type => (
                      <div key={type} className="flex justify-between items-center gap-4">
                        <span className="text-gray-400 text-sm w-32 truncate">{type}</span>
                        <input 
                          type="number" 
                          value={prices.storage.duration6[cat][type]} 
                          onChange={e => updateStoragePrice('duration6', cat, type, Number(e.target.value))}
                          className="w-24 bg-[#0a0a0a] border border-white/20 rounded px-3 py-1 text-white focus:border-brand text-right"
                        />
                        <span className="text-xs text-gray-500">₴</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DISK REPAIR */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white uppercase border-l-4 border-brand pl-3">Рихтовка дисків</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="text-brand font-bold uppercase mb-4 text-center">Литі диски</h4>
                <div className="space-y-2">
                  {(Object.entries(prices.diskRepair.alloy)).map(([r, price]) => (
                    <div key={r} className="flex justify-between items-center gap-4">
                      <span className="text-gray-400 font-bold w-24">{r}</span>
                      <input 
                        type="number" 
                        value={price} 
                        onChange={e => updateDiskAlloy(r as any, Number(e.target.value))}
                        className="w-24 bg-[#0a0a0a] border border-white/20 rounded px-3 py-1 text-white focus:border-brand text-right"
                      />
                      <span className="text-xs text-gray-500">₴</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="text-brand font-bold uppercase mb-4 text-center">Залізні диски (прокатка)</h4>
                <div className="space-y-2">
                  {(Object.entries(prices.diskRepair.steel)).map(([r, price]) => (
                    <div key={r} className="flex justify-between items-center gap-4">
                      <span className="text-gray-400 font-bold w-24">{r}</span>
                      <input 
                        type="number" 
                        value={price} 
                        onChange={e => updateDiskSteel(r as any, Number(e.target.value))}
                        className="w-24 bg-[#0a0a0a] border border-white/20 rounded px-3 py-1 text-white focus:border-brand text-right"
                      />
                      <span className="text-xs text-gray-500">₴</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BASE SERVICES */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white uppercase border-l-4 border-brand pl-3">Базові та Додаткові послуги</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
              {Object.entries(prices.baseServices).map(([name, price]) => (
                <div key={name} className="flex justify-between items-center gap-4 border-b border-white/5 pb-2">
                  <span className="text-gray-300 text-sm">{name}</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={price} 
                      onChange={e => updateBaseService(name, Number(e.target.value))}
                      className="w-24 bg-[#0a0a0a] border border-white/20 rounded px-3 py-1 text-white focus:border-brand text-right"
                    />
                    <span className="text-xs text-gray-500 w-4">₴</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-8 flex justify-end pt-6 border-t border-white/10">
          <button onClick={handleUpdatePrices} disabled={loading} className="bg-brand text-dark font-black py-4 px-10 rounded-xl hover:bg-white transition-all btn-glow uppercase tracking-widest">
            {loading ? 'Збереження...' : 'ЗБЕРЕГТИ ВСІ ЦІНИ НА САЙТІ'}
          </button>
        </div>

      </div>
    </div>
  );
}
