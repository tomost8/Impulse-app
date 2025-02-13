import { gql, useMutation } from '@apollo/client';

// Mutation - Create Post
export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      success
      post {
        id
        author_id
        caption
        mediaUrl
        is_deleted
        created_at
        updated_at
        expires_at
        post_targets {
          target_id
          target_type
        }
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

export function useCreatePost() {
  const [createPostMutation] = useMutation(CREATE_POST);
  const createPost = async (input: any, authToken: string) => {
    //console.log("Create Post input", input);
    try {
      const response = await createPostMutation({ 
        variables: { 
          input: input 
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      return response.data.createPost;
    } catch (error) {
      console.error('Create Post failed:', error);
      throw error;
    }
  };
  return { createPost };
}

// Mutation - Like Post
export const LIKE_POST = gql`
  mutation LikePost($postId: Int!) {
    likePost(postId: $postId) {
      success
      errors {
        field
        message
      }
    }
  }
`;

export function useLikePost() {
  const [likePostMutation] = useMutation(LIKE_POST);
  const likePost = async (postId: number, authToken: string) => {
    try {
      const response = await likePostMutation({ 
        variables: { 
          postId: postId 
        },
        context: {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      });
      return response.data.likePost;
    } catch (error) {
      console.error('Like Post failed:', error);
      throw error;
    }
  }
  return { likePost };
}

// Mutation - Unlike Post
export const UNLIKE_POST = gql`
  mutation UnlikePost($postId: Int!) {
    unlikePost(postId: $postId) {
      success
      errors {
        field
        message 
      }
    }
  }
`;

export function useUnlikePost() { 
  const [unlikePostMutation] = useMutation(UNLIKE_POST);
  const unlikePost = async (postId: number, authToken: string) => {
    try {
      const response = await unlikePostMutation({ 
        variables: { 
          postId: postId 
        },
        context: { 
          headers: { Authorization: `Bearer ${authToken}` } 
        }
      });
      return response.data.unlikePost;
    } catch (error) {
      console.error('Unlike Post failed:', error);
      throw error;
    }
  }
  return { unlikePost };
}