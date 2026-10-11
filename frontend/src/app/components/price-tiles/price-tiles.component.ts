import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PriceComponent } from '@components/price/price.component';
import { PricingPage } from '@/pages/pricing/pricing.data';

/**
 * Prices at a glance: one tile per option, with an icon, a starting price and a title,
 * followed by a note on what the final price depends on.
 *
 *   <app-price-tiles [page]="pricingPage" />
 */
@Component({
  imports: [TranslatePipe, PriceComponent],
  selector: 'app-price-tiles',
  styleUrl: './price-tiles.component.scss',
  templateUrl: './price-tiles.component.html',
})
export class PriceTilesComponent {
  page = input.required<PricingPage>();
}
