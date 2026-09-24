import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import Swiper from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { HERO_SLIDES, HeroSlide } from './hero-banner.slides';

@Component({
  imports: [RouterLink, TranslatePipe],
  selector: 'app-hero-banner',
  styleUrl: './hero-banner.component.scss',
  templateUrl: './hero-banner.component.html',
})
export class HeroBannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperEl') swiperEl!: ElementRef<HTMLElement>

  private swiper!: InstanceType<typeof Swiper>

  slides: HeroSlide[] = HERO_SLIDES

  ngAfterViewInit(): void {
    this.swiper = new Swiper(this.swiperEl.nativeElement, {
      modules: [Autoplay, EffectFade, Navigation, Pagination],
      effect: 'fade',
      fadeEffect: { crossFade: true },
      loop: true,
      speed: 700,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.hero-banner__pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.hero-banner__arrow--prev',
        nextEl: '.hero-banner__arrow--next',
      },
    })
  }

  ngOnDestroy(): void {
    this.swiper?.destroy()
  }
}
