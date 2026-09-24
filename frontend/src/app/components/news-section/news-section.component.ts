import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LocalDatePipe } from '@pipes/local-date.pipe';
import { LanguageService } from '@services/language.service';
import { NEWS_POSTS, NewsPost } from './news-section.posts';

@Component({
  imports: [RouterLink, TranslatePipe, LocalDatePipe],
  selector: 'app-news-section',
  styleUrl: './news-section.component.scss',
  templateUrl: './news-section.component.html',
})
export class NewsSectionComponent {
  lang = inject(LanguageService).current;

  posts: NewsPost[] = NEWS_POSTS;
}
