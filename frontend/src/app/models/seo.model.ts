export interface SeoMetaTag {
  name?: string;
  property?: string;
  // Translation key, or plain text.
  content: string;
}

// Set on a route as `data: { seo: {...} }`. Title and description are translation keys.
export interface SeoData {
  title: string;
  description: string;
  metaTags?: SeoMetaTag[];
}
