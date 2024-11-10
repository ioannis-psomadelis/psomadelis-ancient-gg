export interface Comment {
  id: string;
  name: string;
  email: string;
  body: string;
}

export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
}

export interface Post {
  id?: string;
  title: string;
  body: string;
  user?: User;
  comments?: {
    data: Comment[];
  };
}

export interface PostsResponse {
  posts: {
    data: Post[];
    meta: {
      totalCount: number;
    };
  };
}

export interface GetPostResponse {
  post: Post;
}

export interface Paginate {
  page: number;
  limit: number;
}

export interface PaginatedPosts {
  posts: Posts;
}

export type Posts = Array<Post>;
