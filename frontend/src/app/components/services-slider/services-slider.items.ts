export interface ServicePost {
  id: string;
  image: string;
  // Translation key prefix, e.g. 'servicesSlider.items.windowCleaning' -> '.title', '.imageAlt'.
  key: string;
  link: string;
}

// Dummy data: the images in assets/images/services/ are placeholders - replace them with real photos.
// Texts live in assets/i18n/{fr,de,en}.json under "servicesSlider.items".
export const SERVICE_POSTS: ServicePost[] = [
  {
    id: 'window-cleaning',
    image: 'assets/images/services/window-cleaning.jpg',
    key: 'servicesSlider.items.windowCleaning',
    link: '/request/window-cleaning',
  },
  {
    id: 'furniture-assembly',
    image: 'assets/images/services/furniture-assembly.jpg',
    key: 'servicesSlider.items.furnitureAssembly',
    link: '/request/furniture-assembly',
  },
  {
    id: 'facade-cleaning',
    image: 'assets/images/services/facade-cleaning.jpg',
    key: 'servicesSlider.items.facadeCleaning',
    link: '/request/window-cleaning',
  },
  {
    id: 'kitchen-assembly',
    image: 'assets/images/services/kitchen-assembly.jpg',
    key: 'servicesSlider.items.kitchenAssembly',
    link: '/request/furniture-assembly',
  },
  {
    id: 'office-windows',
    image: 'assets/images/services/office-windows.jpg',
    key: 'servicesSlider.items.officeWindows',
    link: '/request/window-cleaning',
  },
  {
    id: 'wardrobe-assembly',
    image: 'assets/images/services/wardrobe-assembly.jpg',
    key: 'servicesSlider.items.wardrobeAssembly',
    link: '/request/furniture-assembly',
  },
];
