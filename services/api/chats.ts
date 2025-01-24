import { gql } from '@apollo/client';

// Query - Get User Chats by User ID
export const GET_USER_CHATS = gql`
  query ($userId: Int!) {
    getUserChats(id: $userId) {
      success
      chat_members {
        chat { id type title }
        role
        status
      }
      errors { field message }
    }
  }
`;

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