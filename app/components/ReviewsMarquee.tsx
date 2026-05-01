'use client';

import { useEffect, useState, useRef } from 'react';

const REVIEWS = [
  { name: "Олександр М.", text: "Найкращий шиномонтаж у місті! Зробили все швидко, диски відбалансували ідеально. Рекомендую.", stars: 5 },
  { name: "Ірина К.", text: "Дуже зручно, що є запис онлайн. Приїхала на свій час, жодних черг. Хлопці ввічливі та професіонали.", stars: 5 },
  { name: "Максим В.", text: "Залишаю шини на зберігання вже другий рік. Жодних проблем, перевзувають швидко, пакети фірмові супер.", stars: 5 },
  { name: "Дмитро С.", text: "Рихтував литий диск після ями. Думав купувати новий, але тут зробили магію! Диск як новий, гарантію дали.", stars: 5 },
  { name: "Олег Т.", text: "Приємні ціни і дуже круте ставлення до клієнта. Оплата картою через Монобанк — це топ!", stars: 5 },
  { name: "Вікторія Л.", text: "Швидко перевзули авто перед зимою. Хлопці акуратні, все підтягнули динамометричним ключем.", stars: 5 }
];

export default function ReviewsMarquee() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-dark to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-dark to-transparent z-10"></div>
      
      <div className="text-center mb-12 relative z-20">
        <h2 className="text-brand font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-brand/50"></span>
          Відгуки
          <span className="w-12 h-px bg-brand/50"></span>
        </h2>
        <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wide text-white">
          Що кажуть <span className="text-brand text-glow">клієнти</span>
        </h3>
      </div>

      <div 
        className="relative w-full flex align-center overflow-x-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`flex w-max shrink-0 gap-6 transition-transform duration-[40s] ease-linear ${isHovered ? 'animate-none' : 'animate-[carousel_40s_linear_infinite]'}`} style={{ display: 'flex', gap: '1.5rem', animation: 'marquee 50s linear infinite', animationPlayState: isHovered ? 'paused' : 'running' }}>
          {/* Output items twice or thrice for seamless looping */}
          {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, i) => (
            <div key={i} className="w-[350px] md:w-[450px] shrink-0 glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-brand/40 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="font-bold text-lg text-white">{review.name}</div>
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(review.stars)].map((_, s) => (
                    <svg key={s} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-400 font-medium leading-relaxed italic">"{review.text}"</p>
              <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-bold">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"></path>
                </svg>
                Перевірений відгук
              </div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}} />
    </section>
  );
}
