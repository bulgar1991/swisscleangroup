import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CONTACT_LINKS } from '@/config/contact';

@Component({
  imports: [TranslatePipe],
  selector: 'app-contact-buttons',
  styleUrl: './contact-buttons.component.scss',
  templateUrl: './contact-buttons.component.html',
  host: { '[class.contact-buttons--dark]': "theme() === 'dark'" },
})
export class ContactButtonsComponent {
  // Which buttons to show, by id. Shows all of them when not set.
  only = input<string[]>();
  // "dark" for use on a dark background, like the footer.
  theme = input<'light' | 'dark'>('light');

  links = computed(() => {
    const only = this.only();
    return only ? CONTACT_LINKS.filter((link) => only.includes(link.id)) : CONTACT_LINKS;
  });
}
