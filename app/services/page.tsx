"use client";

import { useEffect } from "react";
import Link from "next/link";
import VisualTireWear from "@/app/components/VisualTireWear";

export default function ServicesPage() {
  useEffect(() => {
    // Intersection Observer for reveal animations
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
    <main className="min-h-screen bg-dark pt-32 pb-20">
      {/* Services Section */}
      <section className="py-10 relative z-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-brand/10 via-dark to-dark pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 reveal">
            <h2 className="text-brand font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-brand/50"></span>
              Що ми пропонуємо
              <span className="w-12 h-px bg-brand/50"></span>
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-wide">
              Наші Послуги
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Service 1 */}
            <div className="glass-panel p-8 rounded-2xl hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-500 group reveal">
              <div className="w-16 h-16 bg-[#0a0a0a] rounded-xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-brand/40 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-300">
                <svg className="w-8 h-8 text-white group-hover:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <h4 className="text-2xl font-display font-bold mb-4 text-white uppercase tracking-wider group-hover:text-brand transition-colors">Шиномонтаж</h4>
              <p className="text-gray-400 font-medium leading-relaxed">Повний комплекс послуг із сезонної перевзувки. Зняття, встановлення, миття коліс та пакування.</p>
            </div>

            {/* Service 2 */}
            <div className="glass-panel p-8 rounded-2xl hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-500 group reveal" style={{ transitionDelay: "100ms" }}>
              <div className="w-16 h-16 bg-[#0a0a0a] rounded-xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-brand/40 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-300">
                <svg className="w-8 h-8 text-white group-hover:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <h4 className="text-2xl font-display font-bold mb-4 text-white uppercase tracking-wider group-hover:text-brand transition-colors">Зберігання шин</h4>
              <p className="text-gray-400 font-medium leading-relaxed">Навіщо тягати важкі колеса туди-сюди? Залиште їх у нас на спеціалізованому складі з дотриманням ідеальних умов.</p>
            </div>

            {/* Service 3 */}
            <div className="glass-panel p-8 rounded-2xl hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-500 group reveal" style={{ transitionDelay: "200ms" }}>
              <div className="w-16 h-16 bg-[#0a0a0a] rounded-xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-brand/40 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-300">
                <svg className="w-8 h-8 text-white group-hover:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path>
                </svg>
              </div>
              <h4 className="text-2xl font-display font-bold mb-4 text-white uppercase tracking-wider group-hover:text-brand transition-colors">Рихтування дисків</h4>
              <p className="text-gray-400 font-medium leading-relaxed">Правка литих та прокатка штампованих дисків. Усунення деформацій будь-якої складності.</p>
            </div>

            {/* Service 4 */}
            <div className="glass-panel p-8 rounded-2xl hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-500 group reveal">
              <div className="w-16 h-16 bg-[#0a0a0a] rounded-xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-brand/40 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-300">
                <svg className="w-8 h-8 text-white group-hover:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 className="text-2xl font-display font-bold mb-4 text-white uppercase tracking-wider group-hover:text-brand transition-colors">Балансування</h4>
              <p className="text-gray-400 font-medium leading-relaxed">Надточне 3D-балансування на новітньому обладнанні для ідеального керування авто.</p>
            </div>

            {/* Service 5 */}
            <div className="glass-panel p-8 rounded-2xl hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-500 group reveal" style={{ transitionDelay: "100ms" }}>
              <div className="w-16 h-16 bg-[#0a0a0a] rounded-xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-brand/40 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-300">
                <svg className="w-8 h-8 text-white group-hover:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h4 className="text-2xl font-display font-bold mb-4 text-white uppercase tracking-wider group-hover:text-brand transition-colors">Ремонт шин</h4>
              <p className="text-gray-400 font-medium leading-relaxed">Швидке усунення проколів, порізів та гриж із використанням якісних матеріалів.</p>
            </div>

            {/* Service 6 */}
            <div className="glass-panel p-8 rounded-2xl hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-500 group reveal" style={{ transitionDelay: "200ms" }}>
              <div className="w-16 h-16 bg-[#0a0a0a] rounded-xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-brand/40 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-300">
                <svg className="w-8 h-8 text-white group-hover:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <h4 className="text-2xl font-display font-bold mb-4 text-white uppercase tracking-wider group-hover:text-brand transition-colors">Датчики тиску</h4>
              <p className="text-gray-400 font-medium leading-relaxed">Продаж, встановлення та програмування датчиків тиску TPMS для всіх марок.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Tire Configurator */}
      <VisualTireWear />

      {/* Custom Tire Bags Banner Section */}
      <section className="py-20 relative overflow-hidden bg-dark border-t border-brand/20 mt-12">
        <div className="absolute inset-0 bg-brand/5"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-panel p-10 md:p-14 rounded-2xl flex flex-col md:flex-row-reverse items-center justify-between gap-10 reveal border-brand/40 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1/2 h-full opacity-5 flex items-center justify-start pointer-events-none">
              <span className="font-display font-black text-9xl text-white transform rotate-[10deg] -translate-x-10 scale-150">
                BAGS
              </span>
            </div>

            <div className="md:w-2/3 text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-xs font-bold uppercase tracking-widest text-brand mb-4">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
                Власне виробництво
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 uppercase tracking-wide">
                Фірмові пакети для шин
              </h2>
              <p className="text-gray-300 font-medium text-base md:text-lg leading-relaxed max-w-xl">
                Збережіть чистоту салону та багажника вашого авто! Ми виготовляємо <span className="text-brand font-bold">надміцні фірмові пакети</span> для транспортування та зберігання коліс. Ідеальний захист від бруду, вологи та запаху гуми.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-start relative z-10">
              <Link
                href="/#booking"
                className="px-6 md:px-8 py-4 md:py-5 bg-transparent border-2 border-brand text-brand rounded-xl font-display font-bold text-lg md:text-xl transition-all btn-glow whitespace-nowrap uppercase tracking-widest hover:bg-brand hover:text-dark text-center"
              >
                Купити пакети
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tire Storage Banner Section */}
      <section className="py-20 relative overflow-hidden bg-[#0a0a0a] mt-12 border-y border-brand/20">
        <div className="absolute inset-0 bg-brand/5"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-panel p-10 md:p-14 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-10 reveal border-brand/40 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 flex items-center justify-end pointer-events-none">
              <span className="font-display font-black text-9xl text-brand transform rotate-[-10deg] translate-x-10 scale-150">
                TIRES
              </span>
            </div>

            <div className="md:w-2/3 text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-xs font-bold uppercase tracking-widest text-brand mb-4">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
                Послуга Зберігання
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 uppercase tracking-wide">
                Навіщо щосезону тягати важку гуму?
              </h2>
              <p className="text-gray-300 font-medium text-base md:text-lg leading-relaxed max-w-xl">
                Залиште ваші шини у нас на <span className="text-brand font-bold">спеціалізованому складі!</span> Жодного бруду в салоні чи багажнику, більше вільного місця в гаражі. Ми самі дістанемо, перевзуємо і заберемо інший комплект на зберігання.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end relative z-10">
              <Link
                href="/#booking"
                className="px-6 md:px-8 py-4 md:py-5 bg-brand text-dark rounded-xl font-display font-bold text-lg md:text-xl transition-all btn-glow whitespace-nowrap uppercase tracking-widest hover:bg-white text-center"
              >
                Зберегти шини
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* B2B Corporate Banner Section */}
      <section className="py-20 relative overflow-hidden bg-dark border-t border-brand/20 mt-12 mb-12">
        <div className="absolute inset-0 bg-brand/5"></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-panel p-10 md:p-14 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-10 reveal border-brand/40 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1/2 h-full opacity-5 flex items-center justify-start pointer-events-none">
              <span className="font-display font-black text-9xl text-white transform rotate-[10deg] -translate-x-10 scale-150">
                B2B
              </span>
            </div>

            <div className="md:w-2/3 text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-xs font-bold uppercase tracking-widest text-brand mb-4">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
                Для бізнесу
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 uppercase tracking-wide">
                Обслуговування автопарків
              </h2>
              <p className="text-gray-300 font-medium text-base md:text-lg leading-relaxed max-w-xl">
                Ми укладаємо <span className="text-brand font-bold">офіційні договори</span> з компаніями на планове, сезонне та позапланове шиномонтажне обслуговування їхніх автопарків (B2B). Пропонуємо безготівковий розрахунок, пріоритетний запис, гнучкі ціни та повний супровід документації.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end relative z-10">
              <Link
                href="/#booking"
                className="px-6 md:px-8 py-4 md:py-5 bg-transparent border-2 border-brand text-brand rounded-xl font-display font-bold text-lg md:text-xl transition-all btn-glow whitespace-nowrap uppercase tracking-widest hover:bg-brand hover:text-dark text-center"
              >
                Обговорити договір
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
