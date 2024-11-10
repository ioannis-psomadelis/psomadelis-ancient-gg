import { DestroyRef, inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { map, Observable, of, withLatestFrom, mergeMap, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { generateLocalId } from '@shared/utils/utilts';

// GraphQL Queries
import {
  GET_POST_QUERY,
  GET_POSTS_QUERY,
} from '@core/providers/graphql/posts.queries';
import { CREATE_POST } from '@core/providers/graphql/posts.mutations';

// Models
import { GetPostResponse, Paginate, Post } from '@features/blog/models';
import { PostResponse } from '@features/blog/models';

// Facade
import { BlogFacade } from '@features/blog/store/blog.facade';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly apollo = inject(Apollo);
  private readonly blogFacade = inject(BlogFacade);

  readonly localPosts$ = this.blogFacade.localPosts$;
  readonly currentPage$ = this.blogFacade.currentPage$;
  readonly totalCount$ = this.blogFacade.totalCount$;

  getPaginatedPosts$(paginate: Paginate): Observable<{
    posts: Post[];
    totalCount: number;
  }> {
    const queryOptions = {
      query: GET_POSTS_QUERY,
      variables: {
        options: {
          paginate: {
            page: paginate.page,
            limit: paginate.limit,
          },
        },
      },
    };

    return this.apollo.watchQuery<PostResponse>(queryOptions).valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      withLatestFrom(this.localPosts$, this.currentPage$),
      map(([response, localPosts]) =>
        this.mapPostsResponse(response, localPosts, paginate),
      ),
    );
  }

  private mapPostsResponse(
    response: ApolloQueryResult<PostResponse>,
    localPosts: Post[],
    paginate: Paginate,
  ) {
    const mappedLocalPosts = localPosts;
    const isLastPage =
      paginate.page * paginate.limit >= response.data.posts.meta.totalCount;

    const remotePosts = response.data.posts.data.map((post) => ({
      ...post,
      body: post.body || '',
    }));

    return {
      posts: isLastPage ? [...remotePosts, ...mappedLocalPosts] : remotePosts,
      totalCount: response.data.posts.meta.totalCount + localPosts.length,
    };
  }

  getPost$(id: string): Observable<Post> {
    return this.localPosts$.pipe(
      take(1),
      mergeMap((localPosts) => {
        const localPost = localPosts.find((post) => post.id === id);
        if (localPost) {
          return of(localPost);
        }
        return this.fetchRemotePost$(id);
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  private fetchRemotePost$(id: string): Observable<Post> {
    return this.apollo
      .watchQuery<GetPostResponse>({
        query: GET_POST_QUERY,
        variables: { id },
      })
      .valueChanges.pipe(
        map(({ data }) => ({
          ...data.post,
          body: data.post.body || '',
        })),
      );
  }

  createPost$(input: Post): Observable<Post> {
    const localPost: Post = {
      ...input,
      id: generateLocalId(),
    };

    return this.apollo
      .mutate<GetPostResponse>({
        mutation: CREATE_POST,
        variables: { input },
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(() => localPost),
      );
  }
}
