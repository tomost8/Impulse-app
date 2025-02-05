import { useMutation } from '@apollo/client';
import { FIREBASE_AUTH } from './constants/auth';

export function useAuth(authToken: string) {  
  const [firebaseAuth, { data, loading, error }] = useMutation(FIREBASE_AUTH, {
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    },
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });

  return {
    firebaseAuth,
    user: data?.firebaseAuth.user || null,
    isLoading: loading,
    error: error?.message || null
  };
} 