import { Redirect } from 'expo-router';
import { useUserAuth } from '@/services/AuthContext';
import { Text } from 'react-native';

export default function Index() {
  const { loading, userId, authToken, authInitialized } = useUserAuth();

  console.log('🏠 Index page - Loading:', loading, 'UserId:', userId, 'AuthToken:', authToken ? 'exists' : 'null', 'AuthInitialized:', authInitialized);

  if (loading || !authInitialized) {
    console.log('🏠 Index page - Showing loading screen (loading:', loading, 'authInitialized:', authInitialized, ')');
    return <Text>Loading...</Text>;
  }

  if (userId && authToken) {
    console.log('🏠 Index page - Redirecting to home');
    return <Redirect href="/(tabs)/home" />;
  } else {
    console.log('🏠 Index page - Redirecting to get started');
    return <Redirect href="/(auth)/getStarted" />;
  }
}
