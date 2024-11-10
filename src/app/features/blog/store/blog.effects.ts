import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BlogActions } from './blog.actions';
import { catchError, map, of, switchMap, tap, mergeMap } from 'rxjs';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';
import { Post } from '../models';

@Injectable()
export class BlogEffects {
  actions$ = inject(Actions);
  blogService = inject(BlogService);
  router = inject(Router);

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadPosts),
      switchMap((action) => {
        return this.blogService.getPaginatedPosts$(action.paginate);
      }),
      map((response) =>
        BlogActions.loadPostsSuccess({
          posts: response.posts as Post[],
          totalCount: response.totalCount,
        }),
      ),
      catchError((error) => of(BlogActions.loadPostsFailure({ error }))),
    ),
  );

  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadPost),
      switchMap((action) => this.blogService.getPost$(action.id)),
      map((post) =>
        post && post.id
          ? BlogActions.loadPostSuccess({ post })
          : BlogActions.loadPostFailure({ error: 'Post not found or invalid' }),
      ),
      catchError((error) => of(BlogActions.loadPostFailure({ error }))),
    ),
  );

  clearSelectedPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.clearSelectedPost),
      map(() => BlogActions.clearSelectedPostSuccess()),
    ),
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.createPost),
      map((action) => {
        const { title, body } = action.post;
        return {
          title,
          body,
        };
      }),
      switchMap((post) =>
        this.blogService.createPost$(post as Post).pipe(
          mergeMap((createdPost) => [
            BlogActions.createPostSuccess({ post: createdPost }),
            BlogActions.setPostCreated(),
          ]),
          catchError((error) => {
            return of(BlogActions.createPostFailure({ error }));
          }),
        ),
      ),
      tap(() => {
        this.router.navigate(['/posts']);
      }),
    ),
  );
}
