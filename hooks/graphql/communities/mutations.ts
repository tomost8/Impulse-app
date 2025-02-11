import { gql, useMutation } from '@apollo/client';

// Required Inputs: name, influencer_id
// Optional Inputs: description, thumbnail
export const CREATE_COMMUNITY = gql`
  mutation ($input: CreateCommunityInput!) {
    createCommunity(input: $input) {
      success
      community { 
        id name description thumbnail 
        influencer { id first_name last_name email } 
      }
      errors { field message }
    }
  }
`;

export function useCreateCommunity() {
  const [createCommunityMutation] = useMutation(CREATE_COMMUNITY);
  const createCommunity = async (input: any) => {
    try {
      const response = await createCommunityMutation({ 
        variables: { 
          input: input
        }
      });
      return response.data.createCommunity;
    } catch (error) {
      console.error('Create Community failed:', error);
      throw error;
    }
  };
  return { createCommunity };
}

// Required Inputs: community_id, category
const CREATE_COMMUNITY_CATEGORY = gql`
  mutation ($input: CreateCommunityCategoryInput!) {
    createCommunityCategory(input: $input) {
      success
      community_category {
        community { id name influencer { id first_name last_name } }
        category
      }
      errors { field message }
    }
  }
`;

export function useCreateCommunityCategory() {
  const [createCommunityCategoryMutation] = useMutation(CREATE_COMMUNITY_CATEGORY);
  const createCommunityCategory = async (input: any) => {
    try {
      const response = await createCommunityCategoryMutation({ 
        variables: { 
          input: input
        }
      });
      return response.data.createCommunityCategory;
    } catch (error) {
      console.error('Create Community Category failed:', error);
      throw error;
    }
  };
  return { createCommunityCategory };
}