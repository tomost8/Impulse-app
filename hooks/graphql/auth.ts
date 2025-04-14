import { gql, useMutation } from '@apollo/client';

export const FIREBASE_AUTH = gql`
  mutation {
    firebaseAuth {
      success
      user {
        id
        firebase_uid
        email
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

export function useFirebaseAuth() {
  const [firebaseAuthMutation] = useMutation(FIREBASE_AUTH);
  const firebaseAuth = async (authToken: string) => {
    try {
      const response = await firebaseAuthMutation({
        context: {
          headers: { 
            Authorization: `Bearer ${authToken}`
          }
        }
      });
      return response.data.firebaseAuth;
    } catch (error) {
      console.error('Firebase Auth failed:', error);
      throw error;
    }
  };
  return { firebaseAuth };
}