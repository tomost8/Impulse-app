import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { AuthProvider } from '../contexts/AuthContext';
import { DataProvider } from '../contexts/DataProviderContext';
import { DataFetcher } from '../contexts/DataFetcher';
import { ApolloProvider } from '@apollo/client';
import { client } from '../services/client';
import TokenTestButton from '@/debug/TokenTestButton';
import { debugComponentsOn } from '@/debug/utils';

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
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </View>
          </DataFetcher>
        </DataProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

