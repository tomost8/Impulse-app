import React from 'react';
import { Text } from 'react-native';
import { useUserInfo } from '@/services/UserContext';

const AuthWrapper = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const { userId, authToken, isLoading } = useUserInfo();

    if (isLoading) {
      return <Text>Loading...</Text>;
    }
    if (!userId || !authToken || typeof userId !== 'number') {
      return <Text>Not authenticated</Text>;
    }

    return <WrappedComponent {...props} userId={userId} authToken={authToken} />;
  };
};

export default AuthWrapper;