import { gql, useMutation } from '@apollo/client';

// Mutation - Create Activity
export const CREATE_ACTIVITY = gql`
  mutation ($input: CreateActivityInput!) {
    createActivity(input: $input) {
      success
      activity {
        id
        category
        scheduledDatetime
        duration
        status
        post {
          id
          author {
            id
            first_name
            last_name
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

export function useCreateActivity() {
  const [createActivityMutation] = useMutation(CREATE_ACTIVITY);
  const createActivity = async (input: any, authToken: string) => {
    try {
      const response = await createActivityMutation({ 
        variables: { 
          input: input 
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      return response.data.createActivity;
    } catch (error) {
      console.error('Create Activity failed:', error);
      throw error;
    }
  };
  return { createActivity };
}

// Update Activity
export const UPDATE_ACTIVITY = gql`
  mutation ($id: Int!, $input: UpdateActivityInput!) {
    updateActivity(id: $id, input: $input) {
      success
      activity {
        id
        category
        scheduledDatetime
        duration
        description
        status
      }
      errors {
        field
        message
      }
    }
  }
`;