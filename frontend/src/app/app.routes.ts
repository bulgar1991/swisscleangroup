import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Request } from './pages/request/request';

const mainLayoutRoutes: Routes = [
  { path: '', component: Home },
  { path: 'request/:serviceId', component: Request },
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
