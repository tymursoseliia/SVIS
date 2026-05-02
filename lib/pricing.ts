export type CarCategory = "Легкові" | "Кросовери" | "Мікроавтобуси";
export type Radius = "R13-14" | "R15" | "R16" | "R17" | "R18" | "R19" | "R20" | "R21" | "R22" | "R23" | "R15-16";
export type StorageCategory = "R13-R16" | "R17-R18" | "R19-R23";
export type StorageType = "Шини" | "Гума з дисками" | "Окремо диски";

export interface SitePrices {
  mounting: Record<CarCategory, Partial<Record<Radius, number>>>;
  storage: {
    duration1: Record<StorageCategory, Record<StorageType, number>>;
    duration6: Record<StorageCategory, Record<StorageType, number>>;
  };
  diskRepair: {
    alloy: { "R13-15": number; "R16-18": number; "R19-22": number; "R23": number };
    steel: { "R13-16": number; "Спрінтер": number };
    install: { "Легкові": number; "Кросовери": number };
  };
  extraServices: {
    valves: { name: string; price: number }[];
    patches: { name: string; price: number }[];
    other: { name: string; price: string }[];
  };
  baseServices: Record<string, number>;
}

export const DEFAULT_PRICES: SitePrices = {
  mounting: {
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
  },
  storage: {
    duration1: {
      "R13-R16": { "Шини": 170, "Гума з дисками": 200, "Окремо диски": 250 },
      "R17-R18": { "Шини": 200, "Гума з дисками": 250, "Окремо диски": 300 },
      "R19-R23": { "Шини": 300, "Гума з дисками": 400, "Окремо диски": 500 },
    },
    duration6: {
      "R13-R16": { "Шини": 1000, "Гума з дисками": 1200, "Окремо диски": 1500 },
      "R17-R18": { "Шини": 1200, "Гума з дисками": 1500, "Окремо диски": 1800 },
      "R19-R23": { "Шини": 1800, "Гума з дисками": 2400, "Окремо диски": 3000 },
    }
  },
  diskRepair: {
    alloy: { "R13-15": 500, "R16-18": 600, "R19-22": 700, "R23": 1000 },
    steel: { "R13-16": 350, "Спрінтер": 400 },
    install: { "Легкові": 500, "Кросовери": 600 }
  },
  extraServices: {
    valves: [
      { name: "Вентиль", price: 50 },
      { name: "Вентиль залізний", price: 100 },
      { name: "Вентиль під датчик", price: 250 },
      { name: "Встановлення датчика", price: 25 }
    ],
    patches: [
      { name: "110", price: 250 },
      { name: "115", price: 300 },
      { name: "116", price: 350 },
      { name: "120", price: 400 },
      { name: "125", price: 500 },
      { name: "УП-4,5", price: 120 },
      { name: "УП-8", price: 150 }
    ],
    other: [
      { name: "Латки камерні", price: "від 50 - 150 грн." },
      { name: "Утилізація покришки", price: "100 грн." },
      { name: "Чистка дисків", price: "80 грн." },
      { name: "Обробка дисків пастою", price: "30 грн." },
      { name: "Зварювання дисків (Аргон)", price: "від 1000 грн" },
      { name: "Вулканізація", price: "від 1200 грн" }
    ]
  },
  baseServices: {
    'Курс: Навчання': 5000,
    'Набір Lady Rescue Kit': 3500,
    'Балансування': 400,
    'Рихтування дисків': 600,
    'Виїзний шиномонтаж': 1500,
    'Пакування (фірмові пакети)': 100,
    'Утилізація шин': 100,
    'Корпоративне обслуговування (B2B)': 0,
    'Інше': 500
  }
};

export const getStorageCategory = (radius: string): StorageCategory => {
  if (["R13-14", "R15", "R16", "R15-16"].includes(radius)) return "R13-R16";
  if (["R17", "R18"].includes(radius)) return "R17-R18";
  return "R19-R23";
};

export const getAvailableRadii = (category: CarCategory, prices: SitePrices): Radius[] => {
  return Object.keys(prices.mounting[category] || {}) as Radius[];
};
