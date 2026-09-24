import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats an ISO date ('2026-09-15') for the given language, Swiss style.
 *
 *   {{ post.date | localDate: lang() }}  ->  "15 sept. 2026" / "15. Sept. 2026" / "15 Sept 2026"
 */
@Pipe({ name: 'localDate' })
export class LocalDatePipe implements PipeTransform {
  transform(isoDate: string, lang: string | null): string {
    // Noon avoids the date shifting by a day in far-off time zones.
    const date = new Date(isoDate + 'T12:00:00');
    return new Intl.DateTimeFormat((lang ?? 'fr') + '-CH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }
}
