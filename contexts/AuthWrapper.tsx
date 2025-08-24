import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';
import LoadingScreen from '@/components/ui/common/loading';

const AuthWrapper = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    try {
      const { userId, authToken, loading, authInitialized } = useAuth();

      // Show loading screen while auth is initializing or if context is not available
      if (loading || !authInitialized) {
        return <LoadingScreen />;
      }

      // Redirect to login if not authenticated
      if (!authToken || !userId || typeof userId !== 'number') {
        return <Redirect href="/(auth)/getStarted" />;
      }

      return <WrappedComponent {...props} userId={userId} authToken={authToken} />;
    } catch (error) {
      // If there's an error accessing the context, show loading screen
      console.warn('AuthWrapper error:', error);
      return <LoadingScreen />;
    }
  };
};

export default AuthWrapper;