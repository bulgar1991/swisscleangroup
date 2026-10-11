import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, map } from 'rxjs';
import {
  LanguageCode,
  LanguageService,
  switchLanguagePath,
} from '../../../services/language.service';

@Component({
  imports: [RouterLink, TranslatePipe],
  selector: 'app-language-switcher',
  styleUrl: './language-switcher.component.scss',
  templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent {
  private languageService = inject(LanguageService);
  private host = inject(ElementRef<HTMLElement>);
  private router = inject(Router);

  private url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  // "dropdown" for the desktop header, "inline" (FR | DE | EN) for the mobile menu.
  variant = input<'dropdown' | 'inline'>('dropdown');

  languages = this.languageService.languages;
  currentCode = this.languageService.current;
  currentLanguage = computed(
    () => this.languages.find((lang) => lang.code === this.currentCode()) ?? this.languages[0],
  );
  open = signal(false);

  // The current page in each language - real links, so search engines find every version.
  links = computed(() => {
    const url = this.url();
    return Object.fromEntries(
      this.languages.map((lang) => [lang.code, switchLanguagePath(url, lang.code)]),
    ) as Record<LanguageCode, string>;
  });

  close(): void {
    this.open.set(false);
  }

  toggle(): void {
    this.open.update((open) => !open);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.open.set(false);
  }
}
