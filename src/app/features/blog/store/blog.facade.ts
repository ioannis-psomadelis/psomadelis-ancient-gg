import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogActions } from '@features/blog/store/blog.actions';
import * as BlogSelectors from '@features/blog/store/blog.selectors';

// Models
import { Paginate, Post } from '@features/blog/models';

@Injectable({
  providedIn: 'root',
})
export class BlogFacade {
  private readonly store = inject(Store);

  readonly posts$ = this.store.select(BlogSelectors.selectPosts);
  readonly localPosts$ = this.store.select(BlogSelectors.selectLocalPosts);
  readonly selectedPost$ = this.store.select(BlogSelectors.selectSelectedPost);
  readonly postCreated$ = this.store.select((state) => state.blog.postCreated);

  readonly loading$ = this.store.select(BlogSelectors.selectLoading);
  readonly error$ = this.store.select(BlogSelectors.selectError);

  readonly totalCount$ = this.store.select(BlogSelectors.selectTotalCount);
  readonly currentPage$ = this.store.select(BlogSelectors.selectCurrentPage);

  constructor() {}

  loadPosts(paginate: Paginate): void {
    this.store.dispatch(BlogActions.loadPosts({ paginate }));
  }

  loadPostByID(id: string): void {
    this.store.dispatch(BlogActions.loadPost({ id }));
  }

  createPost(post: Post): void {
    this.store.dispatch(BlogActions.createPost({ post }));
  }

  clearSelectedPost(): void {
    this.store.dispatch(BlogActions.clearSelectedPost());
  }

  saveCurrentPage(page: number) {
    this.store.dispatch(BlogActions.saveCurrentPage({ page }));
  }

  resetPostCreated() {
    this.store.dispatch(BlogActions.resetPostCreated());
  }
}
