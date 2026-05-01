"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function TrainingPage() {
  useEffect(() => {
    const revealCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    };

    const revealOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    document.querySelectorAll(".reveal").forEach((el) => {
      revealObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen bg-dark pt-32 pb-20 relative">
      <section className="py-10 relative z-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-brand/10 via-dark to-dark pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-brand font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-brand/50"></span>
              Практичні курси
              <span className="w-12 h-px bg-brand/50"></span>
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-wide">
              Навчання
            </h1>
            <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
              Навчіться базовим навичкам обслуговування авто в екстрених ситуаціях. Наші спеціалісти покажуть, як швидко та безпечно вирішити проблему в дорозі.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Girls Training */}
            <div className="glass-panel p-8 md:p-10 rounded-3xl hover:-translate-y-2 hover:border-[#ff69b4]/60 hover:shadow-[0_10px_30px_rgba(255,105,180,0.15)] transition-all duration-500 group reveal flex flex-col h-full relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff69b4]/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-20 h-20 bg-[#0a0a0a] rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-[#ff69b4]/40 group-hover:shadow-[0_0_20px_rgba(255,105,180,0.3)] transition-all duration-300 relative z-10">
                <svg className="w-10 h-10 text-white group-hover:text-[#ff69b4] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-display font-bold mb-4 text-white uppercase tracking-wider group-hover:text-[#ff69b4] transition-colors relative z-10">
                Курс для дівчат
              </h3>
              <p className="text-gray-400 font-medium leading-relaxed mb-8 flex-grow relative z-10">
                <strong className="text-white">"Заміни колесо в дорозі сама!"</strong><br/><br/>
                Спеціальний практичний курс, на якому ми покажемо і дамо спробувати, як безпечно, без зайвих зусиль, користуючись домкратом і викруткою/ключем, замінити пробите колесо на запаску. Мінімум теорії — максимум практики!
              </p>
              
              <Link
                href="/#booking"
                className="inline-flex justify-center items-center px-8 py-4 border-2 border-[#ff69b4]/50 text-sm font-bold rounded-xl text-white bg-dark hover:bg-[#ff69b4] hover:border-[#ff69b4] hover:text-dark transition-all duration-300 uppercase tracking-widest w-full relative z-10"
              >
                Записатися та Оплатити
              </Link>
            </div>

            {/* Boys Training */}
            <div className="glass-panel p-8 md:p-10 rounded-3xl hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-500 group reveal flex flex-col h-full relative overflow-hidden" style={{ transitionDelay: "100ms" }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-20 h-20 bg-[#0a0a0a] rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-brand/40 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300 relative z-10">
                <svg className="w-10 h-10 text-white group-hover:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-display font-bold mb-4 text-white uppercase tracking-wider group-hover:text-brand transition-colors relative z-10">
                Курс для хлопців
              </h3>
              <p className="text-gray-400 font-medium leading-relaxed mb-8 flex-grow relative z-10">
                <strong className="text-white">Базовий шиномонтаж екстремальних умов</strong><br/><br/>
                Навчимо діяти у складних ситуаціях: встановлення запаски на схилі, використання ремкомплекту "жгутів" для швидкого ремонту проколу та самостійна базова експрес-діагностика ходової частини.
              </p>
              
              <Link
                href="/#booking"
                className="inline-flex justify-center items-center px-8 py-4 border-2 border-brand/50 text-sm font-bold rounded-xl text-white bg-dark hover:bg-brand hover:border-brand hover:text-dark transition-all duration-300 uppercase tracking-widest w-full btn-glow relative z-10"
              >
                Записатися та Оплатити
              </Link>
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto">
            <div className="glass-panel p-8 md:p-12 rounded-3xl reveal border-[#ff69b4]/30 relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff69b4]/5 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative w-48 h-48 bg-dark rounded-full flex items-center justify-center border-4 border-[#ff69b4]/20 shadow-[0_0_30px_rgba(255,105,180,0.15)] group hover:border-[#ff69b4]/50 transition-all duration-500">
                    <svg className="w-20 h-20 text-[#ff69b4] group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
                
                <div className="md:w-2/3 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ff69b4]/30 bg-[#ff69b4]/10 text-xs font-bold uppercase tracking-widest text-[#ff69b4] mb-4">
                    Ексклюзивно для дівчат
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 text-white uppercase tracking-wider">
                    Набір "Lady Rescue Kit"
                  </h3>
                  <p className="text-gray-300 font-medium mb-6 leading-relaxed">
                    Спеціально зібраний нами комплект для безпечної та легкої заміни колеса. Нічого зайвого — тільки те, що дійсно полегшить життя дівчині в дорозі!
                  </p>
                  <ul className="text-left text-sm text-gray-400 font-medium mb-8 space-y-3">
                    <li className="flex items-center gap-3"><span className="text-[#ff69b4] text-lg">✓</span> Компактний домкрат із зручною ручкою-ключем (крутити дуже легко)</li>
                    <li className="flex items-center gap-3"><span className="text-[#ff69b4] text-lg">✓</span> Полегшений телескопічний балонний ключ (не потребує багато сили)</li>
                    <li className="flex items-center gap-3"><span className="text-[#ff69b4] text-lg">✓</span> Рукавички з прогумованою поверхнею + вологі серветки</li>
                    <li className="flex items-center gap-3"><span className="text-[#ff69b4] text-lg">✓</span> Ламінована покрокова інструкція-підказка та ліхтарик</li>
                  </ul>
                  
                  <Link
                    href="/#booking"
                    className="inline-flex justify-center items-center px-10 py-4 hover:bg-transparent border-2 border-[#ff69b4] text-sm font-bold rounded-xl text-dark bg-[#ff69b4] hover:text-[#ff69b4] transition-all duration-300 uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,105,180,0.4)]"
                  >
                    Замовити набір
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
