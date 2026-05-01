"use client";

import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [activeLang, setActiveLang] = useState("uk"); // Default language

  useEffect(() => {
    // Check if script already exists to avoid duplicates on fast refresh
    if (!document.getElementById("google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      document.body.appendChild(addScript);
      
      // Define the callback
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "uk",
            includedLanguages: "uk,ru,en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    }

    // Attempt to read current language from cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const currentLangCookie = getCookie("googtrans");
    if (currentLangCookie) {
      // googtrans cookie looks like "/uk/ru" or "/uk/en"
      const lang = currentLangCookie.split("/").pop();
      if (lang && ["uk", "ru", "en"].includes(lang)) {
        setActiveLang(lang);
      }
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    setActiveLang(langCode);
    
    // Set cookie for google translate
    // Google translate uses a cookie named "googtrans" with value "/uk/langCode"
    const domain = window.location.hostname;
    document.cookie = `googtrans=/uk/${langCode}; path=/; domain=${domain};`;
    document.cookie = `googtrans=/uk/${langCode}; path=/;`; // also for root
    
    // Force reload to apply translation cleanly
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
      <div id="google_translate_element" className="hidden"></div>
      <button
        onClick={() => changeLanguage("uk")}
        className={`transition-colors hover:text-brand ${activeLang === "uk" ? "text-brand text-glow" : ""}`}
      >
        UA
      </button>
      <span className="text-white/20">|</span>
      <button
        onClick={() => changeLanguage("ru")}
        className={`transition-colors hover:text-brand ${activeLang === "ru" ? "text-brand text-glow" : ""}`}
      >
        RU
      </button>
      <span className="text-white/20">|</span>
      <button
        onClick={() => changeLanguage("en")}
        className={`transition-colors hover:text-brand ${activeLang === "en" ? "text-brand text-glow" : ""}`}
      >
        EN
      </button>
    </div>
  );
}
