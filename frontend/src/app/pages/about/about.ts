import { Component } from '@angular/core';
import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { WelcomeSectionComponent } from '@components/welcome-section/welcome-section.component';

@Component({
  selector: 'app-about',
  imports: [PageHeaderComponent, WelcomeSectionComponent],
  templateUrl: './about.html',
})
export class About {}
