'use client';

import { useState, useRef } from 'react';

const PRIZES = [
  { text: 'Безкоштовні пакети', code: 'PKT-FREE', hue: '#eab308' }, // Yellow
  { text: '-10% Рихтування', code: 'RXT-10', hue: '#ef4444' }, // Red
  { text: 'Азот в подарунок', code: 'AZOT-FREE', hue: '#3b82f6' }, // Blue
  { text: 'Чорніння гуми', code: 'BLK-FREE', hue: '#22c55e' }, // Green (Brand)
  { text: '-500 ₴ Зберігання', code: 'SAVE-500', hue: '#a855f7' }, // Purple
];

interface WheelProps {
  onWin: (prizeDetails: { text: string; code: string }) => void;
}

export default function WheelOfFortune({ onWin }: WheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prizeIndex, setPrizeIndex] = useState<number | null>(null);

  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    
    // Randomize winning index
    const winIndex = Math.floor(Math.random() * PRIZES.length);
    
    // Calculate rotation
    // 360 / PRIZES.length = degrees per sector (72)
    // We want to land in the middle of a sector (offset by 36)
    // The pointer is at the top (0 degrees).
    const sectorAngle = 360 / PRIZES.length;
    
    // Add multiple full rotations (e.g. 5 to 8 rotations) + the target angle
    const spins = 5 + Math.random() * 3; 
    const extraDegrees = 360 - (winIndex * sectorAngle) - (sectorAngle / 2);
    
    const totalRotation = rotation + (spins * 360) + extraDegrees;

    setRotation(totalRotation);

    // Wait for animation to finish
    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      setPrizeIndex(winIndex);
      onWin(PRIZES[winIndex]);
    }, 5000); // 5 seconds match the CSS transition duration
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-3xl border border-brand/20 relative overflow-hidden">
      {/* Background glow behind wheel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand/10 blur-[100px] pointer-events-none rounded-full"></div>

      <h3 className="text-2xl sm:text-3xl font-display font-black text-white text-center mb-2 uppercase tracking-widest drop-shadow-md">
        Крутіть <span className="text-brand text-glow">Колесо Фортуни</span>
      </h3>
      <p className="text-gray-400 text-sm sm:text-base text-center mb-8 max-w-sm">
        Отримайте гарантований бонус до вашого запису на сервіс!
      </p>

      {/* WHEEL CONTAINER */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-10 mt-4 filter drop-shadow-[0_0_30px_rgba(57,255,20,0.15)]">
         {/* Pointer */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-brand z-20 drop-shadow-[0_0_10px_rgba(57,255,20,0.6)]"></div>

         {/* The Wheel */}
         <div 
           ref={wheelRef}
           className="w-full h-full rounded-full border-4 border-white/20 relative overflow-hidden shadow-2xl transition-transform ease-[cubic-bezier(0.2,0.8,0.2,1)]"
           style={{ 
             transform: `rotate(${rotation}deg)`, 
             transitionDuration: '5s',
             background: `conic-gradient(from -36deg, ${PRIZES.map((p, i) => `${p.hue} ${i * 72}deg ${(i + 1) * 72}deg`).join(', ')})`
           }}
         >
           {/* Wheel Sectors Separator Lines */}
           {PRIZES.map((_, i) => {
             const angle = (360 / PRIZES.length) * i;
             return (
               <div 
                 key={`line-${i}`} 
                 className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-black/40 origin-left"
                 style={{ transform: `translate(0, -50%) rotate(${angle + 36 - 90}deg)` }}
               ></div>
             )
           })}

           {/* Wheel Text */}
           {PRIZES.map((prize, i) => {
             const angle = (360 / PRIZES.length) * i;
             return (
               <div 
                 key={`text-${i}`} 
                 className="absolute top-1/2 left-1/2 origin-left flex items-center justify-end pr-4 sm:pr-5"
                 style={{ 
                   transform: `translate(0, -50%) rotate(${angle - 90}deg)`, 
                   width: '50%',
                   height: '40px'
                 }}
               >
                 <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-right leading-tight max-w-[80px]">
                   {prize.text}
                 </span>
               </div>
             );
           })}

           {/* Center Hub */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#111] border-4 border-[#333] rounded-full z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center">
             <div className="w-4 h-4 rounded-full bg-brand/50"></div>
           </div>
         </div>
      </div>

      {/* Button OR Prize Result */}
      {!hasSpun ? (
        <button 
           onClick={spinWheel} 
           disabled={isSpinning}
           className="w-full sm:w-auto px-10 py-5 bg-brand text-dark rounded-xl font-display font-black text-xl md:text-2xl btn-glow uppercase tracking-widest hover:bg-white disabled:opacity-50 disabled:scale-95 transition-all shadow-[0_0_30px_rgba(57,255,20,0.4)]"
        >
          {isSpinning ? 'Обертається...' : 'КРУТИТИ КОЛЕСО!'}
        </button>
      ) : (
        <div className="w-full p-6 bg-brand/10 border border-brand/30 rounded-2xl animate-in fade-in slide-in-from-bottom-4 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Ваш виграш:</p>
          <h4 className="text-2xl sm:text-3xl font-display font-black text-brand mb-4 drop-shadow-md">
            {PRIZES[prizeIndex!].text}
          </h4>
          <div className="inline-block bg-[#0a0a0a] border border-white/20 rounded-xl px-6 py-3">
             <span className="text-xs text-gray-500 font-bold uppercase tracking-widest block mb-1">Промокод (покажіть на сервісі)</span>
             <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-widest">{PRIZES[prizeIndex!].code}</span>
          </div>
        </div>
      )}
    </div>
  );
}
