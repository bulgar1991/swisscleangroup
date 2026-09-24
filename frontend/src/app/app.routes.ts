import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Request } from './pages/request/request';
import { seoResolver } from './resolvers/seo.resolver';

// `data.seo` holds translation keys (under "seo" in assets/i18n/*.json); seoResolver turns them
// into the page title, description, canonical link and social-media tags.
const mainLayoutRoutes: Routes = [
  {
    path: '',
    component: Home,
    resolve: { seo: seoResolver },
    data: { seo: { title: 'seo.home.title', description: 'seo.home.description' } },
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then((m) => m.Services),
    resolve: { seo: seoResolver },
    data: { seo: { title: 'seo.services.title', description: 'seo.services.description' } },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    resolve: { seo: seoResolver },
    data: { seo: { title: 'seo.about.title', description: 'seo.about.description' } },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    resolve: { seo: seoResolver },
    data: { seo: { title: 'seo.contact.title', description: 'seo.contact.description' } },
  },
  {
    path: 'request/:serviceId',
    component: Request,
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.request.title',
        description: 'seo.request.description',
        // A form page for each service - no value in search results.
        metaTags: [{ name: 'robots', content: 'noindex, follow' }],
      },
    },
  },
  { path: '**', redirectTo: '' },
];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@components/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: mainLayoutRoutes,
  },
];
