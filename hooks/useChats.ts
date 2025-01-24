import { useQuery } from '@apollo/client';
import { GET_USER_CHATS, GET_CHAT } from '../services/api/chats';

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