import { useMutation } from '@apollo/client';
import { FIREBASE_AUTH } from '../../services/api/auth';

export function useAuth(authToken: string) {  
  const [firebaseAuth, { data, loading, error }] = useMutation(FIREBASE_AUTH, {
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });

  return {
    firebaseAuth,
    user: data?.firebaseAuth.user || null,
    isLoading: loading,
    error: error?.message || null
  };
} 