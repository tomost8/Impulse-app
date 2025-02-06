import { gql, useMutation } from '@apollo/client';

// Mutation - Update User
export const UPDATE_USER = gql`
  mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      success
      user {
        id
        first_name
        last_name
        username
        gender
        dob
        status
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