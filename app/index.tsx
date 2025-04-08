import { Redirect } from 'expo-router';
import { useUserInfo } from '@/services/UserContext';
import { Text } from 'react-native';

export default function Index() {
  const { loading, userId, authToken } = useUserInfo();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (userId && authToken) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return <Redirect href="/(auth)/getStarted" />;
  }
}
