export type NewsCategory = 'tips' | 'news';

export interface NewsPost {
  id: string;
  image: string;
  // ISO date, formatted per language in the template.
  date: string;
  category: NewsCategory;
  // Translation key prefix -> '.title', '.excerpt', '.imageAlt'.
  key: string;
  link: string;
}

// Dummy posts - there is no blog page yet, so every link goes to the home page.
// Texts live in assets/i18n/{fr,de,en}.json under "news.posts".
export const NEWS_POSTS: NewsPost[] = [
  {
    id: 'streak-free-windows',
    image: 'assets/images/news/streak-free-windows.jpg',
    date: '2026-09-15',
    category: 'tips',
    key: 'news.posts.streakFree',
    link: '/',
  },
  {
    id: 'prepare-assembly',
    image: 'assets/images/news/prepare-assembly.jpg',
    date: '2026-08-28',
    category: 'tips',
    key: 'news.posts.prepareAssembly',
    link: '/',
  },
  {
    id: 'spring-cleaning',
    image: 'assets/images/news/spring-cleaning.jpg',
    date: '2026-08-10',
    category: 'news',
    key: 'news.posts.bookEarly',
    link: '/',
  },
];
