import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { findServicePost } from '@components/services-slider/services-slider.items';
import { breadcrumbList, service as serviceSchema } from '@/config/structured-data';
import { SeoService } from '@services/seo.service';

// Like seoResolver, but the title and description come from the service itself.
// An unknown service id sends the visitor to the services list.
export const serviceSeoResolver: ResolveFn<void | RedirectCommand> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const service = findServicePost(route.paramMap.get('id'));
  if (!service) return new RedirectCommand(inject(Router).parseUrl('/services'));

  inject(SeoService).apply(
    {
      title: service.key + '.title',
      description: service.key + '.description',
      image: service.image,
      jsonLd: (translate, url) => [
        serviceSchema(translate, service, url),
        breadcrumbList(translate, [
          { nameKey: 'header.menu.home', path: '/' },
          { nameKey: 'header.menu.services', path: '/services' },
          { nameKey: service.key + '.title', path: service.link },
        ]),
      ],
    },
    state.url,
  );
  return undefined;
};
