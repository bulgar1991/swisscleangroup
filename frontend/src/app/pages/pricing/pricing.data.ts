import { IconsId } from '@models/icons';

export type PriceUnit = 'window' | 'item' | 'hour' | 'meter' | 'appliance';

// Every price is a starting price ("from CHF 55"): the final price is confirmed in the quote.
export interface Price {
  // CHF incl. VAT.
  price: number;
  unit?: PriceUnit;
}

export interface PricePackage extends Price {
  // Translation key: <page key>.packages.<id> -> '.name', '.description', '.features' (list).
  id: string;
  highlighted?: boolean;
}

// Price at a glance: icon, price and title, on the service page and at the top of the pricing page.
export interface PriceTile extends Price {
  // Translation key: <page key>.tiles.<id> -> '.title', '.text'.
  id: string;
  // Font Awesome classes, e.g. 'icon-phone-solid-full'.
  icon: string;
}

export interface PriceItem extends Price {
  // Translation key: <page key>.items.<id> -> '.name' (+ '.note' when `note` is set).
  id: string;
  note?: boolean;
}

export interface PriceGroup {
  // Translation key: <page key>.groups.<id>.
  id: string;
  items: PriceItem[];
}

export interface PricingPage {
  // URL: /<lang>/prices/<id>.
  id: string;
  // The service it belongs to - used for the quote form link and the service page link.
  serviceId: string;
  image: string;
  // Translation key prefix -> '.title', '.subtitle', '.intro', '.packagesTitle', '.notes' (list).
  key: string;
  tiles: PriceTile[];
  // Optional detail below the tiles - leave empty when the tiles say it all.
  packages: PricePackage[];
  groups: PriceGroup[];
}

// Window cleaning: real prices. Furniture & kitchen: EXAMPLE PRICES - replace them with the
// real rates before going live.
// Texts live in assets/i18n/{fr,de,en}.json under "pricing".
export const PRICING_PAGES: PricingPage[] = [
  {
    id: 'window-cleaning',
    serviceId: 'window-cleaning',
    image: 'assets/images/services/window-cleaning.jpg',
    key: 'pricing.windowCleaning',
    // Real prices (2026-10-11). Shops and offices are billed by the hour.
    tiles: [
      { id: 'apartment', icon: 'building-solid-full', price: 75 },
      { id: 'house', icon: 'house-solid-full', price: 195 },
      { id: 'shop', icon: 'store-solid-full', price: 55, unit: 'hour' },
      { id: 'office', icon: 'briefcase-solid-full', price: 55, unit: 'hour' },
    ],
    packages: [],
    groups: [],
  },
  {
    id: 'furniture-kitchen-assembly',
    serviceId: 'furniture-assembly',
    image: 'assets/images/services/furniture-assembly.jpg',
    key: 'pricing.furnitureKitchen',
    tiles: [
      { id: 'furniture', icon: 'couch-solid-full', price: 50 },
      { id: 'bed', icon: 'bed-solid-full', price: 90 },
      { id: 'wardrobe', icon: 'door-closed-solid-full', price: 120 },
      { id: 'kitchen', icon: 'kitchen-set-solid-full', price: 150, unit: 'meter' },
      { id: 'appliance', icon: 'plug-solid-full', price: 80, unit: 'appliance' },
      { id: 'other', icon: 'screwdriver-wrench-solid-full', price: 25, unit: 'item' },
    ],
    packages: [
      { id: 'smallFurniture', price: 50 },
      { id: 'hourly', price: 65, unit: 'hour' },
      { id: 'kitchen', price: 150, unit: 'meter', highlighted: true },
    ],
    groups: [
      {
        id: 'furniture',
        items: [
          { id: 'shelf', price: 50 },
          { id: 'chest', price: 60 },
          { id: 'tvUnit', price: 70 },
          { id: 'bed', price: 90 },
          { id: 'wardrobe2', price: 120 },
          { id: 'wardrobe3', price: 180, note: true },
          { id: 'wallFixing', price: 25, unit: 'item', note: true },
          { id: 'disassembly', price: 40 },
        ],
      },
      {
        id: 'kitchen',
        items: [
          { id: 'kitchenAssembly', price: 150, unit: 'meter', note: true },
          { id: 'kitchenRemoval', price: 300 },
          { id: 'worktopCutout', price: 90, unit: 'item', note: true },
          { id: 'appliance', price: 80, unit: 'appliance', note: true },
        ],
      },
    ],
  },
];

export function findPricingPage(id: string | null): PricingPage | undefined {
  return PRICING_PAGES.find((page) => page.id === id);
}

// The lowest fixed price of a service (hourly rates left out), shown as "from CHF ..." on its card.
export function startingPrice(serviceId: string): number | undefined {
  const page = PRICING_PAGES.find((item) => item.serviceId === serviceId);
  const prices = page?.tiles.filter((tile) => !tile.unit).map((tile) => tile.price) ?? [];
  return prices.length ? Math.min(...prices) : undefined;
}
