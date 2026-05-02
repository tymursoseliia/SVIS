'use client';

import React, { createContext, useContext } from 'react';
import { SitePrices, DEFAULT_PRICES } from '@/lib/pricing';

interface SiteSettings {
  prices: SitePrices;
  sections: {
    heroTitle: string;
    heroSubtitle: string;
  };
}

const SettingsContext = createContext<SiteSettings>({
  prices: DEFAULT_PRICES,
  sections: { heroTitle: 'ШИНОМОНТАЖ', heroSubtitle: 'Зберігання шин | Рихтування дисків' }
});

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children, settings }: { children: React.ReactNode, settings: SiteSettings }) {
  // Deep merge prices to ensure no missing keys if DB structure is incomplete
  const mergedPrices = { ...DEFAULT_PRICES };
  
  if (settings?.prices) {
    // Basic deep merge for top level keys to prevent crashes
    if (settings.prices.mounting) mergedPrices.mounting = { ...DEFAULT_PRICES.mounting, ...settings.prices.mounting };
    if (settings.prices.storage) mergedPrices.storage = { ...DEFAULT_PRICES.storage, ...settings.prices.storage };
    if (settings.prices.diskRepair) mergedPrices.diskRepair = { ...DEFAULT_PRICES.diskRepair, ...settings.prices.diskRepair };
    if (settings.prices.extraServices) mergedPrices.extraServices = { ...DEFAULT_PRICES.extraServices, ...settings.prices.extraServices };
    if (settings.prices.baseServices) mergedPrices.baseServices = { ...DEFAULT_PRICES.baseServices, ...settings.prices.baseServices };
  }

  const mergedSettings = {
    prices: mergedPrices,
    sections: {
      heroTitle: settings?.sections?.heroTitle || 'ШИНОМОНТАЖ',
      heroSubtitle: settings?.sections?.heroSubtitle || 'Зберігання шин | Рихтування дисків',
    }
  };

  return (
    <SettingsContext.Provider value={mergedSettings}>
      {children}
    </SettingsContext.Provider>
  );
}
