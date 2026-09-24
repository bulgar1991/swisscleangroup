import { Component, ElementRef, HostListener, computed, inject, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageCode, LanguageService } from '../../../services/language.service';

@Component({
  imports: [TranslatePipe],
  selector: 'app-language-switcher',
  styleUrl: './language-switcher.component.scss',
  templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent {
  private languageService = inject(LanguageService);
  private host = inject(ElementRef<HTMLElement>);

  // "dropdown" for the desktop header, "inline" (FR | DE | EN) for the mobile menu.
  variant = input<'dropdown' | 'inline'>('dropdown');

  languages = this.languageService.languages;
  currentCode = this.languageService.current;
  currentLanguage = computed(
    () => this.languages.find((lang) => lang.code === this.currentCode()) ?? this.languages[0],
  );
  open = signal(false);

  select(code: LanguageCode): void {
    this.languageService.use(code).subscribe();
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
