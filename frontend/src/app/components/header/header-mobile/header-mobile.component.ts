import { DOCUMENT } from '@angular/common';
import { Component, HostListener, OnDestroy, inject, signal } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactButtonsComponent } from '@components/contact-buttons/contact-buttons.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { MENU_ACTIVE_OPTIONS, MENU_ITEMS } from '../menu-items';

// Same breakpoint as `xl` in header.component.html, where the desktop header takes over.
const DESKTOP_MIN_WIDTH = 1280;

@Component({
  imports: [RouterLink, RouterLinkActive, TranslatePipe, ContactButtonsComponent, LanguageSwitcherComponent],
  selector: 'app-header-mobile',
  styleUrl: './header-mobile.component.scss',
  templateUrl: './header-mobile.component.html',
})
export class HeaderMobileComponent implements OnDestroy {
  private document = inject(DOCUMENT);

  siteLogo: string = 'assets/images/header/site-logo.png';
  sidebarLogo: string = 'assets/images/header/site-logo-desktop.png';
  menuItems = MENU_ITEMS;
  activeOptions: IsActiveMatchOptions = MENU_ACTIVE_OPTIONS;
  sidebarOpen = signal(false);

  openSidebar(): void {
    this.sidebarOpen.set(true);
    // Stop the page behind the sidebar from scrolling.
    this.document.body.style.overflow = 'hidden';
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
    this.document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.sidebarOpen()) this.closeSidebar();
  }

  // Rotating a tablet or widening the window switches to the desktop header - don't leave
  // the page locked behind a hidden sidebar.
  @HostListener('window:resize')
  onResize(): void {
    if (this.sidebarOpen() && window.innerWidth >= DESKTOP_MIN_WIDTH) this.closeSidebar();
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }
}
