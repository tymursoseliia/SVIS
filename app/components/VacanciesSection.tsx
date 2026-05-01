'use client';

import { useState, useEffect } from 'react';
import { getActiveVacancies } from '@/app/actions/vacancies';

type Vacancy = {
  id: string;
  title: string;
  description: string;
  salary: string;
};

export default function VacanciesSection() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveVacancies().then((res) => {
      if (res.data) setVacancies(res.data as Vacancy[]);
      setLoading(false);
    });
  }, []);

  if (loading || vacancies.length === 0) return null;

  return (
    <section className="py-20 bg-[#151a0c] relative z-10 border-t border-brand/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-2">Стань частиною команди</h2>
          <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">Відкриті <span className="text-brand text-glow">Вакансії</span></h3>
        </div>

        <div className="flex flex-col gap-6">
          {vacancies.map((v) => (
            <div key={v.id} className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-brand/30 transition-all reveal">
              <div className="max-w-2xl">
                <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider text-brand">{v.title}</h4>
                <div className="text-xl font-display font-bold text-white mb-4 bg-white/5 inline-block px-3 py-1 rounded-lg border border-white/10">{v.salary}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{v.description}</p>
              </div>
              <a href="tel:0672454455" className="px-8 py-4 border border-brand text-dark bg-brand font-bold uppercase tracking-widest rounded-xl hover:bg-transparent hover:text-brand transition-all whitespace-nowrap btn-glow shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                Дзвонити
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
