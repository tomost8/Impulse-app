import { gql, useMutation } from '@apollo/client';

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