import React from 'react';
import { useUserAuth } from '@/services/AuthContext';
import { Redirect } from 'expo-router';
import LoadingScreen from '@/components/ui/common/loading';

const AuthWrapper = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const { userId, authToken, loading } = useUserAuth();

    if (loading) {
      return <LoadingScreen />;
    }
    if (!authToken || !userId || typeof userId !== 'number') {
      console.log('Missing some auth info:', 'authToken:', authToken, 'userId:', userId);
      return <Redirect href="/(auth)/getStarted" />;
    }

    return <WrappedComponent {...props} userId={userId} authToken={authToken} />;
  };
};

export default AuthWrapper;