import { Component, ElementRef, OnDestroy, ViewChild, afterNextRender } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { ServiceCardComponent } from '@components/service-card/service-card.component';
import { SERVICE_POSTS, ServicePost } from './services-slider.items';

@Component({
  imports: [TranslatePipe, ServiceCardComponent],
  selector: 'app-services-slider',
  styleUrl: './services-slider.component.scss',
  templateUrl: './services-slider.component.html',
})
export class ServicesSliderComponent implements OnDestroy {
  @ViewChild('swiperEl') swiperEl!: ElementRef<HTMLElement>

  private swiper!: InstanceType<typeof Swiper>

  services: ServicePost[] = SERVICE_POSTS

  constructor() {
    // Browser only - Swiper needs the real DOM, which doesn't exist while prerendering.
    afterNextRender(() => {
      this.swiper = new Swiper(this.swiperEl.nativeElement, {
        modules: [Navigation, Pagination],
        slidesPerView: 1.2,
        spaceBetween: 16,
        pagination: {
          el: '.services-slider__pagination',
          clickable: true,
        },
        navigation: {
          prevEl: '.services-slider__arrow--prev',
          nextEl: '.services-slider__arrow--next',
        },
        // Only 2 services: side by side from 640px, where the arrows and dots hide themselves.
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 2, spaceBetween: 32 },
        },
      })
    })
  }

  ngOnDestroy(): void {
    this.swiper?.destroy()
  }
}
