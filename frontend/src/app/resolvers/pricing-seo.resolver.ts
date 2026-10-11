import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { findPricingPage } from '@/pages/pricing/pricing.data';
import { breadcrumbList, offerCatalog } from '@/config/structured-data';
import { localizePath, toLanguageCode } from '@services/language.service';
import { SeoService } from '@services/seo.service';

// Like seoResolver, but the texts come from the pricing page itself.
// An unknown id sends the visitor to the services list.
export const pricingSeoResolver: ResolveFn<void | RedirectCommand> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const page = findPricingPage(route.paramMap.get('id'));
  const code = toLanguageCode(route.paramMap.get('lang'));
  if (!page) return new RedirectCommand(inject(Router).parseUrl(localizePath('/services', code)));

  inject(SeoService).apply(
    {
      title: page.key + '.seoTitle',
      description: page.key + '.seoDescription',
      image: page.image,
      jsonLd: (translate, url) => [
        offerCatalog(translate, page, url),
        breadcrumbList(
          translate,
          [
            { nameKey: 'header.menu.home', path: '/' },
            { nameKey: 'header.menu.services', path: '/services' },
            { nameKey: page.key + '.title', path: '/prices/' + page.id },
          ],
          code,
        ),
      ],
    },
    state.url,
  );
  return undefined;
};
