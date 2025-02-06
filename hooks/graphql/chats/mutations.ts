import { gql, useMutation } from '@apollo/client';

//"query": "mutation ($input: CreateChatInput!) { createChat(input: $input) { success chat { id type title password profile_pic creator { id first_name last_name email } } errors { field message } } }",
//input: type/title/creator_id
export const CREATE_CHAT = gql`
  mutation ($input: CreateChatInput!) {
    createChat(input: $input) {
      success
      chat { id type title password profile_pic creator { id first_name last_name email } }
      errors { field message }
    }
  }
`;

// Mutation - Invite User to Chat (default status: PENDING)
// input: chat_id/user_id
export const INVITE_USER_TO_CHAT = gql`
  mutation ($input: CreateChatMemberInput!) {
    createChatMember(input: $input) {
      success
      chat_member { 
        chat { id type title creator { id first_name last_name email } } 
        user { id first_name last_name email } 
        role 
        status 
      }
      errors { field message }
    }
  }
`;