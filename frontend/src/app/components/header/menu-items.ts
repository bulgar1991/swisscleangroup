import { IsActiveMatchOptions } from '@angular/router';

export interface MenuItem {
  // Stable name, used in data-testid attributes.
  id: string;
  labelKey: string;
  link: string;
}

// Shared by the desktop header, the mobile header and the footer. Pages are set up in app.routes.ts.
export const MENU_ITEMS: MenuItem[] = [
  { id: 'home', labelKey: 'header.menu.home', link: '/' },
  { id: 'services', labelKey: 'header.menu.services', link: '/services' },
  { id: 'about', labelKey: 'header.menu.about', link: '/about' },
  { id: 'contact', labelKey: 'header.menu.contact', link: '/contact' },
];

// Exact path match, so "Home" ("/") isn't active on every page.
export const MENU_ACTIVE_OPTIONS: IsActiveMatchOptions = {
  paths: 'exact',
  queryParams: 'ignored',
  matrixParams: 'ignored',
  fragment: 'ignored',
};
