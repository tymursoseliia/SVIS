"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdvantagesPage() {
  useEffect(() => {
    const revealCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    };
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    document.querySelectorAll(".reveal").forEach((el) => { revealObserver.observe(el); });
    return () => revealObserver.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-dark pt-32 pb-20">
      {/* Tire Storage Banner Section */}
      <section className="py-10 relative overflow-hidden bg-[#0a0a0a] border-y border-brand/20">
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

      {/* Additional Advantages */}
      <section className="py-24 relative z-10">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="glass-panel p-10 rounded-2xl reveal border-brand/20">
                  <h3 className="text-5xl font-black text-brand mb-4">10+</h3>
                  <p className="text-xl font-bold uppercase tracking-widest text-white">Років досвіду</p>
               </div>
               <div className="glass-panel p-10 rounded-2xl reveal border-brand/20" style={{ transitionDelay: '100ms' }}>
                  <h3 className="text-5xl font-black text-brand mb-4">5000+</h3>
                  <p className="text-xl font-bold uppercase tracking-widest text-white">Задоволених клієнтів</p>
               </div>
               <div className="glass-panel p-10 rounded-2xl reveal border-brand/20" style={{ transitionDelay: '200ms' }}>
                  <h3 className="text-5xl font-black text-brand mb-4">24/7</h3>
                  <p className="text-xl font-bold uppercase tracking-widest text-white">Працюємо без вихідних</p>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
