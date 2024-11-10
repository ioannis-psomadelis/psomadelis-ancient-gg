import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs/internal/Subscription';

// Components
import { PostDetailedComponent } from '@features/blog/components/post-detailed/post-detailed.component';
import { SkeletonLoaderComponent } from '@shared/components/skeleton-loader/skeleton-loader.component';

// Facade
import { BlogFacade } from '@features/blog/store/blog.facade';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, PostDetailedComponent, SkeletonLoaderComponent],
  providers: [BlogFacade],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnDestroy {
  route = inject(ActivatedRoute);
  blogFacade = inject(BlogFacade);

  private readonly subscriptions: Subscription[] = [];

  post$ = this.blogFacade.selectedPost$;
  loading$ = this.blogFacade.loading$;
  error$ = this.blogFacade.error$;

  constructor() {
    this.subscriptions.push(
      this.route.params.pipe(takeUntilDestroyed()).subscribe((params) => {
        this.getPostByID(params['id']);
      }),
    );
  }

  getPostByID(id: string) {
    this.blogFacade.loadPostByID(id);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.blogFacade.clearSelectedPost();
  }
}
