import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';

export default function Index() {
  const { loading, userId, authToken, authInitialized } = useAuth();
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

  // Show loading while auth is initializing or if context is not available
  if (loading || !authInitialized || !shouldRedirect) {
    return <Text>Loading...</Text>;
  }

  if (userId && authToken) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return <Redirect href="/(auth)/getStarted" />;
  }
}
