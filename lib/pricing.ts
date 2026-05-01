export type CarCategory = "Легкові" | "Кросовери" | "Мікроавтобуси";
export type Radius = "R13-14" | "R15" | "R16" | "R17" | "R18" | "R19" | "R20" | "R21" | "R22" | "R23" | "R15-16";

export const MOUNTING_PRICES: Record<CarCategory, Partial<Record<Radius, number>>> = {
  "Легкові": {
    "R13-14": 1000,
    "R15": 1100,
    "R16": 1200,
    "R17": 1300,
    "R18": 1400,
    "R19": 1500,
    "R20": 1600,
    "R21": 1700,
    "R22": 1800,
    "R23": 2000,
  },
  "Кросовери": {
    "R15": 1200,
    "R16": 1300,
    "R17": 1400,
    "R18": 1500,
    "R19": 1600,
    "R20": 1700,
    "R21": 1800,
    "R22": 1900,
    "R23": 2100,
  },
  "Мікроавтобуси": {
    "R15-16": 1600,
  },
};

export type StorageCategory = "R13-R16" | "R17-R18" | "R19-R23";
export type StorageType = "Шини" | "Гума з дисками" | "Окремо диски";

export const STORAGE_PRICES: Record<StorageCategory, Record<StorageType, number>> = {
  "R13-R16": {
    "Шини": 1000,
    "Гума з дисками": 1200,
    "Окремо диски": 1500,
  },
  "R17-R18": {
    "Шини": 1200,
    "Гума з дисками": 1500,
    "Окремо диски": 1800,
  },
  "R19-R23": {
    "Шини": 1800,
    "Гума з дисками": 2400,
    "Окремо диски": 3000,
  },
};

// Map distinct radii to storage category
export const getStorageCategory = (radius: string): StorageCategory => {
  if (["R13-14", "R15", "R16", "R15-16"].includes(radius)) return "R13-R16";
  if (["R17", "R18"].includes(radius)) return "R17-R18";
  return "R19-R23"; // R19, R20, R21, R22, R23
};

// Base static prices for other services
export const BASE_SERVICE_PRICES: Record<string, number> = {
  'Курс: Навчання': 5000,
  'Набір Lady Rescue Kit': 3500,
  'Балансування': 400,
  'Рихтування дисків': 600,
  'Виїзний шиномонтаж': 1500,
  'Пакування (фірмові пакети)': 100,
  'Утилізація шин': 100,
  'Корпоративне обслуговування (B2B)': 0,
  'Інше': 500
};

// Get the available radii given a car category
export const getAvailableRadii = (category: CarCategory): Radius[] => {
  return Object.keys(MOUNTING_PRICES[category]) as Radius[];
};
