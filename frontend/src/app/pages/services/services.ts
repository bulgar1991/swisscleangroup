import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { ServiceCardComponent } from '@components/service-card/service-card.component';
import { SERVICE_POSTS } from '@components/services-slider/services-slider.items';

@Component({
  selector: 'app-services',
  imports: [RouterLink, TranslatePipe, PageHeaderComponent, ServiceCardComponent],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  services = SERVICE_POSTS;
}
