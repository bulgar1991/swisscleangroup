import { IconsId } from '@models/icons';

export type PriceUnit = 'hour';

// Every price is a starting price ("from CHF 55"): the final price is confirmed in the quote.
export interface Price {
  // CHF incl. VAT.
  price: number;
  unit?: PriceUnit;
}

// Price at a glance: icon, price and title, on the service page and at the top of the pricing page.
export interface PriceTile extends Price {
  // Translation key: <page key>.tiles.<id> -> '.title', '.text'.
  id: string;
  icon: IconsId;
}

export interface PricingPage {
  // URL: /<lang>/prices/<id>.
  id: string;
  // The service it belongs to - used for the quote form link and the service page link.
  serviceId: string;
  // Share image and structured data. The header photo is the service's headerImage.
  image: string;
  // Translation key prefix -> '.title', '.subtitle', '.intro', '.notes' (list), '.tilesNote'.
  key: string;
  // The first tile is the service's headline price (see startingPrice).
  tiles: PriceTile[];
}

// Real prices (2026-10-11). Texts live in assets/i18n/{fr,de,en}.json under "pricing".
export const PRICING_PAGES: PricingPage[] = [
  {
    id: 'window-cleaning',
    serviceId: 'window-cleaning',
    image: 'assets/images/banner/services/clean-window-service.jpg',
    key: 'pricing.windowCleaning',
    // Shops and offices are billed by the hour.
    tiles: [
      { id: 'apartment', icon: 'building-solid-full', price: 75 },
      { id: 'house', icon: 'house-solid-full', price: 195 },
      { id: 'shop', icon: 'store-solid-full', price: 55, unit: 'hour' },
      { id: 'office', icon: 'briefcase-solid-full', price: 55, unit: 'hour' },
    ],
  },
  {
    id: 'furniture-kitchen-assembly',
    serviceId: 'furniture-assembly',
    image: 'assets/images/banner/services/montage_demontage.jpg',
    key: 'pricing.furnitureKitchen',
    tiles: [
      { id: 'furnitureAssembly', icon: 'couch-solid-full', price: 60 },
      { id: 'furnitureDisassembly', icon: 'screwdriver-wrench-solid-full', price: 50 },
      { id: 'kitchenAssembly', icon: 'kitchen-set-solid-full', price: 500 },
      { id: 'kitchenDisassembly', icon: 'hammer', price: 300 },
    ],
  },
];

export function findPricingPage(id: string | null): PricingPage | undefined {
  return PRICING_PAGES.find((page) => page.id === id);
}

// The headline price of a service (its first tile), shown as "from CHF ..." on its card.
export function startingPrice(serviceId: string): number | undefined {
  return PRICING_PAGES.find((page) => page.serviceId === serviceId)?.tiles[0]?.price;
}
