import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService, localizePath } from '@services/language.service';

/**
 * Adds the current language to a site path, for routerLink.
 *
 *   <a [routerLink]="'/services' | localize">  ->  /fr/services
 */
// Impure: the language changes from the URL while the header and footer stay on screen.
@Pipe({ name: 'localize', pure: false })
export class LocalizePipe implements PipeTransform {
  private language = inject(LanguageService);

  transform(path: string): string {
    return localizePath(path, this.language.code());
  }
}
