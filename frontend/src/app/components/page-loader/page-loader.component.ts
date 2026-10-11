import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

// Keeps the loader on screen at least this long, so fast navigations don't just flicker.
const MIN_VISIBLE_MS = 400;

/**
 * Full-screen loader shown on the first load (taking over from the copy in index.html)
 * and while navigating between pages.
 */
@Component({
  imports: [TranslatePipe],
  selector: 'app-page-loader',
  styleUrl: './page-loader.component.scss',
  templateUrl: './page-loader.component.html',
})
export class PageLoaderComponent {
  protected readonly logo = 'assets/images/header/site-logo-desktop.png';
  protected readonly visible = signal(true);

  private shownAt = Date.now();
  private hideTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(Router)
      .events.pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.show();
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.hide();
        }
      });
    inject(DestroyRef).onDestroy(() => clearTimeout(this.hideTimer));
  }

  private show(): void {
    clearTimeout(this.hideTimer);
    if (!this.visible()) {
      this.shownAt = Date.now();
      this.visible.set(true);
    }
  }

  private hide(): void {
    clearTimeout(this.hideTimer);
    const remaining = MIN_VISIBLE_MS - (Date.now() - this.shownAt);
    this.hideTimer = setTimeout(() => this.visible.set(false), Math.max(0, remaining));
  }
}
