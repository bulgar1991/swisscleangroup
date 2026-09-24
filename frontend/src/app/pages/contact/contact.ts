import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactButtonsComponent } from '@components/contact-buttons/contact-buttons.component';
import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { ContactFormComponent } from '@components/contact-form/contact-form.component';
import { IconsId } from '@models/icons';
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/config/contact';

interface ContactCard {
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
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  cards: ContactCard[] = [
    {
      icon: 'phone',
      titleKey: 'pages.contact.phone',
      lines: [CONTACT_PHONE],
      href: 'tel:' + CONTACT_PHONE.replace(/\s/g, ''),
    },
    {
      icon: 'whatsapp',
      titleKey: 'pages.contact.whatsapp',
      lines: [CONTACT_PHONE],
      href: 'https://wa.me/' + CONTACT_PHONE.replace(/\D/g, ''),
      external: true,
    },
    {
      icon: 'email',
      titleKey: 'pages.contact.email',
      lines: [CONTACT_EMAIL],
      href: 'mailto:' + CONTACT_EMAIL,
    },
  ];
}
