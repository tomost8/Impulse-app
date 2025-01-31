import { useQuery } from '@apollo/client';
import { GET_USER_CHATS, GET_CHAT, GET_ALL_CHATS, GET_CHAT_MEMBERS, GET_CHAT_MEMBERS_SORTED } from '../../services/api/chats';

export function useGetAllChats() {
  const { data, loading, error } = useQuery(GET_ALL_CHATS, {
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  //console.log(data);
  return {
    chats: data?.getAllChats.chats || [],
    isLoading: loading,
    error: error?.message || null
  };
}

export function useGetUserChats(userId: number) {
  const { data, loading, error } = useQuery(GET_USER_CHATS, {
    variables: { userId },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });

  return {
    chatMembers: data?.getUserChats.chat_members || [],
    isLoading: loading,
    error: error?.message || null
  };
} 

export function useGetChatMembers(chatId: number) {
  const { data, loading, error } = useQuery(GET_CHAT_MEMBERS, {
    variables: { chatId },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  //console.log(data);
  return {
    chatMembers: data?.getChatMembers.chat_members || [],
    isLoading: loading,
    error: error?.message || null
  };
}

export function useGetGroupLeaderboard(chatId: number, sortBy: string) {
  const { data, loading, error } = useQuery(GET_CHAT_MEMBERS_SORTED, {
    variables: { chatId, sortBy },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  //console.log(data);
  return {
    chatMembers: data?.getChatMembers.chat_members || [],
    isLoading: loading,
    error: error?.message || null
  };
}

export function useGetChat(id: number) {
  const { data, loading, error } = useQuery(GET_CHAT, {
    variables: { id },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });

  return {
    chat: data?.getChat.chat || [],
    isLoading: loading,
    error: error?.message || null
  };
}