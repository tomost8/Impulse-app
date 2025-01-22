import { gql } from '@apollo/client';

//query($id: Int!) { user(id: $id) { success user { username profile_picture} errors { field message } } }
export const GET_USER = gql`
  query ($id: Int!) {
    user(id: $id) {
      success
      user {
        username
        profile_picture
      }
      errors {
        field
        message
      }
    }
  }
`; 