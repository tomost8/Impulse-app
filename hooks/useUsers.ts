import { useQuery } from '@apollo/client';
import { GET_USER } from '../services/api/users';

export function useUser(id: number) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });

  return {
    user: data?.user.user || [],
    isLoading: loading,
    error: error?.message || null
  };
} 