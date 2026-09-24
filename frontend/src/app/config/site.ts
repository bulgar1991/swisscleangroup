// Public address of the website, without a trailing slash. Used for canonical links,
// Open Graph URLs and images. Also update it in src/index.html, robots.txt and sitemap.xml.
export const SITE_URL = 'https://www.swisscleangroup.ch';

export const SITE_NAME = 'Swiss Clean Group';

// Shared image for Facebook / WhatsApp / LinkedIn / X link previews (1200×630).
export const SITE_OG_IMAGE = `${SITE_URL}/assets/images/seo/og-image.jpg`;

// Open Graph locale per site language.
export const OG_LOCALES: Record<string, string> = {
  fr: 'fr_CH',
  de: 'de_CH',
  en: 'en_GB',
};
