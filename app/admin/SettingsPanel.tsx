'use client';

import { useState } from 'react';
import { updateSiteSettings } from '@/app/actions/settings';

export default function SettingsPanel({ password }: { password: string }) {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Settings states
  const [heroTitle, setHeroTitle] = useState('ШИНОМОНТАЖ');
  const [heroSubtitle, setHeroSubtitle] = useState('Зберігання шин | Рихтування дисків');

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

  return (
    <div className="space-y-8">
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
        <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-brand">Редагування Головної Сторінки</h2>
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
          <button type="submit" disabled={loading} className="bg-brand text-dark font-bold py-3 px-6 rounded-xl hover:bg-white transition-all w-full md:w-auto self-start mt-2">
            {loading ? 'Збереження...' : 'Зберегти тексти'}
          </button>
        </form>
      </div>

      {/* INFO FOR PRICES */}
      <div className="glass-panel p-6 rounded-2xl border border-brand/20 bg-brand/5">
        <h2 className="text-xl font-bold mb-2 uppercase tracking-wider text-brand">Управління цінами</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Редактор складних таблиць цін знаходиться у розробці. Наразі всі базові ціни зафіксовані в коді для забезпечення максимальної швидкості та стабільності роботи сайту.
        </p>
      </div>
    </div>
  );
}
