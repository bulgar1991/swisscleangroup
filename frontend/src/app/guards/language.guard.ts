import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, RedirectFunction, Route, UrlSegment } from '@angular/router';
import { map } from 'rxjs';
import { LanguageService, isLanguageCode, localizePath } from '@services/language.service';

// Only /fr, /de and /en match the language route - anything else falls through to the
// redirect below.
export const languageMatchGuard: CanMatchFn = (_route: Route, segments: UrlSegment[]) =>
  isLanguageCode(segments[0]?.path);

// Loads the URL's language before the page's SEO resolvers run, so titles are translated.
export const languageGuard: CanActivateFn = (route) => {
  const language = inject(LanguageService);
  const lang = route.paramMap.get('lang');
  if (!isLanguageCode(lang)) return false;
  if (lang === language.current()) return true;
  return language.use(lang).pipe(map(() => true));
};

// '/' and old links without a language ('/contact') -> '/<preferred language>/contact'.
// On the live server .htaccess does this with a 301 before Angular even loads.
export const redirectToPreferredLanguage: RedirectFunction = ({ url }) =>
  localizePath(
    '/' + url.map((segment) => segment.path).join('/'),
    inject(LanguageService).preferred(),
  );
