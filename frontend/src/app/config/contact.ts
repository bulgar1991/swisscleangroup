import { IconsId } from '@models/icons';

// Contact details used across the site (header, footer, contact page, forms).
export const CONTACT_PHONE = '+41 78 323 10 39';
export const CONTACT_EMAIL = 'swisscleangroup@hotmail.com';

export interface ContactLink {
  id: string;
  icon: IconsId;
  href: string;
  labelKey: string;
  external: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'phone',
    icon: 'phone-solid-full',
    href: 'tel:' + CONTACT_PHONE.replace(/\s/g, ''),
    labelKey: 'header.contacts.phone',
    external: false,
  },
  {
    id: 'whatsapp',
    icon: 'whatsapp-brands-solid-full',
    href: 'https://wa.me/' + CONTACT_PHONE.replace(/\D/g, ''),
    labelKey: 'header.contacts.whatsapp',
    external: true,
  },
  {
    id: 'facebook',
    icon: 'facebook-f-brands-solid-full',
    href: 'https://www.facebook.com/',
    labelKey: 'header.contacts.facebook',
    external: true,
  },
  {
    id: 'instagram',
    icon: 'instagram-brands-solid-full',
    href: 'https://www.instagram.com/',
    labelKey: 'header.contacts.instagram',
    external: true,
  },
];
