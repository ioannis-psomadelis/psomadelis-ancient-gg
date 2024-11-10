import { createReducer, on } from '@ngrx/store';
import { BlogActions } from './blog.actions';
import { Posts } from '@features/blog/models';
import { Post } from '@features/blog/models';

export interface BlogState {
  posts: Posts;
  localPosts: Post[];
  totalCount: number;
  currentPage: number;
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
  postCreated: boolean;
}

export const initialState: BlogState = {
  posts: [],
  localPosts: [],
  totalCount: 0,
  currentPage: 1,
  selectedPost: null,
  loading: false,
  error: null,
  postCreated: false,
};

export const blogReducer = createReducer(
  initialState,

  on(BlogActions.loadPosts, (state, { paginate }) => ({
    ...state,
    loading: true,
    paginate,
  })),

  on(BlogActions.saveCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),

  on(BlogActions.loadPostsSuccess, (state, { posts, totalCount }) => ({
    ...state,
    posts,
    totalCount,
    loading: false,
  })),

  on(BlogActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(BlogActions.loadPost, (state) => ({
    ...state,
    loading: true,
  })),

  on(BlogActions.loadPostSuccess, (state, { post }) => ({
    ...state,
    selectedPost: post,
    loading: false,
  })),

  on(BlogActions.loadPostFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(BlogActions.clearSelectedPost, (state) => ({
    ...state,
    selectedPost: null,
  })),

  on(BlogActions.clearSelectedPostSuccess, (state) => ({
    ...state,
    selectedPost: null,
  })),

  on(BlogActions.createPost, (state) => ({
    ...state,
    loading: true,
  })),

  on(BlogActions.createPostSuccess, (state, { post }) => ({
    ...state,
    localPosts: [...state.localPosts, post],
    loading: false,
  })),

  on(BlogActions.setPostCreated, (state) => ({
    ...state,
    postCreated: true,
  })),

  on(BlogActions.resetPostCreated, (state) => ({
    ...state,
    postCreated: false,
  })),
);
