"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        if (window.scrollY > 20) {
          navbar.classList.add("bg-[#1b2110]/90", "backdrop-blur-md", "shadow-lg");
          navbar.classList.remove("glass-panel");
        } else {
          navbar.classList.add("glass-panel");
          navbar.classList.remove("bg-[#1b2110]/90", "backdrop-blur-md", "shadow-lg");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full z-50 glass-panel border-b border-brand/20 transition-all duration-300"
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-brand border-glow overflow-hidden bg-dark">
              <div className="absolute inset-2 border-2 border-dashed border-brand/50 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <span className="font-display text-brand font-bold text-sm sm:text-lg relative z-10 text-glow">
                YV
              </span>
            </div>
            <span className="font-display font-bold text-xl sm:text-2xl tracking-widest text-white">
              SVIS.<span className="text-brand text-glow">YV</span>
            </span>
          </Link>
          
          <div className="hidden xl:flex items-center gap-2 2xl:gap-5 whitespace-nowrap">
            <Link
              href="/services"
              className={`transition-colors text-[10px] xl:text-xs 2xl:text-sm font-bold uppercase tracking-widest ${pathname === "/services" ? "text-brand text-glow" : "text-gray-300 hover:text-brand"}`}
            >
              Послуги
            </Link>
            <Link
              href="/prices"
              className={`transition-colors text-[10px] xl:text-xs 2xl:text-sm font-bold uppercase tracking-widest ${pathname === "/prices" ? "text-brand text-glow" : "text-gray-300 hover:text-brand"}`}
            >
              Ціни
            </Link>
            <Link
              href="/tires"
              className={`transition-colors text-[10px] xl:text-xs 2xl:text-sm font-bold uppercase tracking-widest ${pathname === "/tires" ? "text-brand text-glow" : "text-gray-300 hover:text-brand"}`}
            >
              Купити шини
            </Link>
            <Link
              href="/advantages"
              className={`transition-colors text-[10px] xl:text-xs 2xl:text-sm font-bold uppercase tracking-widest ${pathname === "/advantages" ? "text-brand text-glow" : "text-gray-300 hover:text-brand"}`}
            >
              Переваги
            </Link>
            <Link
              href="/vacancies"
              className={`transition-colors text-[10px] xl:text-xs 2xl:text-sm font-bold uppercase tracking-widest ${pathname === "/vacancies" ? "text-brand text-glow" : "text-gray-300 hover:text-brand"}`}
            >
              Вакансії
            </Link>
            <Link
              href="/training"
              className={`transition-colors text-[10px] xl:text-xs 2xl:text-sm font-bold uppercase tracking-widest hidden 2xl:block ${pathname === "/training" ? "text-brand text-glow" : "text-gray-300 hover:text-brand"}`}
            >
              Навчання
            </Link>
            <Link
              href="/mobile"
              className={`transition-colors text-[10px] xl:text-xs 2xl:text-sm font-bold uppercase tracking-widest ${pathname === "/mobile" ? "text-brand text-glow" : "text-gray-300 hover:text-brand"}`}
            >
              Виїзд
            </Link>
            <Link
              href="/contact"
              className={`transition-colors text-[10px] xl:text-xs 2xl:text-sm font-bold uppercase tracking-widest hidden 2xl:block ${pathname === "/contact" ? "text-brand text-glow" : "text-gray-300 hover:text-brand"}`}
            >
              Контакти
            </Link>
            <Link
              href="/cabinet"
              className={`flex items-center gap-1.5 transition-colors text-[10px] xl:text-xs 2xl:text-sm font-bold uppercase tracking-widest border border-brand/30 px-3 py-1.5 rounded-full ${pathname === "/cabinet" ? "bg-brand/10 text-brand text-glow shadow-[0_0_10px_rgba(57,255,20,0.2)]" : "text-brand/80 hover:text-brand hover:bg-brand/5 hover:border-brand/50"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Кабінет
            </Link>
          </div>
          
          <div className="flex items-center gap-3 md:gap-5 whitespace-nowrap">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            <div className="hidden lg:block text-right">
              <div className="text-[10px] md:text-xs text-brand/70 font-bold tracking-widest uppercase mb-1">
                Щодня 08:00 - 20:00
              </div>
              <a
                href="tel:0672454455"
                className="font-display text-lg md:text-xl font-bold text-white hover:text-brand transition-colors tracking-wider whitespace-nowrap"
              >
                067 245 44 55
              </a>
            </div>
            <Link
              href="/#booking"
              className="hidden sm:inline-flex items-center justify-center px-4 md:px-5 py-2 md:py-2.5 border-2 border-brand text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg text-dark bg-brand hover:bg-transparent hover:text-brand transition-all duration-300 btn-glow whitespace-nowrap"
            >
              Записатися
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden flex items-center justify-center p-2 text-white hover:text-brand transition-colors relative z-[60] ml-1 bg-dark/50 backdrop-blur-md rounded-lg border border-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`absolute top-full left-0 w-full bg-[#1b2110]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 xl:hidden grid ${
          isMobileMenuOpen ? "grid-rows-[1fr] opacity-100 shadow-2xl" : "grid-rows-[0fr] opacity-0 border-transparent shadow-none"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 w-full px-6 relative z-10 py-6">
            {[
              { name: "Кабінет Клієнта", path: "/cabinet" },
              { name: "Послуги", path: "/services" },
              { name: "Ціни", path: "/prices" },
              { name: "Купити шини", path: "/tires" },
              { name: "Переваги", path: "/advantages" },
              { name: "Вакансії", path: "/vacancies" },
              { name: "Навчання", path: "/training" },
              { name: "Виїзд", path: "/mobile" },
              { name: "Контакти", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-display font-medium uppercase tracking-wider transition-all border-b border-white/5 pb-3 ${pathname === item.path ? 'text-brand text-glow' : 'text-white hover:text-brand'}`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex flex-col mt-2 gap-4">
              <div className="sm:hidden flex justify-center py-2">
                <LanguageSwitcher />
              </div>
              
              <a href="tel:0672454455" className="font-display text-xl font-bold text-white tracking-widest hover:text-brand transition-colors">
                067 245 44 55
              </a>
              
              <Link
                href="/#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full max-w-sm flex justify-center py-3 border border-brand text-sm font-bold uppercase tracking-wider rounded-lg text-dark bg-brand btn-glow shadow-[0_0_15px_rgba(57,255,20,0.2)]"
              >
                Записатися
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
