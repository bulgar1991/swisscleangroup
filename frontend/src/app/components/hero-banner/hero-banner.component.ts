import { Component, ElementRef, OnDestroy, ViewChild, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import Swiper from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { HERO_SLIDES, HeroSlide } from './hero-banner.slides';
import { LocalizePipe } from '@pipes/localize.pipe';

@Component({
  imports: [RouterLink, LocalizePipe, TranslatePipe],
  selector: 'app-hero-banner',
  styleUrl: './hero-banner.component.scss',
  templateUrl: './hero-banner.component.html',
})
export class HeroBannerComponent implements OnDestroy {
  @ViewChild('swiperEl') swiperEl!: ElementRef<HTMLElement>

  private swiper!: InstanceType<typeof Swiper>

  slides: HeroSlide[] = HERO_SLIDES

  constructor() {
    // Browser only - Swiper needs the real DOM, which doesn't exist while prerendering.
    afterNextRender(() => {
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
    })
  }

  ngOnDestroy(): void {
    this.swiper?.destroy()
  }
}
