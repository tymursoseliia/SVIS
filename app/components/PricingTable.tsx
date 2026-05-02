"use client";

import { useState } from "react";
import { useSettings } from "@/app/providers/SettingsProvider";

type CarCategory = "Легкові" | "Кросовери" | "Мікроавтобуси";

const dataCars = [
  { r: "13-14", z: 80, m: 80, b: 90, e: 250, t: 1000 },
  { r: "15", z: 90, m: 85, b: 100, e: 275, t: 1100 },
  { r: "16", z: 100, m: 90, b: 110, e: 300, t: 1200 },
  { r: "17", z: 100, m: 100, b: 125, e: 325, t: 1300 },
  { r: "18", z: 110, m: 120, b: 120, e: 350, t: 1400 },
  { r: "19", z: 120, m: 125, b: 130, e: 375, t: 1500 },
  { r: "20", z: 130, m: 130, b: 140, e: 400, t: 1600 },
  { r: "21", z: 140, m: 135, b: 150, e: 425, t: 1700 },
  { r: "22", z: 150, m: 130, b: 170, e: 450, t: 1800 },
  { r: "23", z: 160, m: 150, b: 190, e: 500, t: 2000 },
];

const dataSuv = [
  { r: "15", z: 100, m: 90, b: 110, e: 300, t: 1200 },
  { r: "16", z: 110, m: 95, b: 120, e: 325, t: 1300 },
  { r: "17", z: 120, m: 100, b: 130, e: 350, t: 1400 },
  { r: "18", z: 120, m: 115, b: 140, e: 375, t: 1500 },
  { r: "19", z: 130, m: 120, b: 150, e: 400, t: 1600 },
  { r: "20", z: 140, m: 125, b: 160, e: 425, t: 1700 },
  { r: "21", z: 150, m: 130, b: 170, e: 450, t: 1800 },
  { r: "22", z: 160, m: 140, b: 175, e: 475, t: 1900 },
  { r: "23", z: 180, m: 150, b: 195, e: 525, t: 2100 },
];

const dataBus = [
  { r: "15-16", z: 170, m: 130, b: 100, e: 400, t: 1600, t6: 2400 }
];

export default function PricingTable() {
  const { prices } = useSettings();
  const [activeTab, setActiveTab] = useState<CarCategory>("Легкові");

  // Dynamic mappers
  const dynamicCars = dataCars.map(row => {
    const rKey = `R${row.r}` as any;
    const t = prices.mounting["Легкові"][rKey] || row.t;
    return { ...row, t, e: t / 4 };
  });

  const dynamicSuv = dataSuv.map(row => {
    const rKey = `R${row.r}` as any;
    const t = prices.mounting["Кросовери"][rKey] || row.t;
    return { ...row, t, e: t / 4 };
  });

  const dynamicBus = dataBus.map(row => {
    const rKey = `R${row.r}` as any;
    const t = prices.mounting["Мікроавтобуси"][rKey] || row.t;
    return { ...row, t, e: t / 4, t6: t * 1.5 }; // approximate 6 wheels
  });

  const renderActiveTable = () => {
    switch (activeTab) {
      case "Легкові":
        return (
          <>
            {/* Desktop Table view */}
            <div className="hidden lg:block overflow-x-auto rounded-xl border border-white/10 glass-panel">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 font-display uppercase tracking-wider text-brand text-sm">
                    <th className="p-4 sm:p-5">Радіус</th>
                    <th className="p-4 sm:p-5 text-center">Зняття/встановлення</th>
                    <th className="p-4 sm:p-5 text-center">Монтаж/демонтаж</th>
                    <th className="p-4 sm:p-5 text-center">Балансування</th>
                    <th className="p-4 sm:p-5 text-center">1 колесо (грн)</th>
                    <th className="p-4 sm:p-5 text-center text-brand text-glow font-bold">4 колеса (грн)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {dynamicCars.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-white border-r border-white/5">R{row.r}</td>
                      <td className="p-4 sm:p-5 text-center">{row.z}</td>
                      <td className="p-4 sm:p-5 text-center">{row.m}</td>
                      <td className="p-4 sm:p-5 text-center">{row.b}</td>
                      <td className="p-4 sm:p-5 text-center font-medium text-white/80">{row.e}</td>
                      <td className="p-4 sm:p-5 text-center font-bold text-white tracking-widest bg-brand/5 border-l border-white/5">{row.t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards view */}
            <div className="lg:hidden flex flex-col gap-4">
              {dynamicCars.map((row, idx) => (
                <div key={idx} className="bg-dark/50 border border-white/10 rounded-xl p-5 flex flex-col relative overflow-hidden shadow-lg backdrop-blur-sm">
                  <div className="absolute top-0 right-0 bg-brand text-dark font-display font-bold px-4 py-1.5 rounded-bl-xl shadow-[0_0_15px_rgba(57,255,20,0.5)] text-sm tracking-wider">
                    4 КОЛЕСА: {row.t} ₴
                  </div>
                  <div className="font-display text-4xl font-black text-white mb-4 tracking-tighter drop-shadow-md">R{row.r}</div>
                  
                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-300">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Зняття / встановлення:</span>
                      <span className="text-white font-medium">{row.z} ₴</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Монтаж / демонтаж:</span>
                      <span className="text-white font-medium">{row.m} ₴</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Балансування:</span>
                      <span className="text-white font-medium">{row.b} ₴</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-gray-400">Ціна за 1 колесо:</span>
                      <span className="text-brand font-bold">{row.e} ₴</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case "Кросовери":
        return (
          <>
            <div className="hidden lg:block overflow-x-auto rounded-xl border border-white/10 glass-panel">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 font-display uppercase tracking-wider text-brand text-sm">
                    <th className="p-4 sm:p-5">Радіус</th>
                    <th className="p-4 sm:p-5 text-center">Зняття/встановлення</th>
                    <th className="p-4 sm:p-5 text-center">Монтаж/демонтаж</th>
                    <th className="p-4 sm:p-5 text-center">Балансування</th>
                    <th className="p-4 sm:p-5 text-center">1 колесо (грн)</th>
                    <th className="p-4 sm:p-5 text-center text-brand text-glow font-bold">4 колеса (грн)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {dynamicSuv.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-white border-r border-white/5">R{row.r}</td>
                      <td className="p-4 sm:p-5 text-center">{row.z}</td>
                      <td className="p-4 sm:p-5 text-center">{row.m}</td>
                      <td className="p-4 sm:p-5 text-center">{row.b}</td>
                      <td className="p-4 sm:p-5 text-center font-medium text-white/80">{row.e}</td>
                      <td className="p-4 sm:p-5 text-center font-bold text-white tracking-widest bg-brand/5 border-l border-white/5">{row.t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden flex flex-col gap-4">
              {dynamicSuv.map((row, idx) => (
                <div key={idx} className="bg-dark/50 border border-white/10 rounded-xl p-5 flex flex-col relative overflow-hidden shadow-lg backdrop-blur-sm">
                  <div className="absolute top-0 right-0 bg-brand text-dark font-display font-bold px-4 py-1.5 rounded-bl-xl shadow-[0_0_15px_rgba(57,255,20,0.5)] text-sm tracking-wider">
                    4 КОЛЕСА: {row.t} ₴
                  </div>
                  <div className="font-display text-4xl font-black text-white mb-4 tracking-tighter drop-shadow-md">R{row.r}</div>
                  
                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-300">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Зняття / встановлення:</span>
                      <span className="text-white font-medium">{row.z} ₴</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Монтаж / демонтаж:</span>
                      <span className="text-white font-medium">{row.m} ₴</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Балансування:</span>
                      <span className="text-white font-medium">{row.b} ₴</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-gray-400">Ціна за 1 колесо:</span>
                      <span className="text-brand font-bold">{row.e} ₴</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case "Мікроавтобуси":
        return (
          <>
            <div className="hidden lg:block overflow-x-auto rounded-xl border border-white/10 glass-panel">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 font-display uppercase tracking-wider text-brand text-sm">
                    <th className="p-4 sm:p-5">Радіус</th>
                    <th className="p-4 sm:p-5 text-center">Зняття/встановлення</th>
                    <th className="p-4 sm:p-5 text-center">Монтаж/демонтаж</th>
                    <th className="p-4 sm:p-5 text-center">Балансування</th>
                    <th className="p-4 sm:p-5 text-center">1 колесо (грн)</th>
                    <th className="p-4 sm:p-5 text-center text-brand text-glow font-bold">4 колеса</th>
                    <th className="p-4 sm:p-5 text-center text-brand text-glow font-bold">6 коліс</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {dynamicBus.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-white border-r border-white/5">R{row.r}</td>
                      <td className="p-4 sm:p-5 text-center">{row.z}</td>
                      <td className="p-4 sm:p-5 text-center">{row.m}</td>
                      <td className="p-4 sm:p-5 text-center">{row.b}</td>
                      <td className="p-4 sm:p-5 text-center font-medium text-white/80">{row.e}</td>
                      <td className="p-4 sm:p-5 text-center font-bold text-white tracking-widest bg-brand/5 border-l border-white/5 border-r">{row.t}</td>
                      <td className="p-4 sm:p-5 text-center font-bold text-white tracking-widest bg-brand/5">{row.t6}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 text-sm text-gray-400 border-t border-white/10 bg-dark/30">
                * Застосовується для: Крафтер, Спрінтер, Газель, Рено.
              </div>
            </div>

            <div className="lg:hidden flex flex-col gap-4">
              {dynamicBus.map((row, idx) => (
                 <div key={idx} className="bg-dark/50 border border-brand/30 rounded-xl p-5 flex flex-col relative overflow-hidden shadow-lg backdrop-blur-sm">
                   <div className="absolute top-0 right-0 bg-brand text-dark font-display font-black px-4 py-1.5 rounded-bl-xl shadow-[0_0_15px_rgba(57,255,20,0.5)] text-sm tracking-wider">
                     БУС
                   </div>
                   <div className="font-display text-4xl font-black text-white mb-4 tracking-tighter drop-shadow-md">R{row.r}</div>
                   
                   <div className="grid grid-cols-1 gap-2 text-sm text-gray-300">
                     <div className="flex justify-between border-b border-white/5 pb-2">
                       <span className="text-gray-400">Зняття / встановлення:</span>
                       <span className="text-white font-medium">{row.z} ₴</span>
                     </div>
                     <div className="flex justify-between border-b border-white/5 pb-2">
                       <span className="text-gray-400">Монтаж / демонтаж:</span>
                       <span className="text-white font-medium">{row.m} ₴</span>
                     </div>
                     <div className="flex justify-between border-b border-white/5 pb-2">
                       <span className="text-gray-400">Балансування:</span>
                       <span className="text-white font-medium">{row.b} ₴</span>
                     </div>
                     <div className="flex justify-between pt-1 border-b border-white/5 pb-2">
                       <span className="text-gray-400">Ціна за 1 колесо:</span>
                       <span className="text-white font-medium">{row.e} ₴</span>
                     </div>
                     <div className="flex justify-between pt-2">
                       <span className="text-gray-400 uppercase tracking-widest text-xs font-bold pt-1">За 4 колеса:</span>
                       <span className="text-brand font-bold text-lg">{row.t} ₴</span>
                     </div>
                     <div className="flex justify-between pt-1">
                       <span className="text-gray-400 uppercase tracking-widest text-xs font-bold pt-1">За 6 коліс (спарка):</span>
                       <span className="text-brand font-bold text-lg">{row.t6} ₴</span>
                     </div>
                   </div>
                   
                   <div className="mt-4 p-3 bg-white/5 rounded-lg text-xs leading-relaxed text-gray-400">
                      * Застосовується для: Крафтер, Спрінтер, Газель, Рено та ін.
                   </div>
                 </div>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="w-full mt-12 mb-20 relative z-10 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-8 justify-center">
        {(["Легкові", "Кросовери", "Мікроавтобуси"] as CarCategory[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 text-sm sm:text-base ${
              activeTab === tab
                ? "bg-brand text-dark shadow-[0_0_15px_rgba(57,255,20,0.3)] btn-glow scale-105"
                : "bg-black/40 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white backdrop-blur-sm"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="transition-opacity duration-300 ease-in-out">
        {renderActiveTable()}
      </div>
    </div>
  );
}
