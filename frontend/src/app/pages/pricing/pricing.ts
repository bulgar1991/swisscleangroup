import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { PriceTilesComponent } from '@components/price-tiles/price-tiles.component';
import { findServicePost } from '@components/services-slider/services-slider.items';
import { LocalizePipe } from '@pipes/localize.pipe';
import { PRICING_PAGES, findPricingPage } from './pricing.data';

@Component({
  selector: 'app-pricing',
  imports: [RouterLink, LocalizePipe, TranslatePipe, PageHeaderComponent, PriceTilesComponent],
  styleUrl: './pricing.scss',
  templateUrl: './pricing.html',
})
export class Pricing {
  private params = toSignal(inject(ActivatedRoute).paramMap, { requireSync: true });

  // pricingSeoResolver already redirected away from unknown ids.
  page = computed(() => findPricingPage(this.params().get('id'))!);
  service = computed(() => findServicePost(this.page().serviceId)!);
  otherPages = computed(() => PRICING_PAGES.filter((page) => page !== this.page()));
}
