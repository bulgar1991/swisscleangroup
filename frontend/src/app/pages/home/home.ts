import { Component } from '@angular/core';
import { HeroBannerComponent } from '@components/hero-banner/hero-banner.component';
import { ServicesSliderComponent } from '@components/services-slider/services-slider.component';
import { WelcomeSectionComponent } from '@components/welcome-section/welcome-section.component';
import { StatsSectionComponent } from '@components/stats-section/stats-section.component';
import { NewsSectionComponent } from '@components/news-section/news-section.component';
import { QuoteFormComponent } from '@components/quote-form/quote-form.component';

@Component({
  selector: 'app-home',
  imports: [HeroBannerComponent, ServicesSliderComponent, WelcomeSectionComponent, StatsSectionComponent, NewsSectionComponent, QuoteFormComponent],
  templateUrl: './home.html',
})
export class Home {}
