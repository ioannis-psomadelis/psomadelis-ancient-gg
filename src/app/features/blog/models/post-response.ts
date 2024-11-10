import { Post } from './posts.model';

export interface PostResponse {
  posts: {
    data: Post[];
    meta: {
      totalCount: number;
    };
  };
}
