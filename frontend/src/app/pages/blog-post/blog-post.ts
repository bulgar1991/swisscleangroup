import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { NEWS_POSTS, findNewsPost } from '@components/news-section/news-section.posts';
import { LocalDatePipe } from '@pipes/local-date.pipe';
import { LanguageService } from '@services/language.service';

@Component({
  selector: 'app-blog-post',
  imports: [RouterLink, TranslatePipe, PageHeaderComponent, LocalDatePipe],
  templateUrl: './blog-post.html',
  // Shared with the service detail page.
  styleUrl: '../article-page.scss',
})
export class BlogPost {
  lang = inject(LanguageService).current;

  private params = toSignal(inject(ActivatedRoute).paramMap, { requireSync: true });

  // blogPostSeoResolver already redirected away from unknown ids.
  post = computed(() => findNewsPost(this.params().get('id'))!);
  otherPosts = computed(() => NEWS_POSTS.filter((post) => post !== this.post()));
}
