import { gql, useMutation } from '@apollo/client';

// Mutation - Update User
export const UPDATE_USER = gql`
  mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      success
      user {
        id
        email
        first_name
        last_name
        username
        gender
        age
        status
        profile_picture
        bio
        primary_goal
        secondary_goal
        timezone
        role
        is_double_cam
        point {
          points
          spending_points
          weekly_points
          monthly_points
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useUpdateUser() {
  const [updateUserMutation] = useMutation(UPDATE_USER);
  const updateUser = async (input: any, authToken: string) => {
    try {
      const response = await updateUserMutation({ 
        variables: { 
          input: input 
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      return response.data.updateUser;
    } catch (error) {
      console.error('Update User failed:', error);
      throw error;
    }
  };
  return { updateUser };
}