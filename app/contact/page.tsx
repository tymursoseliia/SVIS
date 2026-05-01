"use client";

import { useEffect } from "react";
import BookingForm from "@/app/components/BookingForm";

export default function ContactPage() {
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
      <section className="py-10 bg-dark relative pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <div className="reveal order-2 lg:order-1">
              <BookingForm />
            </div>

            {/* Contact Info */}
            <div className="reveal order-1 lg:order-2 flex flex-col justify-center">
              <h2 className="text-brand font-bold tracking-widest uppercase text-sm mb-4">
                Контакти
              </h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold mb-10 uppercase tracking-wide">
                Чекаємо
                <br />
                на вас
              </h3>

              <div className="space-y-10">
                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center border border-brand/30 shrink-0 text-brand group-hover:bg-brand group-hover:text-dark transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.15)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Телефон</h4>
                    <a href="tel:0672454455" className="text-3xl font-display font-bold text-white hover:text-brand transition-colors text-glow block">067 245 44 55</a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center border border-brand/30 shrink-0 text-brand group-hover:bg-brand group-hover:text-dark transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.15)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Режим роботи</h4>
                    <p className="text-xl font-bold text-white mt-1">Щодня: 09:00 - 21:00</p>
                    <p className="text-brand font-medium mt-1 uppercase tracking-wide text-sm">Без перерв та вихідних</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center border border-brand/30 shrink-0 text-brand group-hover:bg-brand group-hover:text-dark transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.15)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Адреса</h4>
                    <p className="text-xl font-bold text-white mt-1">Shevchenka St, 1А, Bucha, Kyiv Oblast, 08292</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center border border-brand/30 shrink-0 text-brand group-hover:bg-brand group-hover:text-dark transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.15)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                  </div>
                  <div className="ml-6 w-full">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Соціальні мережі</h4>
                    <div className="flex gap-4">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand/50 hover:shadow-[0_0_15px_rgba(57,255,20,0.2)] transition-all duration-300" title="Telegram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.29-.48.79-.74 3.08-1.34 5.15-2.23 6.19-2.66 2.95-1.23 3.56-1.44 3.96-1.45.09 0 .28.02.41.13.11.09.13.22.14.34.01.1-.01.24-.03.36z"/></svg></a>
                      {/* Using the same icons as the footer for brevity */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-20 reveal w-full h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] group relative z-10">
            <div className="absolute inset-0 bg-brand/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10"></div>
            <iframe 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen 
              referrerPolicy="no-referrer-when-downgrade" 
              src="https://maps.google.com/maps?width=100%25&height=600&hl=uk&q=Shevchenka%20St,%201%D0%90,%20Bucha,%20Kyiv%20Oblast,%2008292+(Svis.YV)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="py-16 bg-[#0a0a0a] border-t border-brand/20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand/5 focus:-z-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center reveal">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 uppercase tracking-wide text-white">
            Були у нас? Залиште відгук!
          </h2>
          <p className="text-gray-400 mb-8 text-lg font-medium">
            Ваша оцінка допомагає нам ставати кращими, а іншим водіям — робити правильний вибір.
          </p>
          <a 
            href="https://www.google.com/maps/place/..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-8 py-5 bg-white text-dark rounded-xl font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] text-lg"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Оцінити в Google
          </a>
        </div>
      </section>
    </main>
  );
}
