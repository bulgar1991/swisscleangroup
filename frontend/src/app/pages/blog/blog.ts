import { Component } from '@angular/core';
import { NewsSectionComponent } from '@components/news-section/news-section.component';
import { PageHeaderComponent } from '@components/page-header/page-header.component';

@Component({
  selector: 'app-blog',
  imports: [PageHeaderComponent, NewsSectionComponent],
  templateUrl: './blog.html',
})
export class Blog {}
