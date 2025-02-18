import { gql } from '@apollo/client';

export const FIREBASE_AUTH = gql`
  mutation {
    firebaseAuth {
      success
      user {
        id
        firebase_uid
        email
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