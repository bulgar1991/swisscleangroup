import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  effect,
  inject,
  input,
} from '@angular/core';
import { LanguageService } from '@services/language.service';

/**
 * Counts the element's text from 0 up to a number once it scrolls into view.
 *
 *   <span [appCountUp]="1500" [countUpDelay]="200"></span>
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private language = inject(LanguageService);

  appCountUp = input.required<number>();
  // Wait this long (ms) after the element becomes visible before counting.
  countUpDelay = input(0);
  countUpDuration = input(2000);

  private current = 0;
  private observer?: IntersectionObserver;
  private timeoutId?: ReturnType<typeof setTimeout>;
  private frameId?: number;

  constructor() {
    // Re-render with the right thousands separator when the language changes.
    effect(() => {
      this.language.current();
      this.render(this.current);
    });
  }

  ngAfterViewInit(): void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      this.render(this.appCountUp());
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.observer?.disconnect();
          this.timeoutId = setTimeout(() => this.animate(), this.countUpDelay());
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    clearTimeout(this.timeoutId);
    if (this.frameId) cancelAnimationFrame(this.frameId);
  }

  private animate(): void {
    const target = this.appCountUp();
    const duration = this.countUpDuration();
    // Timed from the first frame: its timestamp can be earlier than performance.now() here,
    // which would otherwise give a negative progress (and negative numbers) at the start.
    let start: number | null = null;

    const step = (now: number) => {
      start ??= now;
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      // Ease-out: fast at the start, slowing down near the final number.
      const eased = 1 - Math.pow(1 - progress, 3);
      this.render(Math.round(target * eased));
      if (progress < 1) this.frameId = requestAnimationFrame(step);
    };
    this.frameId = requestAnimationFrame(step);
  }

  private render(value: number): void {
    this.current = value;
    const locale = (this.language.current() ?? 'fr') + '-CH';
    this.el.nativeElement.textContent = new Intl.NumberFormat(locale).format(value);
  }
}
