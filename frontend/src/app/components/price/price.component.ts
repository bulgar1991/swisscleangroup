import { Component, computed, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Price } from '@/pages/pricing/pricing.data';
import { LanguageService } from '@services/language.service';

/**
 * A starting price, Swiss style: "dès CHF 120", "ab CHF 65 / Stunde".
 *
 *   <app-price [price]="item" />
 *   <app-price [price]="{ price: 120 }" variant="badge" />
 */
@Component({
  imports: [TranslatePipe],
  selector: 'app-price',
  styleUrl: './price.component.scss',
  templateUrl: './price.component.html',
})
export class PriceComponent {
  private language = inject(LanguageService);

  price = input.required<Price>();
  // "large" for the package cards, "badge" for the starting price of a service.
  variant = input<'normal' | 'large' | 'badge'>('normal');

  // "CHF 1'250" in every language - the way prices are written across Switzerland.
  amount = computed(
    () =>
      'CHF\u00a0' + new Intl.NumberFormat(this.language.code() + '-CH').format(this.price().price),
  );
}
