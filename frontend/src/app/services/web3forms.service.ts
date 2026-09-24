import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { LanguageService } from '@services/language.service';
import { environment } from '../../environments/environment';

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

// Sender name shown in your inbox.
const EMAIL_FROM_NAME = 'Site web Swiss Clean Group';

const LANGUAGE_NAMES: Record<string, string> = {
  fr: 'Français',
  de: 'Allemand',
  en: 'Anglais',
};

/** One "Label: value" row of the email. */
export type EmailRow = [label: string, value: string];

/**
 * Sends a form to your inbox through Web3Forms.
 *
 * Web3Forms turns every field into a "Label: value" row of its email table, in the order they
 * are sent. Rows with an empty value are left out, and the visitor's language is added as the
 * last row so you know which language to answer in.
 */
@Injectable({ providedIn: 'root' })
export class Web3FormsService {
  private http = inject(HttpClient);
  private language = inject(LanguageService);

  // Emits true when the email was accepted, false otherwise (never errors).
  send(subject: string, replyTo: string, rows: EmailRow[]): Observable<boolean> {
    const lang = this.language.current() ?? 'fr';

    // Settings Web3Forms reads itself (not shown as rows in the email).
    const payload: Record<string, string | boolean> = {
      access_key: environment.web3formsKey,
      subject,
      from_name: EMAIL_FROM_NAME,
      // "Reply" in your mail app answers the visitor directly.
      replyto: replyTo,
      botcheck: false,
    };

    for (const [label, value] of [...rows, ['Langue du visiteur', LANGUAGE_NAMES[lang] ?? lang]]) {
      if (value) payload[label] = value;
    }

    return this.http
      .post<{ success: boolean }>(WEB3FORMS_URL, payload, { headers: { Accept: 'application/json' } })
      .pipe(
        map((res) => res.success),
        catchError(() => of(false)),
      );
  }
}
