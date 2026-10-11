import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ServicePost } from '@components/services-slider/services-slider.items';
import { LocalizePipe } from '@pipes/localize.pipe';

@Component({
  imports: [RouterLink, LocalizePipe, TranslatePipe],
  selector: 'app-service-card',
  styleUrl: './service-card.component.scss',
  templateUrl: './service-card.component.html',
})
export class ServiceCardComponent {
  service = input.required<ServicePost>();
}
