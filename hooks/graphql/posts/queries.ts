import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/utils/debug';


const GET_FEED_COMMUNITIES = gql`
  query($currentUserId: Int!, $skip: Int, $take: Int) {
    joinedCommunityPosts(currentUserId: $currentUserId, skip: $skip, take: $take) {
      success
      posts {
        id
        caption
        category
        mediaUrl
        author {
          id
          profile_picture
          username
          first_name
          last_name
        }
        created_at
        post_targets {
          id
          target_type
          target_id
        }
        category
        commentCount
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

export function useGetFeedCommunities(currentUserId: number, authToken: string, shouldFetch: boolean=true) {
  const { data, loading, error } = useQuery(GET_FEED_COMMUNITIES, {
    skip: !shouldFetch,
    variables: { currentUserId },
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
    console.log("useGetFeedCommunities data", data, error ? 'error:' + error : '');
  }
  return {
    posts: data?.joinedCommunityPosts.posts || [],
    fetched: fetched,
    error: error?.message || null
  };
}

//get friends feed
const GET_FEED_FRIENDS = gql`
  query($currentUserId: Int!) {
  friendsFeedPosts(currentUserId: $currentUserId) {
    success
    posts {
        id
        caption
        category
        mediaUrl
        author {
          id
          profile_picture
          username
          first_name
          last_name
        }
        created_at
        post_targets {
          id
          target_type
          target_id
        }
        category
        commentCount
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

export function useGetFeedFriends(currentUserId: number, authToken: string, shouldFetch: boolean=true) {
  const { data, loading, error } = useQuery(GET_FEED_FRIENDS, {
    skip: !shouldFetch,
    variables: { currentUserId },
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
    console.log("useGetFeed data", data, error ? 'error:' + error : '');
  }
  return {
    posts: data?.friendsFeedPosts.posts || [],
    fetched: fetched,
    error: error?.message || null
  };
}



// Get Post by Post ID
const GET_POST = gql`
  query($id: Int!) {
    post(id: $id) {
      success
      post {
        id
        mediaUrl
        caption
        author {
          id
          profile_picture
          first_name
          last_name
        }
        created_at
        expires_at
        category
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

export function useGetPost(id: number, shouldFetch: boolean=true) {
  const { data, loading, error } = useQuery(GET_POST, {
    skip: !shouldFetch,
    variables: { id },
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetPost data", data, error ? 'error:' + error : '');
  }
  return {
    post: data?.post.post || null,
    fetched: fetched,
    error: error?.message || null
  };
} 

// Get Post Comments
const GET_POST_COMMENTS = gql`
  query PostComments($postId: Int!) {
    postComments(postId: $postId) {
    success
    comments {
      id
      post_id
      user {
        id
        username
        profile_picture
      }
      content
      created_at
      updated_at
      parent_comment_id
      replies {
        id
        content
        created_at
        user {
          id
          username
        }
      }
    }
    errors {
      field
      message
      }
    }
  }
`;

export function useGetPostComments(postId: number, shouldFetch: boolean=true) {
  const { data, loading, error } = useQuery(GET_POST_COMMENTS, {
    skip: !shouldFetch,
    variables: { postId },
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetPostComments data", data, error ? 'error:' + error : '');
  }
  return {
    comments: data?.postComments.comments || [],
    fetched: fetched,
    error: error?.message || null
  };
}


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
  unreadOnly: boolean=true, skip: number=0, take: number=10, shouldFetch: boolean=true) {
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