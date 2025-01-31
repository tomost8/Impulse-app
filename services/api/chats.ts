import { gql } from '@apollo/client';

//"query": "query { getAllChats { success chats { id type title password profile_pic creator { first_name last_name email } creator_id } errors { field message } } }"
export const GET_ALL_CHATS = gql`
  query {
    getAllChats {
      success
      chats { id type title password profile_pic creator { first_name last_name email } creator_id }
      errors { field message }
    }
  }
`;

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

//"query": "query ($chatId: Int!) { getChatMembers(id: $chatId) { success chat_members { user { id first_name last_name } role status } errors { field message } } }",
export const GET_CHAT_MEMBERS = gql`
  query ($chatId: Int!) {
    getChatMembers(id: $chatId) {
      success
      chat_members { user { id first_name last_name username profile_picture } role status }
      errors { field message }
    }
  }
`;

//"query": "query ($chatId: Int!) { getChatMembers(id: $chatId) { success chat_members { user { id first_name last_name } role status } errors { field message } } }",
export const GET_CHAT_MEMBERS_SORTED = gql`
  query ($chatId: Int!, $sortBy: UserSortType!) {
    getChatMembers(id: $chatId, sort_by: $sortBy) {
      success
      chat_members { user { id first_name last_name username profile_picture point {
                        points
                        spending_points
                        weekly_points
                        monthly_points
                    } } role status }
      errors { field message }
    }
  }
`;

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