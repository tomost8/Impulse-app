import { gql } from '@apollo/client';

//"query ($id: Int!) { getChat(id: $id) { success chat { id type title password profile_pic creator { first_name last_name email } creator_id } errors { field message } } }",
export const GET_CHAT = gql`
  query ($id: Int!) {
    getChat(id: $id) {
      success
      chat {
        id
        type
        title
        password
        profile_pic
        creator {
          id
          first_name
          last_name
          email
        }
        creator_id
      }
      errors {
        field
        message
      }
    }
  }
`; 