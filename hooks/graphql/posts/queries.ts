import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/constants/debug';

// @param targetType - Type of target to filter by (e.g., "community", "group")
// @param targetId - ID of the specific target
// @param currentUserId - ID of the current user for permission checks
// @param unreadOnly - Whether to return only unread posts
// @param skip - Number of records to skip (pagination)
// @param take - Number of records to take (pagination)
// @param category - Category to filter posts by
const GET_POSTS = gql`
  query($targetType: String, $currentUserId: Int, $unreadOnly: Boolean, $skip: Int, $take: Int) {
    posts(targetType: $targetType, currentUserId: $currentUserId, unreadOnly: $unreadOnly, skip: $skip, take: $take) {
      success
      posts {
        id
        caption
        category
        mediaUrl
        author {
          id
          profile_picture
          first_name
          last_name
        }
        created_at
        expires_at
        post_targets {
          id
          target_type
          target_id
        }
        category
        messages {
          id
        }
        comments {
          id
        }
        liked
        likeCount
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetPosts(currentUserId: number, authToken: string, targetType: string, 
  unreadOnly: boolean=true, skip: number=0, take: number=1, shouldFetch: boolean=true) {
  const { data, loading, error } = useQuery(GET_POSTS, {
    skip: !shouldFetch,
    variables: { targetType, currentUserId, unreadOnly, skip, take },
    context: {
      headers: {
          Authorization: `Bearer ${authToken}`,
      },
    },
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetPosts data", data, error ? 'error:' + error : '');
  }
  return {
    posts: data?.posts.posts || [],
    fetched: fetched,
    error: error?.message || null
  };
}

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