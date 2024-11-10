import { gql } from 'apollo-angular';

export const GET_POSTS_QUERY = gql`
  query ($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_POST_QUERY = gql`
  query ($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        id
        name
        username
        email
      }
      comments {
        data {
          id
          name
          email
          body
        }
      }
    }
  }
`;
