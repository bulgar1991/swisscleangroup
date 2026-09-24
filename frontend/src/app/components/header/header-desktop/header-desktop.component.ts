import { Component } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactButtonsComponent } from '@components/contact-buttons/contact-buttons.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { MENU_ACTIVE_OPTIONS, MENU_ITEMS } from '../menu-items';

@Component({
  imports: [RouterLink, RouterLinkActive, TranslatePipe, ContactButtonsComponent, LanguageSwitcherComponent],
  selector: 'app-header-desktop',
  styleUrl: './header-desktop.component.scss',
  templateUrl: './header-desktop.component.html',
})
export class HeaderDesktopComponent {
  siteLogo: string = 'assets/images/header/site-logo-desktop.png';
  menuItems = MENU_ITEMS;
  activeOptions: IsActiveMatchOptions = MENU_ACTIVE_OPTIONS;
}
