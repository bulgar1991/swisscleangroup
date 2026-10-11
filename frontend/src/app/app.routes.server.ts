import { RenderMode, ServerRoute } from '@angular/ssr';
import { NEWS_POSTS } from '@components/news-section/news-section.posts';
import { SERVICE_POSTS } from '@components/services-slider/services-slider.items';
import { PRICING_PAGES } from '@/pages/pricing/pricing.data';
import { LANGUAGES } from '@services/language.service';

const languages = async () => LANGUAGES.map((lang) => ({ lang: lang.code }));

// Pages without other params, prerendered once per language.
const prerendered = (path: string): ServerRoute => ({
  path,
  renderMode: RenderMode.Prerender,
  getPrerenderParams: languages,
});

// Every public page is prerendered to its own index.html at build time, in every language
// (/fr/contact, /de/contact, /en/contact), so search engines and AI crawlers get the full text
// without running JavaScript. Add new pages here and in sitemap.xml.
export const serverRoutes: ServerRoute[] = [
  prerendered(':lang'),
  prerendered(':lang/services'),
  prerendered(':lang/about'),
  prerendered(':lang/contact'),
  prerendered(':lang/blog'),
  {
    path: ':lang/services/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      LANGUAGES.flatMap((lang) => SERVICE_POSTS.map((item) => ({ lang: lang.code, id: item.id }))),
  },
  {
    path: ':lang/prices/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      LANGUAGES.flatMap((lang) => PRICING_PAGES.map((page) => ({ lang: lang.code, id: page.id }))),
  },
  {
    path: ':lang/blog/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      LANGUAGES.flatMap((lang) => NEWS_POSTS.map((post) => ({ lang: lang.code, id: post.id }))),
  },
  // Form pages are noindex anyway; '/' and old URLs without a language redirect in the browser
  // (and with a 301 in .htaccess). Both load from index.csr.html.
  { path: '**', renderMode: RenderMode.Client },
];
