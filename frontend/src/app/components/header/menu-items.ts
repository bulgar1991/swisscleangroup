import { IsActiveMatchOptions } from '@angular/router';

export interface MenuItem {
  labelKey: string;
  link: string;
}

// Shared by the desktop header, the mobile header and the footer. Pages are set up in app.routes.ts.
export const MENU_ITEMS: MenuItem[] = [
  { labelKey: 'header.menu.home', link: '/' },
  { labelKey: 'header.menu.services', link: '/services' },
  { labelKey: 'header.menu.about', link: '/about' },
  { labelKey: 'header.menu.contact', link: '/contact' },
];

// Exact path match, so "Home" ("/") isn't active on every page.
export const MENU_ACTIVE_OPTIONS: IsActiveMatchOptions = {
  paths: 'exact',
  queryParams: 'ignored',
  matrixParams: 'ignored',
  fragment: 'ignored',
};
