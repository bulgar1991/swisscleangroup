import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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
export class ServicesSliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperEl') swiperEl!: ElementRef<HTMLElement>

  private swiper!: InstanceType<typeof Swiper>

  services: ServicePost[] = SERVICE_POSTS

  ngAfterViewInit(): void {
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
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1280: { slidesPerView: 4, spaceBetween: 24 },
      },
    })
  }

  ngOnDestroy(): void {
    this.swiper?.destroy()
  }
}
