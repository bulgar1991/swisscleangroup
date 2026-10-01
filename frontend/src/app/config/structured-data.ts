import { SITE_NAME, SITE_URL } from '@/config/site';
import { Translate } from '@models/seo.model';

// schema.org builders for SeoData.jsonLd. Names are translation keys unless noted.

export interface BreadcrumbStep {
  nameKey: string;
  // Site path, e.g. '/blog'.
  path: string;
}

export function breadcrumbList(translate: Translate, steps: BreadcrumbStep[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: steps.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: translate(step.nameKey),
      item: SITE_URL + step.path,
    })),
  };
}

const publisher = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/assets/icons/app/icon-512.png`,
};

export function blogPosting(
  translate: Translate,
  post: { key: string; image: string; date: string },
  url: string,
  lang: string,
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: translate(post.key + '.title'),
    description: translate(post.key + '.excerpt'),
    image: `${SITE_URL}/${post.image}`,
    datePublished: post.date,
    inLanguage: lang,
    mainEntityOfPage: url,
    author: publisher,
    publisher,
  };
}

export function service(
  translate: Translate,
  item: { key: string; image: string },
  url: string,
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: translate(item.key + '.title'),
    description: translate(item.key + '.description'),
    image: `${SITE_URL}/${item.image}`,
    url,
    areaServed: { '@type': 'Country', name: 'Switzerland' },
    provider: { '@type': 'LocalBusiness', name: SITE_NAME, url: `${SITE_URL}/` },
  };
}
