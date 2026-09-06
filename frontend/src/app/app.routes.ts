import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Request } from './pages/request/request';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'request/:serviceId', component: Request },
  { path: '**', redirectTo: '' },
];
