import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { UserProvider } from '../services/AuthContext';
import { ApolloProvider } from '@apollo/client';
import { client } from '../services/client';

// Import Firebase app first to ensure early initialization
import '@react-native-firebase/app';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Test network connectivity
    const testNetwork = async () => {
      try {
        console.log('🔍 Testing GraphQL endpoint with proper query...');
        const graphqlResponse = await fetch('http://18.191.234.29:3000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: 'query { __typename }'
          })
        });
        
        if (graphqlResponse.ok) {
          const data = await graphqlResponse.text();
          console.log('✅ GraphQL test successful:', graphqlResponse.status);
          console.log('📄 Response:', data.substring(0, 200) + '...');
        } else {
          console.log('⚠️ GraphQL test failed with status:', graphqlResponse.status);
          const errorText = await graphqlResponse.text();
          console.log('📄 Error response:', errorText);
        }
      } catch (error) {
        console.error('❌ Network test failed:', error instanceof Error ? error.message : String(error));
      }
    };
    
    testNetwork();
    
    // Hide splash screen once the app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="community/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="post/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </UserProvider>
    </ApolloProvider>
  );
}