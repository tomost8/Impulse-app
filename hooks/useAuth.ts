import { useMutation } from '@apollo/client';
import { FIREBASE_AUTH } from '../services/api/auth';

export function useAuth(authToken: string) {  // Default value for testing
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

  const signIn = async (email: string, password: string) => {
    try {
      const result = await firebaseAuth();
      return result.data?.firebaseAuth;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  return {
    firebaseAuth,
    user: data?.firebaseAuth.user || null,
    isLoading: loading,
    error: error?.message || null
  };
} 