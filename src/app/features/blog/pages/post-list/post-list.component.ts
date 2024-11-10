import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogFacade } from '../../store/blog.facade';
import { Subscription, switchMap, map, take } from 'rxjs';

//Components
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { PostCardComponent } from '@features/blog/components/post-card/post-card.component';
import { SkeletonLoaderComponent } from '@shared/components/skeleton-loader/skeleton-loader.component';

//Models
import { Paginate } from '@features/blog/models';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginatorComponent,
    PostCardComponent,
    SkeletonLoaderComponent,
  ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly blogFacade = inject(BlogFacade);

  // Public observables
  readonly posts$ = this.blogFacade.posts$;
  readonly error$ = this.blogFacade.error$;
  readonly totalCount$ = this.blogFacade.totalCount$;
  readonly currentPage$ = this.blogFacade.currentPage$;
  readonly loading$ = this.blogFacade.loading$;

  paginate: Paginate = { page: 1, limit: 9 };

  private readonly subscriptions: Subscription[] = [];

  ngOnInit() {
    this.handlePosts();
  }

  private handlePosts() {
    this.subscriptions.push(
      this.blogFacade.postCreated$
        .pipe(
          take(1),
          switchMap((postCreated) =>
            postCreated ? this.handleNewPost() : this.handleExistingPosts(),
          ),
        )
        .subscribe(),
    );
  }

  private handleNewPost() {
    return this.totalCount$.pipe(
      take(1),
      map((totalCount) => {
        const lastPage = Math.ceil(totalCount / this.paginate.limit);
        if (lastPage !== this.paginate.page) {
          this.paginate.page = lastPage;
        }
        this.blogFacade.resetPostCreated();
        this.selectPage(this.paginate.page);
      }),
    );
  }

  private handleExistingPosts() {
    return this.currentPage$.pipe(
      take(1),
      map((currentPage) => {
        this.paginate.page = currentPage;
        this.selectPage(this.paginate.page);
      }),
    );
  }

  navigateToPost(id: string) {
    this.router.navigate(['/posts', id]);
  }

  selectPage(page: number) {
    this.paginate = { ...this.paginate, page };
    this.blogFacade.saveCurrentPage(page);
    this.blogFacade.loadPosts(this.paginate);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
