import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactButtonsComponent } from '@components/contact-buttons/contact-buttons.component';
import { MENU_ITEMS } from '@components/header/menu-items';
import { SERVICE_POSTS } from '@components/services-slider/services-slider.items';
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/config/contact';

@Component({
  imports: [RouterLink, TranslatePipe, ContactButtonsComponent],
  selector: 'app-footer',
  styleUrl: './footer.component.scss',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  siteLogo: string = 'assets/images/header/site-logo-desktop.png';
  year = new Date().getFullYear();

  menuItems = MENU_ITEMS;
  services = SERVICE_POSTS;

  phone = CONTACT_PHONE;
  phoneHref = 'tel:' + CONTACT_PHONE.replace(/\s/g, '');
  email = CONTACT_EMAIL;

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
