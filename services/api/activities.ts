import { gql } from '@apollo/client';

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