import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { OG_LOCALES, SITE_OG_IMAGE, SITE_URL } from '@/config/site';
import { SeoData } from '@models/seo.model';

/**
 * Sets the page title, description, canonical link, Open Graph and Twitter tags for the
 * current route (from its `data.seo`), and sets them again when the language changes.
 * The tags in src/index.html are the fallback before this runs.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);

  private current?: { seo: SeoData; path: string };

  constructor() {
    this.translate.onLangChange.subscribe(() => {
      if (this.current) this.apply(this.current.seo, this.current.path);
    });
  }

  // `path` is the page's URL path, e.g. '/services'.
  apply(seo: SeoData, path: string): void {
    this.current = { seo, path };

    const lang = this.translate.getCurrentLang() ?? 'fr';
    const title = this.translate.instant(seo.title);
    const description = this.translate.instant(seo.description);
    // Path only - query strings and #fragments aren't separate pages.
    const cleanPath = path.split(/[?#]/)[0] || '/';
    const url = SITE_URL + cleanPath;
    const image = seo.image ? `${SITE_URL}/${seo.image}` : SITE_OG_IMAGE;

    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({ property: 'og:type', content: seo.type ?? 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALES[lang] ?? OG_LOCALES['fr'] });
    this.meta.updateTag({ property: 'og:image', content: image });

    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
    this.setJsonLd(seo.jsonLd?.((key) => this.translate.instant(key), url, lang) ?? []);

    // Extra per-route tags (e.g. robots: noindex) - these win over the defaults above.
    for (const tag of seo.metaTags ?? []) {
      const content = this.translate.instant(tag.content);
      if (tag.name) this.meta.updateTag({ name: tag.name, content });
      if (tag.property) this.meta.updateTag({ property: tag.property, content });
    }
  }

  // Page-specific structured data. The site-wide LocalBusiness block stays in src/index.html.
  private setJsonLd(items: object[]): void {
    const id = 'page-jsonld';
    this.document.getElementById(id)?.remove();
    if (!items.length) return;

    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(items.length === 1 ? items[0] : items);
    this.document.head.appendChild(script);
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
