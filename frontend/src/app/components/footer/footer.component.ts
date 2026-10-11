import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactButtonsComponent } from '@components/contact-buttons/contact-buttons.component';
import { MENU_ITEMS } from '@components/header/menu-items';
import { SERVICE_POSTS } from '@components/services-slider/services-slider.items';
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/config/contact';
import { LocalizePipe } from '@pipes/localize.pipe';
import { PRICING_PAGES } from '@/pages/pricing/pricing.data';

@Component({
  imports: [RouterLink, LocalizePipe, TranslatePipe, ContactButtonsComponent],
  selector: 'app-footer',
  styleUrl: './footer.component.scss',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  siteLogo: string = 'assets/images/header/site-logo-desktop.png';
  developerLogo: string = 'assets/images/footer/cbl.svg';
  year = new Date().getFullYear();

  menuItems = MENU_ITEMS;
  services = SERVICE_POSTS;
  pricingPages = PRICING_PAGES;

  phone = CONTACT_PHONE;
  phoneHref = 'tel:' + CONTACT_PHONE.replace(/\s/g, '');
  email = CONTACT_EMAIL;

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
