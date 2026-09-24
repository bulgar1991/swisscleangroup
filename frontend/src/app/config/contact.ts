import { IconsId } from '@models/icons';

// Dummy contact data - replace with the real details. Used by the header and the footer.
export const CONTACT_PHONE = '+41 00 000 00 00';
export const CONTACT_EMAIL = 'info@swisscleangroup.ch';

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
    icon: 'phone',
    href: 'tel:' + CONTACT_PHONE.replace(/\s/g, ''),
    labelKey: 'header.contacts.phone',
    external: false,
  },
  {
    id: 'whatsapp',
    icon: 'whatsapp',
    href: 'https://wa.me/' + CONTACT_PHONE.replace(/\D/g, ''),
    labelKey: 'header.contacts.whatsapp',
    external: true,
  },
  {
    id: 'facebook',
    icon: 'facebook',
    href: 'https://www.facebook.com/',
    labelKey: 'header.contacts.facebook',
    external: true,
  },
  {
    id: 'instagram',
    icon: 'instagram',
    href: 'https://www.instagram.com/',
    labelKey: 'header.contacts.instagram',
    external: true,
  },
];
