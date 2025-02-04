import { Redirect } from 'expo-router';
import { useUserInfo } from '@/components/auth/UserContext';
import { Text } from 'react-native';

export default function Index() {
  const { userId, authToken, isLoading } = useUserInfo();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (userId && authToken) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
