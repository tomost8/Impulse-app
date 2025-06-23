import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ApolloProvider } from '@apollo/client';
import { client } from '../services/client';
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { UserProvider } from '@/services/AuthContext';
import { useColorScheme } from 'react-native';
import { UserDataProvider } from '@/services/UserPreferencesContext';
import { InitialDataLoader } from '@/components/InitialDataLoader';
import { useEffect } from 'react';
import { lightTheme, darkTheme } from './theme/theme';
import { API_CONFIG } from '@/config/apiConfig';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Hide splash screen once the app is ready
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    console.log('Testing fetch with URL:', API_CONFIG.BASE_URL);
    fetch(API_CONFIG.BASE_URL, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ __typename }'
      })
    })
      .then(res => console.log('✅ Fetch success - Status:', res.status))
      .catch(err => console.log('❌ Fetch error:', err.message, err));
  }, []);

  return (
    <ApolloProvider client={client}>
    <PaperProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <UserProvider>
        <UserDataProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="community/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="post/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <InitialDataLoader>
                <StatusBar style="auto" />
              </InitialDataLoader>
          </ThemeProvider>
        </UserDataProvider>
        </UserProvider>
      </PaperProvider>
    </ApolloProvider>
  );
}
