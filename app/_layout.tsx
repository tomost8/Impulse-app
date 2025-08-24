import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { UserProvider } from '../services/AuthContext';
import { DataProvider } from '../contexts/DataProviderContext';
import { DataFetcher } from '../contexts/DataFetcher';
import { ApolloProvider } from '@apollo/client';
import { client } from '../services/client';


// Import Firebase app first to ensure early initialization
import '@react-native-firebase/app';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Suppress the onAnimatedValueUpdate warning
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered']);

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen once the app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <DataProvider>
          <DataFetcher>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="community/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="post/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </DataFetcher>
        </DataProvider>
      </UserProvider>
    </ApolloProvider>
  );
}

