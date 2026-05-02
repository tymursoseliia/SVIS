import PricingTable from "../components/PricingTable";
import BookingForm from "../components/BookingForm";
import { StorageCategory, DEFAULT_PRICES } from "@/lib/pricing";
import { getSiteSettings } from "@/app/actions/settings";

export const metadata = {
  title: "Прейскурант | SVIS.YV Шиномонтаж",
  description: "Ціни на послуги шиномонтажу: легкові, кросовери, буси. Балансування, зберігання шин, рихтування дисків, латки, вулканізація.",
};

export default async function PricesPage() {
  const pricesRes = await getSiteSettings('prices');
  
  const prices = { ...DEFAULT_PRICES };
  const dbPrices = pricesRes.data;
  if (dbPrices) {
    if (dbPrices.mounting) prices.mounting = { ...DEFAULT_PRICES.mounting, ...dbPrices.mounting };
    if (dbPrices.storage) prices.storage = { ...DEFAULT_PRICES.storage, ...dbPrices.storage };
    if (dbPrices.diskRepair) prices.diskRepair = { ...DEFAULT_PRICES.diskRepair, ...dbPrices.diskRepair };
    if (dbPrices.extraServices) prices.extraServices = { ...DEFAULT_PRICES.extraServices, ...dbPrices.extraServices };
    if (dbPrices.baseServices) prices.baseServices = { ...DEFAULT_PRICES.baseServices, ...dbPrices.baseServices };
  }

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
                    {Object.keys(prices.storage.duration1).map((rKey, idx) => {
                      const cat = rKey as StorageCategory;
                      const p1 = prices.storage.duration1[cat];
                      const p6 = prices.storage.duration6[cat];
                      return (
                        <tr key={idx} className="hover:bg-white/5 transition-colors text-center">
                          <td className="p-4 font-bold text-white border-r border-white/5 text-left">{cat}</td>
                          <td className="p-3 border-l border-white/5 text-white/70">{p1['Шини']}</td>
                          <td className="p-3 border-l border-white/5 font-bold text-white">{p6['Шини']}</td>
                          <td className="p-3 border-l border-white/5 border-l-brand/30 text-white/70">{p1['Гума з дисками']}</td>
                          <td className="p-3 border-l border-white/5 font-bold text-white bg-white/5">{p6['Гума з дисками']}</td>
                          <td className="p-3 border-l border-white/5 border-l-brand/30 text-white/70">{p1['Окремо диски']}</td>
                          <td className="p-3 border-l border-white/5 font-bold text-white bg-white/5">{p6['Окремо диски']}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden flex flex-col gap-4 mt-4">
                    {Object.keys(prices.storage.duration1).map((rKey, idx) => {
                      const cat = rKey as StorageCategory;
                      const p1 = prices.storage.duration1[cat];
                      const p6 = prices.storage.duration6[cat];
                      return (
                  <div key={idx} className="bg-dark/50 border border-white/10 rounded-xl p-5 shadow-lg backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-brand text-dark font-black px-4 py-1 rounded-bl-xl shadow-[0_0_10px_rgba(57,255,20,0.5)] font-display text-lg tracking-widest">{cat}</div>
                    <h3 className="text-xl font-display font-bold text-white mb-6 pr-24 tracking-wider">{cat}</h3>
                    
                    <div className="space-y-4">
                      {/* Шини */}
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="text-brand font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand"></span> Тільки Шини
                        </div>
                        <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                          <span className="text-gray-400">1 місяць:</span>
                          <span className="text-white font-medium">{p1['Шини']} ₴</span>
                        </div>
                        <div className="flex justify-between text-sm pt-2">
                          <span className="text-gray-300 font-bold">6 місяців (сезон):</span>
                          <span className="text-white font-black">{p6['Шини']} ₴</span>
                        </div>
                      </div>
                      
                      {/* Шини з дисками */}
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                         <div className="text-brand font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand"></span> Шини з дисками
                        </div>
                        <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                          <span className="text-gray-400">1 місяць:</span>
                          <span className="text-white font-medium">{p1['Гума з дисками']} ₴</span>
                        </div>
                        <div className="flex justify-between text-sm pt-2">
                          <span className="text-gray-300 font-bold">6 місяців (сезон):</span>
                          <span className="text-white font-black">{p6['Гума з дисками']} ₴</span>
                        </div>
                      </div>

                      {/* Диски */}
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="text-brand font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand"></span> Окремо диски
                        </div>
                        <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                          <span className="text-gray-400">1 місяць:</span>
                          <span className="text-white font-medium">{p1['Окремо диски']} ₴</span>
                        </div>
                        <div className="flex justify-between text-sm pt-2">
                          <span className="text-gray-300 font-bold">6 місяців (сезон):</span>
                          <span className="text-white font-black">{p6['Окремо диски']} ₴</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )})}
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
                    {Object.entries(prices.diskRepair.alloy).map(([r, p]) => (
                    <li key={r} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-gray-400">{r}</span>
                      <span className="font-bold text-white tracking-widest">{p} грн.</span>
                    </li>
                    ))}
                  </ul>
                </div>
                
                <div className="glass-panel p-6 rounded-xl border border-white/10 hover:border-brand/30 transition-colors">
                  <h3 className="font-display uppercase tracking-widest text-brand mb-4 text-glow">Прокатка залізних</h3>
                  <ul className="space-y-3">
                    {Object.entries(prices.diskRepair.steel).map(([r, p]) => (
                    <li key={r} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-gray-400 text-sm">{r}</span>
                      <span className="font-bold text-white tracking-wider">від {p} грн.</span>
                    </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-2 font-display uppercase tracking-widest text-brand">Установка/Зняття 4-x коліс</p>
                    <div className="flex justify-between text-sm py-1">
                      <span>Легкові:</span> <span className="font-bold text-white">{prices.diskRepair.install["Легкові"]} грн</span>
                    </div>
                    <div className="flex justify-between text-sm py-1">
                      <span>Кросовери:</span> <span className="font-bold text-white">{prices.diskRepair.install["Кросовери"]} грн</span>
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
                {prices.extraServices.valves.map(v => (
                <li key={v.name} className="flex justify-between">
                  <span className="text-gray-400">{v.name}</span>
                  <span className="font-bold text-brand">{v.price} грн.</span>
                </li>
                ))}
              </ul>
            </div>
            
            {/* Column 2 */}
            <div className="glass-panel p-6 rounded-xl border border-brand/20 bg-brand/5">
              <h3 className="font-display font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-4">Латки Tip-Top</h3>
              <ul className="space-y-3">
                {prices.extraServices.patches.map(p => (
                  <li key={p.name} className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-300">{p.name}</span>
                    <span className="font-bold text-brand">{p.price} грн.</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 3 */}
            <div className="glass-panel p-6 rounded-xl border border-white/10">
              <h3 className="font-display font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-4">Інші роботи</h3>
              <ul className="space-y-4">
                {prices.extraServices.other.map(o => (
                <li key={o.name} className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">{o.name}</span>
                  <span className="font-bold text-white text-right">{o.price}</span>
                </li>
                ))}
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
