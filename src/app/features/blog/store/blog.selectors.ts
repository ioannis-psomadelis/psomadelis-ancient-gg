import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogState } from '@features/blog/store/blog.reducer';

export const selectBlogState = createFeatureSelector<BlogState>('blog');

export const selectPosts = createSelector(
  selectBlogState,
  (state) => state.posts,
);

export const selectLocalPosts = createSelector(
  selectBlogState,
  (state) => state.localPosts,
);

export const selectTotalCount = createSelector(
  selectBlogState,
  (state) => state.totalCount,
);

export const selectCurrentPage = createSelector(
  selectBlogState,
  (state) => state.currentPage,
);

export const selectSelectedPost = createSelector(
  selectBlogState,
  (state) => state.selectedPost,
);

export const selectLoading = createSelector(
  selectBlogState,
  (state) => state.loading,
);

export const selectError = createSelector(
  selectBlogState,
  (state) => state.error,
);

export const selectPostCreated = createSelector(
  selectBlogState,
  (state) => state.postCreated,
);
