import { Component } from '@angular/core';
import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { StatsSectionComponent } from '@components/stats-section/stats-section.component';
import { WelcomeSectionComponent } from '@components/welcome-section/welcome-section.component';

@Component({
  selector: 'app-about',
  imports: [PageHeaderComponent, WelcomeSectionComponent, StatsSectionComponent],
  templateUrl: './about.html',
})
export class About {}
