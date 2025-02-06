import { useQuery } from '@apollo/client';
import { GET_USER_CHATS, GET_CHAT, GET_ALL_CHATS, GET_CHAT_MEMBERS, GET_CHAT_MEMBERS_SORTED } from './chats';

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