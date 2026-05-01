export type Season = 'Літо' | 'Зима' | 'Всесезонні';

export interface TireProduct {
  id: string;
  brand: string;
  model: string;
  width: string;
  profile: string;
  diameter: string;
  season: Season;
  price: number;
  inStock: boolean;
  stickers?: string[]; // e.g. "Хіт", "Знижка"
}

export const DUMMY_TIRES: TireProduct[] = [
  { id: 't1', brand: 'Michelin', model: 'Pilot Sport 4', width: '225', profile: '45', diameter: 'R17', season: 'Літо', price: 4200, inStock: true, stickers: ['Хіт продажів'] },
  { id: 't2', brand: 'Michelin', model: 'X-Ice Snow', width: '205', profile: '55', diameter: 'R16', season: 'Зима', price: 3800, inStock: true },
  { id: 't3', brand: 'Continental', model: 'PremiumContact 6', width: '225', profile: '50', diameter: 'R17', season: 'Літо', price: 3950, inStock: true },
  { id: 't4', brand: 'Continental', model: 'WinterContact TS 870', width: '195', profile: '65', diameter: 'R15', season: 'Зима', price: 3100, inStock: false },
  { id: 't5', brand: 'Goodyear', model: 'Eagle F1 Asymmetric 5', width: '245', profile: '40', diameter: 'R18', season: 'Літо', price: 4500, inStock: true, stickers: ['Хіт продажів'] },
  { id: 't6', brand: 'Goodyear', model: 'UltraGrip Ice 2', width: '215', profile: '60', diameter: 'R16', season: 'Зима', price: 3400, inStock: true },
  { id: 't7', brand: 'Pirelli', model: 'P Zero', width: '255', profile: '35', diameter: 'R19', season: 'Літо', price: 5800, inStock: true, stickers: ['Преміум'] },
  { id: 't8', brand: 'Pirelli', model: 'Ice Zero FR', width: '225', profile: '55', diameter: 'R17', season: 'Зима', price: 4100, inStock: true },
  { id: 't9', brand: 'Bridgestone', model: 'Turanza T005', width: '205', profile: '55', diameter: 'R16', season: 'Літо', price: 3250, inStock: true },
  { id: 't10', brand: 'Bridgestone', model: 'Blizzak VRX', width: '185', profile: '65', diameter: 'R15', season: 'Зима', price: 2800, inStock: true, stickers: ['Доступна ціна'] },
  { id: 't11', brand: 'Hankook', model: 'Ventus Prime 3', width: '215', profile: '55', diameter: 'R17', season: 'Літо', price: 2900, inStock: true },
  { id: 't12', brand: 'Hankook', model: 'Winter i*cept RS2', width: '195', profile: '65', diameter: 'R15', season: 'Зима', price: 2400, inStock: true },
  { id: 't13', brand: 'Nokian', model: 'Hakka Green 3', width: '205', profile: '55', diameter: 'R16', season: 'Літо', price: 3150, inStock: false },
  { id: 't14', brand: 'Nokian', model: 'Hakkapeliitta R3', width: '225', profile: '45', diameter: 'R17', season: 'Зима', price: 4300, inStock: true },
  { id: 't15', brand: 'Toyo', model: 'Proxes TR1', width: '235', profile: '40', diameter: 'R18', season: 'Літо', price: 4600, inStock: true },
  { id: 't16', brand: 'Yokohama', model: 'BlueEarth GT', width: '215', profile: '60', diameter: 'R16', season: 'Літо', price: 2750, inStock: true },
  { id: 't17', brand: 'Kumho', model: 'Ecsta HS51', width: '205', profile: '50', diameter: 'R17', season: 'Літо', price: 2500, inStock: true, stickers: ['Економ'] },
  { id: 't18', brand: 'Kumho', model: 'WinterCraft WP71', width: '225', profile: '55', diameter: 'R17', season: 'Зима', price: 3000, inStock: true },
  { id: 't19', brand: 'Michelin', model: 'CrossClimate 2', width: '215', profile: '55', diameter: 'R16', season: 'Всесезонні', price: 4100, inStock: true, stickers: ['Універсальні'] },
  { id: 't20', brand: 'Goodyear', model: 'Vector 4Seasons', width: '225', profile: '45', diameter: 'R17', season: 'Всесезонні', price: 4350, inStock: true },
];
