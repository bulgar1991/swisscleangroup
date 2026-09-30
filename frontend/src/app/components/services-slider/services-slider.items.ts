export interface ServicePost {
  id: string;
  image: string;
  // Translation key prefix, e.g. 'servicesSlider.items.windowCleaning' -> '.title', '.imageAlt',
  // '.description', '.content' (list of paragraphs), '.features' (list).
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
    link: '/services/window-cleaning',
  },
  {
    id: 'furniture-assembly',
    image: 'assets/images/services/furniture-assembly.jpg',
    key: 'servicesSlider.items.furnitureAssembly',
    link: '/services/furniture-assembly',
  },
];

export function findServicePost(id: string | null): ServicePost | undefined {
  return SERVICE_POSTS.find((service) => service.id === id);
}
