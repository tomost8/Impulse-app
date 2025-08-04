import { useState } from 'react';
import { router } from 'expo-router';
// GraphQL hooks
import { useFirebaseAuth } from '@/hooks/graphql/auth';
// Componentsimport { StyleSheet } from 'react-native';
import type { AppTheme } from '../theme/theme';

import GetStartedScreen from '@/components/screens/SignupLogin/Login/getStarted';
// Services
import { useUserAuth } from '@/services/AuthContext';
import auth from '@react-native-firebase/auth';

export default function GetStarted() {
  const [error, setError] = useState<string | null>(null); 
  // maybe add a loading state

  const { login } = useUserAuth();
  const { firebaseAuth } = useFirebaseAuth();
  const tryLogin = async (email: string, password: string, rememberMe: boolean, onSuccess?: () => void) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      let authToken = await userCredential.user.getIdToken();
      console.log("auth", auth);
      console.log("authToken", email, password, authToken);
      const response = await firebaseAuth(authToken);
      
      if (response.success) {
        await login(authToken, response.user.id, rememberMe, email);
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
