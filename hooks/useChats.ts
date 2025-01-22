import { useQuery } from '@apollo/client';
import { GET_CHAT } from '../services/api/chats';

export function useChat(id: number) {
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