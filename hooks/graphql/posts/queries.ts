import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/constants/debug';

// Variables: 
const GET_POSTS_BY_USER_ID = gql`
  query($userId: Int!, $skip: Int, $take: Int) {
    postsByUserId(userId: $userId, skip: $skip, take: $take) {
      success
      posts {
        id
        caption
        category
        author {
          id
          first_name
          last_name
        }
        mediaUrl
        post_targets {
          id
          target_type
          target_id
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetPostsByUserId(userId: number, skip: number = 0, take: number = 10) {
  const { data, loading, error } = useQuery(GET_POSTS_BY_USER_ID, {
    variables: { userId, skip, take },
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = !loading;
  if (debugQueries && fetched) {
    console.log("useGetPostsByUserId data", data, error ? 'error:' + error : '');
  }
  return {
    posts: data?.postsByUserId.posts || [],
    fetched: fetched,
    error: error?.message || null
  };
}