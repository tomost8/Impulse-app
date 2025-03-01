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

// Input: name, description, thumbnail
const UPDATE_COMMUNITY = gql`
  mutation ($id: Int!, $input: UpdateCommunityInput!) {
    updateCommunity(id: $id, input: $input) {
      success
      community { 
        id name description thumbnail 
        influencer { id first_name last_name email } 
      }
      errors { field message }
    }
  }
`;

export function useUpdateCommunity() {
  const [updateCommunityMutation] = useMutation(UPDATE_COMMUNITY);
  const updateCommunity = async (id: number, input: any) => {
    try {
      const response = await updateCommunityMutation({
        variables: {
          id: id,
          input: input
        }
      }); 
      return response.data.updateCommunity;
    } catch (error) {
      console.error('Update Community failed:', error);
      throw error;
    }
  };  
  return { updateCommunity };
}

const CREATE_COMMUNITY_MEMBER = gql`
  mutation ($input: CreateCommunityMemberInput!) {
    createCommunityMember(input: $input) {
      success
      community_member {
        community { id name influencer { id first_name last_name } }
        user { id first_name last_name }
        role status
      }
      errors { field message }
    }
  }
`;

// Required Inputs: community_id, user_id
export function useCreateCommunityMember() {
  const [createCommunityMemberMutation] = useMutation(CREATE_COMMUNITY_MEMBER);
  const createCommunityMember = async (input: any) => {
    try {
      const response = await createCommunityMemberMutation({ 
        variables: { 
          input: input
        }
      });
      return response.data.createCommunityMember;
    } catch (error) {
      console.error('Create Community Member failed:', error);
      throw error;
    }
  };
  return { createCommunityMember };
}