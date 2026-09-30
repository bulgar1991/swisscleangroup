import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { findNewsPost } from '@components/news-section/news-section.posts';
import { SeoService } from '@services/seo.service';

// Like seoResolver, but the title and description come from the post itself.
// An unknown post id sends the visitor to the blog list.
export const blogPostSeoResolver: ResolveFn<void | RedirectCommand> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const post = findNewsPost(route.paramMap.get('id'));
  if (!post) return new RedirectCommand(inject(Router).parseUrl('/blog'));

  inject(SeoService).apply(
    { title: post.key + '.title', description: post.key + '.excerpt' },
    state.url,
  );
  return undefined;
};
