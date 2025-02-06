import { gql } from '@apollo/client';

export const FIREBASE_AUTH = gql`
  mutation {
    firebaseAuth {
      success
      user {
        id
        email
        firebase_uid
        first_name
        last_name
        role
        status
      }
      errors {
        field
        message
      }
    }
  }
`;