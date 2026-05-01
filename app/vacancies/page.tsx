"use client";

import { useEffect } from "react";
import VacanciesSection from "@/app/components/VacanciesSection";

export default function VacanciesPage() {
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
    <main className="min-h-screen bg-dark pt-32 pb-20">
      <section className="py-10 bg-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-4 uppercase text-white drop-shadow-2xl">
            НАШІ <span className="text-brand text-glow">ВАКАНСІЇ</span>
          </h1>
          <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-10">
            Приєднуйтесь до команди професіоналів SVIS.YV! Ми шукаємо відповідальних та амбітних фахівців.
          </p>
        </div>
      </section>
      
      <VacanciesSection />
    </main>
  );
}
