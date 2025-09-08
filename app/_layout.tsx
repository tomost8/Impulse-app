import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding before asset loading is complete.
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered']); // Suppress the onAnimatedValueUpdate warning

import { ApolloProvider } from '@apollo/client';
import { client } from '../services/client';
import '@react-native-firebase/app';
import { AuthProvider } from '../contexts/AuthContext';
import { DataProvider } from '../contexts/DataProviderContext';
import { DataFetcher } from '../contexts/DataFetcher';
import { MemoriesProvider } from '../contexts/MemoriesContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { debugComponentsOn } from '@/debug/utils';
import TokenTestButton from '@/debug/TokenTestButton';

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen once the app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <MemoriesProvider>
      <ApolloProvider client={client}>
        <AuthProvider>
          <DataProvider>
            <DataFetcher>
              <View style={styles.container}>
                {/* Debug component - remove in production */}
                {debugComponentsOn && <TokenTestButton />}
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen name="community/[id]" options={{ headerShown: false }} />
                  <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
                  <Stack.Screen name="post/[id]" options={{ headerShown: false }} />
                  <Stack.Screen name="memories/[id]" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
              </View>
            </DataFetcher>
          </DataProvider>
        </AuthProvider>
      </ApolloProvider>
    </MemoriesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

