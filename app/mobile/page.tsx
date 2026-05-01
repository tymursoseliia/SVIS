"use client";

import { useEffect } from "react";
import Link from "next/link";
import BookingForm from "@/app/components/BookingForm";

export default function MobileServicePage() {
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

    return () => revealObserver.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-dark pt-32 pb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-brand/10 via-dark to-dark pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 reveal text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/5 backdrop-blur-sm text-sm font-bold uppercase tracking-widest text-brand mb-6 shadow-[0_0_15px_rgba(57,255,20,0.1)]">
                <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
                швидка допомога на дорозі
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight mb-6 uppercase text-white drop-shadow-2xl">
                ВИЇЗНИЙ
                <br />
                <span className="text-brand text-glow">ШИНОМОНТАЖ</span>
              </h1>
              
              <div className="h-1.5 w-24 bg-brand mb-8 rounded-full shadow-[0_0_15px_#39FF14] mx-auto lg:mx-0"></div>
              
              <p className="text-gray-300 font-medium text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
                Пробили колесо в дорозі? Немає часу стояти в чергах на «перевзувку»? <strong className="text-white">Наш повністю обладнаний бус приїде до вас!</strong>
                <br/><br/>
                Увесь арсенал стаціонарного шиномонтажу — балансувальний станок, бортировочне обладнання, потужні домкрати та компресор — тепер там, де це зручно вам.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link
                  href="#call-bus"
                  className="inline-flex justify-center items-center px-10 py-5 border-2 border-brand text-lg font-bold rounded-xl text-dark bg-brand hover:bg-transparent hover:text-brand transition-all duration-300 btn-glow uppercase tracking-wider shadow-[0_0_20px_rgba(57,255,20,0.4)]"
                >
                  Викликати бус
                </Link>
                <a
                  href="tel:0672454455"
                  className="inline-flex justify-center items-center px-10 py-5 border-2 border-white/20 text-lg font-bold rounded-xl text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm hover:border-brand/50 transition-all duration-300 uppercase tracking-wider font-display"
                >
                  067 245 44 55
                </a>
              </div>
            </div>

            <div className="lg:w-1/2 reveal" style={{ transitionDelay: "200ms" }}>
              <div className="relative w-full aspect-square md:aspect-video lg:aspect-square flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors duration-500"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/20 via-transparent to-transparent opacity-50 block"></div>
                
                {/* Abstract Bus Illustration */}
                <div className="relative z-10 w-3/4 h-3/4 flex flex-col items-center justify-center">
                  <div className="w-full h-1/2 bg-[#222] rounded-t-3xl border-t border-x border-white/20 relative shadow-inner flex flex-col justify-between p-4">
                     <div className="w-full flex justify-between">
                        <div className="w-1/4 h-8 bg-[#111] rounded border border-white/10"></div>
                        <div className="w-1/2 h-8 bg-[#111] rounded border border-white/10"></div>
                     </div>
                     <div className="absolute bottom-4 left-6 right-6 h-px bg-brand/30 shadow-[0_0_10px_#39FF14]"></div>
                  </div>
                  <div className="w-[105%] h-1/3 bg-[#111] rounded-b-xl border border-white/10 relative flex items-center justify-around px-8">
                     <div className="w-16 h-16 rounded-full bg-dark border-4 border-[#333] flex items-center justify-center shadow-xl">
                        <div className="w-10 h-10 rounded-full border-2 border-dashed border-brand/50 animate-[spin_5s_linear_infinite]"></div>
                     </div>
                     <div className="text-brand font-display font-black text-2xl tracking-widest text-glow opacity-80">SVIS.YV</div>
                     <div className="w-16 h-16 rounded-full bg-dark border-4 border-[#333] flex items-center justify-center shadow-xl">
                        <div className="w-10 h-10 rounded-full border-2 border-dashed border-brand/50 animate-[spin_5s_linear_infinite]"></div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative z-10 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-wide">
              ЧОМУ ЦЕ <span className="text-brand">ЗРУЧНО?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl reveal hover:border-brand/40 transition-all duration-300">
              <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center mb-6 border border-brand/30 text-brand">
                <span className="text-2xl font-black">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">Економія часу</h3>
              <p className="text-gray-400">Вам не потрібно їхати на шиномонтаж і чекати в черзі. Ми приїдемо до вашого офісу чи дому і зробимо все, поки ви займаєтесь своїми справами.</p>
            </div>

            <div className="glass-panel p-8 rounded-2xl reveal hover:border-brand/40 transition-all duration-300" style={{ transitionDelay: '100ms' }}>
              <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center mb-6 border border-brand/30 text-brand">
                <span className="text-2xl font-black">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">Повне обладнання</h3>
              <p className="text-gray-400">Наш мобільний комплекс має на борту італійське бортировочне та балансувальне обладнання, що дозволяє працювати з колесами до 24 дюймів.</p>
            </div>

            <div className="glass-panel p-8 rounded-2xl reveal hover:border-brand/40 transition-all duration-300" style={{ transitionDelay: '200ms' }}>
              <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center mb-6 border border-brand/30 text-brand">
                <span className="text-2xl font-black">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">Допомога 24/7</h3>
              <p className="text-gray-400">Пробили колесо вночі на трасі, а запаски немає? Виїзна бригада оперативно дістанеться до вас та "вилікує" шину прямо на місці.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="call-bus" className="py-24 bg-dark relative z-10 border-t border-brand/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold uppercase tracking-wide text-white mb-4">
              Виклик мобільного сервісу
            </h2>
            <p className="text-brand font-medium">Оберіть послугу "Виїзний шиномонтаж" у формі нижче</p>
          </div>
          <BookingForm />
        </div>
      </section>
    </main>
  );
}
