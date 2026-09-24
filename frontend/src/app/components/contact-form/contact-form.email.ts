/**
 * How a contact message looks in the email you receive (sent by Web3FormsService).
 * The labels are in French (the business language) whatever language the visitor used.
 */
export const CONTACT_EMAIL_LABELS = {
  name: 'Nom',
  email: 'E-mail',
  phone: 'Téléphone',
  subject: 'Sujet',
  message: 'Message',
} as const;

export function contactEmailSubject(subject: string, name: string): string {
  return `Nouveau message du site – ${subject} – ${name}`;
}
