import PricingTable from "../components/PricingTable";
import BookingForm from "../components/BookingForm";

export const metadata = {
  title: "Прейскурант | SVIS.YV Шиномонтаж",
  description: "Ціни на послуги шиномонтажу: легкові, кросовери, буси. Балансування, зберігання шин, рихтування дисків, латки, вулканізація.",
};

export default function PricesPage() {
  return (
    <main className="bg-dark min-h-screen text-gray-300">
      {/* Header section */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent z-0"></div>
        <div className="smoke-bg z-0 opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/5 backdrop-blur-sm text-sm font-bold uppercase tracking-widest text-brand mb-6">
            ПРАЙС-ЛИСТ
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tight uppercase text-white drop-shadow-lg mb-6">
            НАШІ <span className="text-brand text-glow">ЦІНИ</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Прозорі ціни на всі види шиномонтажних послуг. Обирайте свій тип автомобіля та радіус для розрахунку вартості.
          </p>
        </div>
      </section>

      {/* Main Pricing Tables */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingTable />
        </div>
      </section>

      {/* Storage & Disks */}
      <section className="py-20 bg-dark relative border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/5 via-dark to-dark opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
            {/* Storage */}
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white mb-6 flex items-center gap-4">
                <span className="w-8 h-1 bg-brand rounded-full"></span>
                Зберігання <span className="text-brand">гуми</span>
              </h2>
              
              <div className="hidden lg:block overflow-x-auto rounded-xl border border-white/10 glass-panel">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 font-display text-xs uppercase tracking-wider text-gray-400">
                      <th className="p-4" rowSpan={2}>Діаметр</th>
                      <th className="p-2 border-l border-white/5 text-center" colSpan={2}>Шини</th>
                      <th className="p-2 border-l border-white/5 text-center" colSpan={2}>Шини з дисками</th>
                      <th className="p-2 border-l border-white/5 text-center" colSpan={2}>Окремо диски</th>
                    </tr>
                    <tr className="bg-white/5 border-b border-white/10 font-display text-[10px] md:text-xs text-brand uppercase tracking-wider">
                      <th className="p-2 border-l border-white/5 text-center">1 міс.</th>
                      <th className="p-2 border-l border-white/5 text-center">6 міс.</th>
                      <th className="p-2 border-l border-white/5 text-center">1 міс.</th>
                      <th className="p-2 border-l border-white/5 text-center">6 міс.</th>
                      <th className="p-2 border-l border-white/5 text-center">1 міс.</th>
                      <th className="p-2 border-l border-white/5 text-center">6 міс.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {[
                      { r: "R13-R16", t1: "170", t6: "1000", w1: "200", w6: "1200", d1: "250", d6: "1500" },
                      { r: "R17-R18", t1: "200", t6: "1200", w1: "250", w6: "1500", d1: "300", d6: "1800" },
                      { r: "R19-R23", t1: "300", t6: "1800", w1: "400", w6: "2400", d1: "500", d6: "3000" }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors text-center">
                        <td className="p-4 font-bold text-white border-r border-white/5 text-left">{row.r}</td>
                        <td className="p-3 border-l border-white/5 text-white/70">{row.t1}</td>
                        <td className="p-3 border-l border-white/5 font-bold text-white">{row.t6}</td>
                        <td className="p-3 border-l border-white/5 border-l-brand/30 text-white/70">{row.w1}</td>
                        <td className="p-3 border-l border-white/5 font-bold text-white bg-white/5">{row.w6}</td>
                        <td className="p-3 border-l border-white/5 border-l-brand/30 text-white/70">{row.d1}</td>
                        <td className="p-3 border-l border-white/5 font-bold text-white bg-white/5">{row.d6}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden flex flex-col gap-4 mt-4">
                {[
                  { r: "R13-R16", t1: "170", t6: "1000", w1: "200", w6: "1200", d1: "250", d6: "1500" },
                  { r: "R17-R18", t1: "200", t6: "1200", w1: "250", w6: "1500", d1: "300", d6: "1800" },
                  { r: "R19-R23", t1: "300", t6: "1800", w1: "400", w6: "2400", d1: "500", d6: "3000" }
                ].map((row, idx) => (
                  <div key={idx} className="bg-dark/50 border border-white/10 rounded-xl p-5 shadow-lg backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-brand text-dark font-black px-4 py-1 rounded-bl-xl shadow-[0_0_10px_rgba(57,255,20,0.5)] font-display text-lg tracking-widest">{row.r}</div>
                    <h3 className="text-xl font-display font-bold text-white mb-6 pr-24 tracking-wider">{row.r}</h3>
                    
                    <div className="space-y-4">
                      {/* Шини */}
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="text-brand font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand"></span> Тільки Шини
                        </div>
                        <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                          <span className="text-gray-400">1 місяць:</span>
                          <span className="text-white font-medium">{row.t1} ₴</span>
                        </div>
                        <div className="flex justify-between text-sm pt-2">
                          <span className="text-gray-300 font-bold">6 місяців (сезон):</span>
                          <span className="text-white font-black">{row.t6} ₴</span>
                        </div>
                      </div>
                      
                      {/* Шини з дисками */}
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                         <div className="text-brand font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand"></span> Шини з дисками
                        </div>
                        <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                          <span className="text-gray-400">1 місяць:</span>
                          <span className="text-white font-medium">{row.w1} ₴</span>
                        </div>
                        <div className="flex justify-between text-sm pt-2">
                          <span className="text-gray-300 font-bold">6 місяців (сезон):</span>
                          <span className="text-white font-black">{row.w6} ₴</span>
                        </div>
                      </div>

                      {/* Диски */}
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="text-brand font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand"></span> Окремо диски
                        </div>
                        <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                          <span className="text-gray-400">1 місяць:</span>
                          <span className="text-white font-medium">{row.d1} ₴</span>
                        </div>
                        <div className="flex justify-between text-sm pt-2">
                          <span className="text-gray-300 font-bold">6 місяців (сезон):</span>
                          <span className="text-white font-black">{row.d6} ₴</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 border border-brand/20 bg-brand/5 rounded-lg text-sm flex gap-3 text-brand text-glow">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Низькопрофільні покришки – шини Run Flat +20% від вартості монтажу
              </div>
            </div>

            {/* Disk Repair */}
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white mb-6 flex items-center gap-4">
                <span className="w-8 h-1 bg-brand rounded-full"></span>
                Ремонт <span className="text-brand">дисків</span>
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-xl border border-white/10 hover:border-brand/30 transition-colors">
                  <h3 className="font-display uppercase tracking-widest text-brand mb-4 text-glow">Рихтовка литих</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-gray-400">R13-15</span>
                      <span className="font-bold text-white tracking-widest">500 грн.</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-gray-400">R16-18</span>
                      <span className="font-bold text-white tracking-widest">600 грн.</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-gray-400">R19-22</span>
                      <span className="font-bold text-white tracking-widest">700 грн.</span>
                    </li>
                    <li className="flex justify-between items-center pb-2">
                      <span className="text-gray-400">R23</span>
                      <span className="font-bold text-white tracking-widest">1000 грн.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="glass-panel p-6 rounded-xl border border-white/10 hover:border-brand/30 transition-colors">
                  <h3 className="font-display uppercase tracking-widest text-brand mb-4 text-glow">Прокатка залізних</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-gray-400">R13-16</span>
                      <span className="font-bold text-white tracking-wider">від 350 грн.</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-gray-400 text-sm">Спрінтер, Крафтер</span>
                      <span className="font-bold text-white tracking-wider">від 400 грн.</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-2 font-display uppercase tracking-widest text-brand">Установка/Зняття 4-x коліс</p>
                    <div className="flex justify-between text-sm py-1">
                      <span>Легкові:</span> <span className="font-bold text-white">500 грн</span>
                    </div>
                    <div className="flex justify-between text-sm py-1">
                      <span>Кросовери:</span> <span className="font-bold text-white">600 грн</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white mb-10 text-center">
            Додаткові <span className="text-brand text-glow">послуги</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Column 1 */}
            <div className="glass-panel p-6 rounded-xl border border-white/10">
              <h3 className="font-display font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-4">Вентилі та датчики</h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-gray-400">Вентиль</span>
                  <span className="font-bold text-brand">50 грн.</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Вентиль залізний</span>
                  <span className="font-bold text-brand">100 грн.</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Вентиль під датчик</span>
                  <span className="font-bold text-brand">250 грн.</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Встановлення датчика</span>
                  <span className="font-bold text-brand">25 грн.</span>
                </li>
              </ul>
            </div>
            
            {/* Column 2 */}
            <div className="glass-panel p-6 rounded-xl border border-brand/20 bg-brand/5">
              <h3 className="font-display font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-4">Латки Tip-Top</h3>
              <ul className="space-y-3">
                {[
                  { n: "110", p: "250" }, { n: "115", p: "300" }, 
                  { n: "116", p: "350" }, { n: "120", p: "400" }, 
                  { n: "125", p: "500" }
                ].map(p => (
                  <li key={p.n} className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-300">{p.n} p</span>
                    <span className="font-bold text-brand">{p.p} грн.</span>
                  </li>
                ))}
                <li className="flex justify-between pt-1">
                  <span className="text-gray-300">УП-4,5</span>
                  <span className="font-bold text-brand">120 грн.</span>
                </li>
                <li className="flex justify-between border-t border-white/5 pt-2">
                  <span className="text-gray-300">УП-8</span>
                  <span className="font-bold text-brand">150 грн.</span>
                </li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div className="glass-panel p-6 rounded-xl border border-white/10">
              <h3 className="font-display font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-4">Інші роботи</h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-gray-400">Латки камерні</span>
                  <span className="font-bold text-white">від 50 - 150 грн.</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Утилізація покришки</span>
                  <span className="font-bold text-white">100 грн.</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Чистка дисків</span>
                  <span className="font-bold text-white">80 грн.</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400 flex flex-col">
                    <span>Обробка дисків</span>
                    <span className="text-xs text-gray-500">пастою</span>
                  </span>
                  <span className="font-bold text-white mt-1">30 грн.</span>
                </li>
                <li className="flex justify-between border-t border-white/10 pt-4 mt-2">
                  <span className="text-white font-bold uppercase text-sm">Зварювання дисків <br/> (Аргон)</span>
                  <span className="font-bold text-brand text-glow text-right">від 1000<br/>грн</span>
                </li>
                <li className="flex justify-between border-t border-white/10 pt-4 mt-2">
                  <span className="text-white font-bold uppercase text-sm">Вулканізація</span>
                  <span className="font-bold text-brand text-glow">від 1200 грн</span>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* Booking Form CTA */}
      <section className="py-24 bg-dark relative border-t border-brand/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>
      </section>
    </main>
  );
}
