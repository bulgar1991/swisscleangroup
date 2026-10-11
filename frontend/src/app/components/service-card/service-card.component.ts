import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PriceComponent } from '@components/price/price.component';
import { ServicePost } from '@components/services-slider/services-slider.items';
import { LocalizePipe } from '@pipes/localize.pipe';
import { startingPrice } from '@/pages/pricing/pricing.data';

@Component({
  imports: [RouterLink, LocalizePipe, TranslatePipe, PriceComponent],
  selector: 'app-service-card',
  styleUrl: './service-card.component.scss',
  templateUrl: './service-card.component.html',
})
export class ServiceCardComponent {
  service = input.required<ServicePost>();
  startingPrice = computed(() => startingPrice(this.service().id));
}
