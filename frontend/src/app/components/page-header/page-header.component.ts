import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LocalizePipe } from '@pipes/localize.pipe';

/**
 * Title band at the top of inner pages, with a breadcrumb back to home.
 *
 *   <app-page-header titleKey="pages.about.title" subtitleKey="pages.about.subtitle" />
 *
 * `parent` adds a middle breadcrumb step, e.g. Home > Blog > <post title>.
 */
@Component({
  imports: [RouterLink, LocalizePipe, TranslatePipe],
  selector: 'app-page-header',
  styleUrl: './page-header.component.scss',
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  titleKey = input.required<string>();
  subtitleKey = input<string>();
  parent = input<{ labelKey: string; link: string }>();
  // Placeholder photo - pass a different one per page.
  image = input('assets/images/banner/banner-1.jpg');
  // Which part of the photo stays visible when it is cropped.
  imagePosition = input<'center' | 'bottom'>('center');
}
