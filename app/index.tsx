import { Redirect } from 'expo-router';
import { useUserAuth } from '@/services/AuthContext';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';

export default function Index() {
  const { loading, userId, authToken, authInitialized } = useUserAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Add a delay to prevent race conditions during re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading && authInitialized) {
        setShouldRedirect(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [loading, authInitialized, userId, authToken]);

  if (loading || !authInitialized || !shouldRedirect) {
    return <Text>Loading...</Text>;
  }

  if (userId && authToken) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return <Redirect href="/(auth)/getStarted" />;
  }
}
