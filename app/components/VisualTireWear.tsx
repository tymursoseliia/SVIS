'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function VisualTireWear() {
  const [mileage, setMileage] = useState<number>(15000);

  const maxMileage = 60000;
  
  // Обчислення статусу
  const status = useMemo(() => {
    if (mileage < 15000) return 'ідеально';
    if (mileage < 40000) return 'увага';
    return 'критично';
  }, [mileage]);

  const colorConfig = {
    'ідеально': { color: '#22c55e', text: 'text-green-500', bg: 'bg-green-500/20', border: 'border-green-500/50', shadow: 'shadow-[0_0_30px_rgba(34,197,94,0.3)]' },
    'увага': { color: '#eab308', text: 'text-yellow-500', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', shadow: 'shadow-[0_0_30px_rgba(234,179,8,0.3)]' },
    'критично': { color: '#ef4444', text: 'text-red-500', bg: 'bg-red-500/20', border: 'border-red-500/50', shadow: 'shadow-[0_0_30px_rgba(239,68,68,0.3)]' }
  };

  const currentConfig = colorConfig[status];

  // Динамічний SVG-малюнок протектора шини (від 100% до 10% висоти ліній)
  const treadPercentage = Math.max(10, 100 - (mileage / maxMileage) * 100);

  return (
    <section className="py-20 relative overflow-hidden" id="tire-wear">
      <div className="absolute inset-0 bg-black z-0"></div>
      
      {/* Dynamic Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 transition-all duration-1000 z-0"
        style={{ backgroundColor: currentConfig.color }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-widest drop-shadow-lg mb-4">
             Візуальний <span className="text-brand text-glow">Конфігуратор Зносу</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
             Вкажіть ваш середній пробіг на одному комплекті гуми, і наша система покаже її реальний стан та необхідні сервісні рекомендації.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* LEFT: 3D Tire Visualization */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
             <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 flex items-center justify-center transition-all duration-700 ${currentConfig.border} ${currentConfig.shadow} ${currentConfig.bg} backdrop-blur-md`}>
                
                {/* SVG імітація покришки та протектора */}
                <svg className="absolute w-full h-full inset-0 drop-shadow-2xl" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#111" strokeWidth="20" />
                  
                  {/* Протектор (динамічно зникає) */}
                  <g stroke={currentConfig.color} strokeWidth="4" className="transition-all duration-1000 ease-out" opacity={treadPercentage / 100}>
                    <path d="M 20 100 Q 100 20 180 100 Q 100 180 20 100" fill="none" />
                    <path d="M 40 100 Q 100 40 160 100 Q 100 160 40 100" fill="none" />
                    <path d="M 60 100 Q 100 60 140 100 Q 100 140 60 100" fill="none" />
                    <circle cx="100" cy="100" r={Math.max(10, 80 * (treadPercentage/100))} strokeDasharray="5,5" fill="none" />
                  </g>
                  
                  {/* Диск (Center Hub) */}
                  <circle cx="100" cy="100" r="40" fill="#222" stroke="#444" strokeWidth="4" />
                  <circle cx="100" cy="100" r="10" fill="#555" />
                  <line x1="100" y1="60" x2="100" y2="40" stroke="#444" strokeWidth="6" />
                  <line x1="100" y1="140" x2="100" y2="160" stroke="#444" strokeWidth="6" />
                  <line x1="60" y1="100" x2="40" y2="100" stroke="#444" strokeWidth="6" />
                  <line x1="140" y1="100" x2="160" y2="100" stroke="#444" strokeWidth="6" />
                </svg>

                {/* Text Overlay inside wheel */}
                <div className="absolute text-center z-10 bg-black/60 rounded-full w-24 h-24 flex flex-col items-center justify-center border border-white/10 backdrop-blur-sm">
                   <div className={`text-xl font-black font-display ${currentConfig.text}`}>
                     {(8 * (treadPercentage/100)).toFixed(1)}
                   </div>
                   <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ММ ПРОТЕКТОРА</div>
                </div>

             </div>
          </div>

          {/* RIGHT: Controls & Info */}
          <div className="w-full lg:w-1/2">
             <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10">
               <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">
                  Ваш пробіг: <span className="text-brand font-display font-black text-3xl">{mileage.toLocaleString('uk-UA')} км</span>
               </h3>

               {/* Slider */}
               <div className="relative mb-12">
                 <input 
                   type="range" 
                   min="0" 
                   max={maxMileage} 
                   step="1000" 
                   value={mileage} 
                   onChange={(e) => setMileage(Number(e.target.value))}
                   className="w-full h-3 bg-[#111] rounded-lg appearance-none cursor-pointer border border-white/10 relative z-10"
                   style={{
                     background: `linear-gradient(to right, ${currentConfig.color} ${(mileage / maxMileage) * 100}%, #111 ${(mileage / maxMileage) * 100}%)`,
                   }}
                 />
                 <div className="flex justify-between text-xs text-gray-500 font-bold uppercase tracking-widest mt-3">
                   <span>0 км</span>
                   <span>30 000 км</span>
                   <span>60 000+ км</span>
                 </div>
               </div>

               {/* Dynamic Info Panel */}
               <div className={`p-6 rounded-2xl border transition-all duration-500 ${currentConfig.bg} ${currentConfig.border} mb-8`}>
                 <div className="flex items-start gap-4">
                   <div className={`text-3xl ${currentConfig.text}`}>
                     {status === 'ідеально' && '🛡️'}
                     {status === 'увага' && '⚠️'}
                     {status === 'критично' && '🚨'}
                   </div>
                   <div>
                     <h4 className={`text-xl font-black uppercase tracking-wider mb-2 ${currentConfig.text}`}>
                       {status === 'ідеально' && 'Стан: Ідеальний'}
                       {status === 'увага' && 'Потребує уваги'}
                       {status === 'критично' && 'Критичний знос'}
                     </h4>
                     <p className="text-gray-300 text-sm leading-relaxed">
                       {status === 'ідеально' && 'Ваша гума ще повністю зберігає заводські властивості. Забезпечено максимальне зчеплення з дорогою та безпеку. Насолоджуйтесь їздою!'}
                       {status === 'увага' && 'Рекомендується змінити гуму місцями (перекинути передню на задню вісь задля рівномірного зносу) та обов\'язково перевірити балансування.'}
                       {status === 'критично' && 'Глибина протектора нижче допустимої норми (або на межі)! Гальмівний шлях збільшено на 40%. Терміново рекомендуємо подумати про заміну комплекту.'}
                     </p>
                   </div>
                 </div>
               </div>

               {/* Action Buttons */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {status !== 'критично' ? (
                   <>
                     <Link href="/#booking" className="py-4 text-center bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest rounded-xl hover:border-brand hover:text-brand transition-all">
                       Балансування
                     </Link>
                     <Link href="/services" className="py-4 text-center bg-[#111] border border-white/10 text-white font-bold uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all">
                       Розвал-сходження
                     </Link>
                   </>
                 ) : (
                   <>
                     <Link href="/tires" className="py-4 text-center bg-red-500 text-white font-black uppercase tracking-widest rounded-xl hover:bg-red-400 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                       Купити нову гуму
                     </Link>
                     <Link href="/#booking" className="py-4 text-center bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest rounded-xl hover:border-brand transition-all">
                       Консультація
                     </Link>
                   </>
                 )}
               </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
