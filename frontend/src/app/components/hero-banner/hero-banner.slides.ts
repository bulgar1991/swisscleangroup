export interface HeroSlide {
  image: string;
  // Translation key prefix, e.g. 'banner.slides.window' -> '.eyebrow', '.title', '.text', '.cta', '.imageAlt'.
  key: string;
  ctaLink: string;
}

// Dummy data: the images in assets/images/banner/ are placeholders - replace them with real photos.
// Texts live in assets/i18n/{fr,de,en}.json under "banner.slides".
export const HERO_SLIDES: HeroSlide[] = [
  {
    image: 'assets/images/banner/window-cleaning.jpg',
    key: 'banner.slides.window',
    ctaLink: '/request/window-cleaning',
  },
  {
    image: 'assets/images/banner/furniture-assembly.jpg',
    key: 'banner.slides.furniture',
    ctaLink: '/request/furniture-assembly',
  },
  {
    image: 'assets/images/banner/team.jpg',
    key: 'banner.slides.team',
    ctaLink: '/services',
  },
];
