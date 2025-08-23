import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/utils/debug';

// Query - Get All Chats
export const GET_ALL_CHATS = gql`
  query {
    getAllChats {
      success
      chats { id type title password profile_pic creator { first_name last_name email } creator_id }
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
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetAllChats data", data, error ? 'error:' + error : '');
  }
  return {
    chats: data?.getAllChats.chats || [],
    fetched: fetched,
    error: error?.message || null
  };
}

// Query - Get Chat (by Chat ID)
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

export function useGetChat(id: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_CHAT, {
    variables: { id },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetChat data", data, error ? 'error:' + error : '');
  }
  return {
    chat: data?.getChat.chat || [],
    fetched: fetched,
    error: error?.message || null
  };
}

// Query - Get User Chats by User ID
export const GET_USER_CHATS = gql`
  query ($userId: Int!) {
    getUserChats(id: $userId) {
      success
      chat_members {
        chat { id type title profile_pic }
        role
        status
      }
      errors { field message }
    }
  }
`;

export function useGetUserChats(userId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_USER_CHATS, {
    skip: !shouldFetch,
    variables: { userId },
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    const chatMembers = data?.getUserChats.chat_members || [];
    const success = data?.getUserChats.success;
    const errors = data?.getUserChats.errors;
    console.log("useGetUserChats:", {
      success,
      chatCount: chatMembers.length,
      userId,
      errors: errors?.length > 0 ? errors : null,
      hasError: !!error
    });
  }
  return {
    chatMembers: data?.getUserChats.chat_members || [],
    fetched: fetched,
    error: error?.message || null
  };
} 

// Query - Get Chat Members (for Chat with ID of chatId)
export const GET_CHAT_MEMBERS = gql`
  query ($chatId: Int!) {
    getChatMembers(id: $chatId) {
      success
      chat_members { user { id first_name last_name username profile_picture } role status }
      errors { field message }
    }
  }
`;

export function useGetChatMembers(chatId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_CHAT_MEMBERS, {
    variables: { chatId },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetChatMembers data", data, error ? 'error:' + error : '');
  }
  return {
    chatMembers: data?.getChatMembers.chat_members || [],
    fetched: fetched,
    error: error?.message || null
  };
}

// Query - Get Chat Members Sorted (by sortBy for Chat with ID of chatId)
export const GET_CHAT_MEMBERS_SORTED = gql`
  query ($chatId: Int!, $sortBy: UserSortType!) {
    getChatMembers(id: $chatId, sort_by: $sortBy) {
      success
      chat_members {
        user {
          id
          first_name
          last_name
          username
          profile_picture
          point {
            points
            spending_points
            weekly_points
            monthly_points
          }
        }
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

export function useGetGroupLeaderboard(chatId: number, sortBy: string, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_CHAT_MEMBERS_SORTED, {
    variables: { chatId, sortBy },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetGroupLeaderboard data", data, error ? 'error:' + error : '');
  }
  return {
    chatMembers: data?.getChatMembers.chat_members || [],
    fetched: fetched,
    error: error?.message || null
  };
}

// Query - Get Messages (by Chat ID)
export const GET_MESSAGES = gql`
  query ($chatId: Int!) {
    getMessages(id: $chatId) {
      success
      messages {
        id
        sender {
          id
          first_name
          last_name
          profile_picture
        }
        content
        post {
          id
          caption
          mediaUrls
        }
        created_at
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetMessages(chatId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { chatId },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetMessages data", data, error ? 'error:' + error : '');
  }
  return {
    messages: data?.getMessages.messages || [],
    fetched: fetched,
    error: error?.message || null
  };
}