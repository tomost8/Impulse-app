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
    console.log("Create Post input", input);
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