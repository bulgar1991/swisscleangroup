/**
 * How the quote request looks in the email you receive (sent by Web3FormsService).
 * The labels are in French (the business language) whatever language the visitor used.
 */
export const QUOTE_EMAIL_LABELS = {
  name: 'Nom',
  email: 'E-mail',
  phone: 'Téléphone',
  service: 'Service demandé',
  address: 'Adresse / Localité',
  date: 'Date souhaitée',
  message: 'Message',
} as const;

// Service names as they appear in the email.
export const QUOTE_EMAIL_SERVICE_NAMES: Record<string, string> = {
  'window-cleaning': 'Nettoyage de vitres',
  'furniture-assembly': 'Montage de meubles',
  other: 'Autre demande',
};

export function quoteEmailSubject(serviceName: string, customerName: string): string {
  return `Nouvelle demande de devis – ${serviceName} – ${customerName}`;
}

// '2026-10-03' -> '03.10.2026' (Swiss format).
export function emailDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}.${month}.${year}`;
}
