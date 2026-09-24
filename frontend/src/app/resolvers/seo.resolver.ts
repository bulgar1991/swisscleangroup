import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { SeoService } from '@services/seo.service';
import { SeoData } from '@models/seo.model';

// Applies the route's `data.seo`. Translations are already loaded at this point (see the app
// initializer in app.config.ts), and SeoService re-applies the tags when the language changes.
export const seoResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): void => {
  const seo = route.data['seo'] as SeoData | undefined;
  // state.url is the page being opened - router.url would still be the previous page here.
  if (seo) inject(SeoService).apply(seo, state.url);
};
