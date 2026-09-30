import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { SERVICE_POSTS, findServicePost } from '@components/services-slider/services-slider.items';

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink, TranslatePipe, PageHeaderComponent],
  templateUrl: './service-detail.html',
  // Shared with the blog post page.
  styleUrl: '../article-page.scss',
})
export class ServiceDetail {
  private params = toSignal(inject(ActivatedRoute).paramMap, { requireSync: true });

  // serviceSeoResolver already redirected away from unknown ids.
  service = computed(() => findServicePost(this.params().get('id'))!);
  otherServices = computed(() => SERVICE_POSTS.filter((service) => service !== this.service()));
}
