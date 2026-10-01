import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactButtonsComponent } from '@components/contact-buttons/contact-buttons.component';
import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { ContactFormComponent } from '@components/contact-form/contact-form.component';
import { IconsId } from '@models/icons';
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/config/contact';

interface ContactCard {
  // Stable name, used in data-testid attributes.
  id: string;
  icon: IconsId;
  // Translation key for the card title.
  titleKey: string;
  lines: string[];
  href?: string;
  external?: boolean;
}

@Component({
  selector: 'app-contact',
  imports: [NgTemplateOutlet, TranslatePipe, PageHeaderComponent, ContactButtonsComponent, ContactFormComponent],
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact {
  cards: ContactCard[] = [
    {
      id: 'phone',
      icon: 'phone-solid-full',
      titleKey: 'pages.contact.phone',
      lines: [CONTACT_PHONE],
      href: 'tel:' + CONTACT_PHONE.replace(/\s/g, ''),
    },
    {
      id: 'whatsapp',
      icon: 'whatsapp-brands-solid-full',
      titleKey: 'pages.contact.whatsapp',
      lines: [CONTACT_PHONE],
      href: 'https://wa.me/' + CONTACT_PHONE.replace(/\D/g, ''),
      external: true,
    },
    {
      id: 'email',
      icon: 'envelope-solid-full',
      titleKey: 'pages.contact.email',
      lines: [CONTACT_EMAIL],
      href: 'mailto:' + CONTACT_EMAIL,
    },
  ];
}
