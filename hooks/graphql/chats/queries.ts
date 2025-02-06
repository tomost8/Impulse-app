import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/constants/debug';
const debug = debugQueries;
//import { GET_USER_CHATS, GET_CHAT, GET_ALL_CHATS, GET_CHAT_MEMBERS, GET_CHAT_MEMBERS_SORTED } from './chats';


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


export function useGetAllChats(shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_ALL_CHATS, {
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  //console.log(data);
  return {
    chats: data?.getAllChats.chats || [],
    isLoading: loading,
    error: error?.message || null
  };
}

export function useGetUserChats(userId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_USER_CHATS, {
    variables: { userId },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });

  return {
    chatMembers: data?.getUserChats.chat_members || [],
    isLoading: loading,
    error: error?.message || null
  };
} 

export function useGetChatMembers(chatId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_CHAT_MEMBERS, {
    variables: { chatId },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  //console.log(data);
  return {
    chatMembers: data?.getChatMembers.chat_members || [],
    isLoading: loading,
    error: error?.message || null
  };
}

export function useGetGroupLeaderboard(chatId: number, sortBy: string, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_CHAT_MEMBERS_SORTED, {
    variables: { chatId, sortBy },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  //console.log(data);
  return {
    chatMembers: data?.getChatMembers.chat_members || [],
    isLoading: loading,
    error: error?.message || null
  };
}

export function useGetChat(id: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_CHAT, {
    variables: { id },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });

  return {
    chat: data?.getChat.chat || [],
    isLoading: loading,
    error: error?.message || null
  };
}