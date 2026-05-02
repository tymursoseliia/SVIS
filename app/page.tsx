"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BookingForm from "@/app/components/BookingForm";
import ReviewsMarquee from "@/app/components/ReviewsMarquee";
import VacanciesSection from "@/app/components/VacanciesSection";
import { getSiteSettings } from "@/app/actions/settings";

export default function Home() {
  const [heroTitle, setHeroTitle] = useState("ШИНОМОНТАЖ");
  const [heroSubtitle, setHeroSubtitle] = useState("Зберігання шин | Рихтування дисків");

  useEffect(() => {
    // Load settings
    getSiteSettings("sections").then((res) => {
      if (res.data) {
        if (res.data.heroTitle) setHeroTitle(res.data.heroTitle);
        if (res.data.heroSubtitle) setHeroSubtitle(res.data.heroSubtitle);
      }
    });

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
    <main>
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 lg:pt-48 lg:pb-32 bg-dark min-h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <Image src="/hero-bg.webp" alt="Background" fill priority className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-dark/95 to-dark/80 mix-blend-multiply z-0"></div>
        <div className="smoke-bg z-0"></div>
        <div className="tire-mark left-[-100px] transform -rotate-12"></div>
        <div className="tire-mark right-[-100px] transform rotate-12"></div>

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-3/5 reveal">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/5 backdrop-blur-sm text-sm font-bold uppercase tracking-widest text-brand mb-8">
                <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse shadow-[0_0_10px_#39FF14]"></span>
                Щодня з 08:00 до 20:00
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight mb-4 uppercase text-white drop-shadow-2xl leading-none" dangerouslySetInnerHTML={{ __html: heroTitle.replace('МОНТАЖ', '<span class="text-brand text-glow">МОНТАЖ</span>') }}>
              </h1>

              <div className="h-1.5 w-32 bg-brand mb-8 rounded-full shadow-[0_0_15px_#39FF14]"></div>

              <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-200 font-bold mb-10 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-6 uppercase tracking-wider text-center sm:text-left">
                <span>{heroSubtitle.split('|')[0]?.trim() || "Зберігання шин"}</span>
                <span className="hidden sm:inline text-brand/50">|</span>
                <span>{heroSubtitle.split('|')[1]?.trim() || "Рихтування дисків"}</span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  href="/#booking"
                  className="inline-flex justify-center items-center px-10 py-4 border-2 border-brand text-lg font-bold rounded-lg text-dark bg-brand hover:bg-transparent hover:text-brand transition-all duration-300 btn-glow uppercase tracking-wider w-full sm:w-auto"
                >
                  Записатись на сервіс
                </Link>
                <a
                  href="tel:0672454455"
                  className="inline-flex justify-center items-center px-10 py-4 border-2 border-white/20 text-lg font-bold rounded-lg text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm hover:border-brand/50 transition-all duration-300 w-full sm:w-auto uppercase tracking-wider font-display"
                >
                  067 245 44 55
                </a>
              </div>
            </div>

            <div className="w-full lg:w-2/5 reveal flex justify-center lg:justify-end mt-12 lg:mt-0" style={{ transitionDelay: "200ms" }}>
              {/* Big Logo representation based on the image */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 flex items-center justify-center">
                {/* Outer Tire Effect */}
                <div className="absolute inset-0 rounded-full border-[12px] sm:border-[16px] border-[#111] shadow-[0_0_50px_rgba(57,255,20,0.3)]"></div>
                <div className="absolute inset-2 rounded-full border-4 border-dashed border-[#222] animate-[spin_20s_linear_infinite]"></div>
                {/* Inner Glow */}
                <div className="absolute inset-6 sm:inset-8 rounded-full border-4 border-brand border-glow bg-dark/80 backdrop-blur-md flex items-center justify-center">
                  <div className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-brand rounded-xl border-glow transform -rotate-6">
                    <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-widest text-brand text-glow">
                      SVIS.YV
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Services Section */}
      <section className="py-20 bg-[#1b2110] relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">Наші Переваги</h2>
            <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">Спеціалізований <span className="text-brand text-glow">Сервіс</span></h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* EV & Hybrids */}
            <div className="glass-panel border-brand/20 p-8 rounded-2xl reveal hover:border-brand/50 transition-all group">
              <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">⚡</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">Електро та Гібриди</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Спеціалізований підхід, правильне піддомкрачування та безпечне обслуговування EV авто.</p>
            </div>

            {/* B2B Fleets */}
            <div className="glass-panel border-white/10 p-8 rounded-2xl reveal hover:border-brand/50 transition-all group delay-100">
              <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏢</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">Автопарки (B2B)</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Корпоративне обслуговування підприємств з повним документальним супроводом.</p>
            </div>

            {/* Recycling */}
            <div className="glass-panel border-white/10 p-8 rounded-2xl reveal hover:border-brand/50 transition-all group delay-200">
              <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">♻️</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">Утилізація шин</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Екологічна переробка старих покришок. Вартість утилізації всього 100 грн/шт.</p>
            </div>

            {/* Mobile Bus Placeholder */}
            <div className="glass-panel border-brand/40 p-8 rounded-2xl reveal relative overflow-hidden group delay-300">
              <div className="absolute right-4 top-4 bg-brand text-dark font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(57,255,20,0.4)] animate-pulse">Скоро</div>
              <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🚌</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-wider text-brand">Шиномонтажний Бус</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Повноцінна мобільна майстерня. Приїдемо та перевзуємо ваше авто де завгодно!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsMarquee />

      {/* Booking Form Section */}
      <section id="booking" className="py-24 bg-dark relative z-10 border-t border-brand/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <BookingForm />
        </div>
      </section>

      {/* Vacancies Section */}
      <VacanciesSection />
    </main>
  );
}
