import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Request } from './pages/request/request';
import { blogPostSeoResolver } from './resolvers/blog-post-seo.resolver';
import { seoResolver } from './resolvers/seo.resolver';
import { serviceSeoResolver } from './resolvers/service-seo.resolver';

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
    path: 'services/:id',
    loadComponent: () =>
      import('./pages/service-detail/service-detail').then((m) => m.ServiceDetail),
    resolve: { seo: serviceSeoResolver },
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
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog').then((m) => m.Blog),
    resolve: { seo: seoResolver },
    data: { seo: { title: 'seo.blog.title', description: 'seo.blog.description' } },
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('./pages/blog-post/blog-post').then((m) => m.BlogPost),
    resolve: { seo: blogPostSeoResolver },
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
