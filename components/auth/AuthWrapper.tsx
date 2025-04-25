import React from 'react';
import { Text } from 'react-native';
import { useUserInfo } from '@/services/UserContext';
import { Redirect } from 'expo-router';

const AuthWrapper = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const { userId, authToken, loading } = useUserInfo();

    if (loading) {
      return <Text>Loading...</Text>;
    }
    if (!authToken || !userId || typeof userId !== 'number') {
      console.log('Missing some auth info:', 'authToken:', authToken, 'userId:', userId);
      return <Redirect href="/(auth)/getStarted" />;
    }

    return <WrappedComponent {...props} userId={userId} authToken={authToken} />;
  };
};

export default AuthWrapper;