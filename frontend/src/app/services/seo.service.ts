import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { OG_LOCALES, SITE_NAME, SITE_OG_IMAGE, SITE_URL } from '@/config/site';
import { SeoData } from '@models/seo.model';
import { DEFAULT_LANGUAGE, LANGUAGES, switchLanguagePath } from '@services/language.service';

/**
 * Sets the page title, description, canonical link, Open Graph and Twitter tags for the
 * current route (from its `data.seo`), plus hreflang links to the same page in the other
 * languages. The tags in src/index.html are the fallback before this runs.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);

  // `path` is the page's URL path, e.g. '/fr/services'. Runs again on every language switch,
  // since the language is part of the URL.
  apply(seo: SeoData, path: string): void {
    const lang = this.translate.getCurrentLang() ?? 'fr';
    const pageTitle: string = this.translate.instant(seo.title);
    // Service and blog titles come from the page heading - add the brand like the other pages.
    const title = pageTitle.includes(SITE_NAME) ? pageTitle : `${pageTitle} | ${SITE_NAME}`;
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
    this.setAlternates(cleanPath);
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

  // <link rel="alternate" hreflang="de" href=".../de/services"> for every language, plus
  // x-default (French) for visitors whose language isn't offered.
  private setAlternates(path: string): void {
    this.document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((link) => link.remove());
    const links = [
      ...LANGUAGES.map((lang) => ({ hreflang: lang.code, code: lang.code })),
      { hreflang: 'x-default', code: DEFAULT_LANGUAGE },
    ];
    for (const { hreflang, code } of links) {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', SITE_URL + switchLanguagePath(path, code));
      this.document.head.appendChild(link);
    }
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
