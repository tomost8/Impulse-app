import { useState } from 'react';
import { router } from 'expo-router';
// GraphQL hooks
import { useFirebaseAuth } from '@/hooks/graphql/auth';
// Components
import GetStartedScreen from '@/components/screens/SignupLogin/Login/getStarted';
// Services
import { useUserInfo } from '@/services/UserContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';

export default function GetStarted() {
  const [error, setError] = useState<string | null>(null); 
  // maybe add a loading state

  const { login } = useUserInfo();
  const { firebaseAuth } = useFirebaseAuth();
  const tryLogin = async (email: string, password: string, onSuccess?: () => void) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      let authToken = await userCredential.user.getIdToken();
      const response = await firebaseAuth(authToken);
      if (response.success) {
        await login(authToken, response.user.id);
        router.replace('/(tabs)/home');
        onSuccess?.();
      } 
    } catch (error) {
      console.error("Login failed", error);
      setError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return <GetStartedScreen 
    error={error}
    tryLogin={tryLogin}
  />;
}
