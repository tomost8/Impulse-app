import { Redirect } from 'expo-router';
import { useUserAuth } from '@/services/AuthContext';
import { Text } from 'react-native';

export default function Index() {
  const { loading, userId, authToken } = useUserAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (userId && authToken) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return <Redirect href="/(auth)/getStarted" />;
  }
}
