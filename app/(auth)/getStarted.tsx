import { useState } from 'react';
import { router } from 'expo-router';
// GraphQL hooks
import { useFirebaseAuth } from '@/hooks/graphql/auth';
// Components

import GetStartedScreen from '@/components/screens/SignupLogin/Login/getStarted';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { getAuth } from '@/config/firebaseConfig';
import { signInWithEmailAndPassword } from '@react-native-firebase/auth';

export default function GetStarted() {
  const [error, setError] = useState<string | null>(null); 
  // maybe add a loading state

  const { login } = useAuth();
  const { firebaseAuth } = useFirebaseAuth();
  const tryLogin = async (email: string, password: string, rememberMe: boolean, onSuccess?: () => void) => {
    try {
      // Step 1: Authenticate with firebase, start user session, get token
      const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
      console.log(`🔐 Firebase login:\n  - Email: ${email}\n  - Firebase UID: ${userCredential.user.uid}`);
      let authToken = await userCredential.user.getIdToken();
      // Step 2: Verify token with backend and retrieves user id
      const response = await firebaseAuth(authToken);
      if (response.success) {
        // Step 3: Store token + id + firebaseUid in AsyncStorage and auth React state
        await login(authToken, response.user.id, userCredential.user.uid, rememberMe, email);
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
