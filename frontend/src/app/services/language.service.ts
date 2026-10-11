import { DOCUMENT, PlatformLocation } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export type LanguageCode = 'fr' | 'de' | 'en';

export interface Language {
  code: LanguageCode;
  label: string;
  name: string;
  flag: string;
}

// Order matters: this is the order shown in the language switcher.
export const LANGUAGES: Language[] = [
  { code: 'fr', label: 'FR', name: 'Français', flag: 'assets/images/flags/fr.svg' },
  { code: 'de', label: 'DE', name: 'Deutsch', flag: 'assets/images/flags/de.svg' },
  { code: 'en', label: 'EN', name: 'English', flag: 'assets/images/flags/gb.svg' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'fr';

const STORAGE_KEY = 'scg-lang';

export function isLanguageCode(value: string | null | undefined): value is LanguageCode {
  return LANGUAGES.some((lang) => lang.code === value);
}

// A route's :lang param as a language code (French if it's missing or unknown).
export function toLanguageCode(value: string | null | undefined): LanguageCode {
  return isLanguageCode(value) ? value : DEFAULT_LANGUAGE;
}

/**
 * Adds the language to a site path: localizePath('/services', 'de') -> '/de/services',
 * localizePath('/', 'de') -> '/de'.
 */
export function localizePath(path: string, lang: LanguageCode): string {
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

/**
 * Swaps the language in a localized URL: '/fr/blog/x?a=1' -> '/de/blog/x?a=1'.
 * A URL without a language gets one added.
 */
export function switchLanguagePath(url: string, lang: LanguageCode): string {
  const [, first, rest = ''] = url.match(/^\/([^/?#]*)(.*)$/) ?? [];
  if (isLanguageCode(first)) return `/${lang}${rest}`;
  return localizePath(url || '/', lang);
}

/**
 * The language lives in the URL (/fr/..., /de/..., /en/...), so every language version is its
 * own page for search engines. languageGuard sets it on every navigation; the last choice is
 * remembered to pick the language when someone opens the bare domain.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);
  private location = inject(PlatformLocation);

  readonly languages = LANGUAGES;
  readonly current = this.translate.currentLang;

  // Called once on app start, before the first render. Loads the URL's language straight away,
  // so the prerendered HTML is hydrated in the same language it was rendered in.
  init(): Observable<unknown> {
    const fromUrl = this.location.pathname.split('/')[1];
    return this.use(isLanguageCode(fromUrl) ? fromUrl : this.preferred());
  }

  use(code: LanguageCode): Observable<unknown> {
    this.document.documentElement.lang = code;
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Storage can be blocked (private mode), or missing while prerendering.
    }
    return this.translate.use(code);
  }

  // The language for a URL without one: the last choice, then the browser's language.
  preferred(): LanguageCode {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLanguageCode(saved)) return saved;
    } catch {
      // Fall through to the browser language.
    }
    const browser = this.document.defaultView?.navigator?.language?.slice(0, 2);
    return isLanguageCode(browser) ? browser : DEFAULT_LANGUAGE;
  }

  // Current language, for building links.
  code(): LanguageCode {
    return toLanguageCode(this.current());
  }
}
