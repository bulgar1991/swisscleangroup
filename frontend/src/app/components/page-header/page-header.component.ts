import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Title band at the top of inner pages, with a breadcrumb back to home.
 *
 *   <app-page-header titleKey="pages.about.title" subtitleKey="pages.about.subtitle" />
 */
@Component({
  imports: [RouterLink, TranslatePipe],
  selector: 'app-page-header',
  styleUrl: './page-header.component.scss',
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  titleKey = input.required<string>();
  subtitleKey = input<string>();
  // Dummy placeholder photo - replace or pass a different one per page.
  image = input('assets/images/banner/team.jpg');
}
