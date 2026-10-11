import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { findNewsPost } from '@components/news-section/news-section.posts';
import { blogPosting, breadcrumbList } from '@/config/structured-data';
import { localizePath, toLanguageCode } from '@services/language.service';
import { SeoService } from '@services/seo.service';

// Like seoResolver, but the title and description come from the post itself.
// An unknown post id sends the visitor to the blog list.
export const blogPostSeoResolver: ResolveFn<void | RedirectCommand> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const post = findNewsPost(route.paramMap.get('id'));
  const code = toLanguageCode(route.paramMap.get('lang'));
  if (!post) return new RedirectCommand(inject(Router).parseUrl(localizePath('/blog', code)));

  inject(SeoService).apply(
    {
      title: post.key + '.title',
      description: post.key + '.excerpt',
      type: 'article',
      image: post.image,
      jsonLd: (translate, url) => [
        blogPosting(translate, post, url, code),
        breadcrumbList(
          translate,
          [
            { nameKey: 'header.menu.home', path: '/' },
            { nameKey: 'pages.blog.title', path: '/blog' },
            { nameKey: post.key + '.title', path: '/blog/' + post.id },
          ],
          code,
        ),
      ],
    },
    state.url,
  );
  return undefined;
};
