export type NewsCategory = 'tips' | 'news';

export interface NewsPost {
  id: string;
  image: string;
  // ISO date, formatted per language in the template.
  date: string;
  category: NewsCategory;
  // Translation key prefix -> '.title', '.excerpt', '.imageAlt', '.content' (list of paragraphs).
  key: string;
}

// Each post opens at /blog/<id>. Texts live in assets/i18n/{fr,de,en}.json under "news.posts".
export const NEWS_POSTS: NewsPost[] = [
  {
    id: 'streak-free-windows',
    image: 'assets/images/news/5-tips.jpg',
    date: '2026-09-15',
    category: 'tips',
    key: 'news.posts.streakFree',
  },
  {
    id: 'prepare-assembly',
    image: 'assets/images/news/furniture-assembly.jpg',
    date: '2026-08-28',
    category: 'tips',
    key: 'news.posts.prepareAssembly',
  },
  {
    id: 'autumn-window-cleaning',
    image: 'assets/images/news/autumn-cleaning.jpg',
    date: '2026-08-10',
    category: 'news',
    key: 'news.posts.bookEarly',
  },
];

export function findNewsPost(id: string | null): NewsPost | undefined {
  return NEWS_POSTS.find((post) => post.id === id);
}
