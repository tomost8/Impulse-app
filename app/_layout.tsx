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
import { crashlytics } from '@/config/firebaseConfig';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Hide splash screen once the app is ready
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    // Test Crashlytics
    try {
      crashlytics().log('App mounted successfully');
      crashlytics().setAttribute('custom_blur_enabled', 'true');
      crashlytics().setAttribute('app_version', '1.0.0');
      console.log('✅ Crashlytics test completed');
    } catch (error) {
      console.error('❌ Crashlytics test failed:', error);
    }

    console.log('=== APOLLO CLIENT DEBUG ===');
    console.log('Testing fetch with URL:', API_CONFIG.BASE_URL);
    console.log('API_CONFIG object:', API_CONFIG);
    
    if (!API_CONFIG.BASE_URL) {
      console.log('❌ ERROR: BASE_URL is empty!');
      crashlytics().recordError(new Error('BASE_URL is empty'));
      return;
    }

    fetch(API_CONFIG.BASE_URL, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ __typename }'
      })
    })
      .then(res => {
        console.log('✅ Fetch success - Status:', res.status);
        console.log('✅ Response headers:', res.headers);
        return res.text();
      })
      .then(text => {
        console.log('✅ Response body:', text);
        crashlytics().log('Apollo client fetch successful');
      })
      .catch(err => {
        console.log('❌ Fetch error:', err.message);
        console.log('❌ Full error object:', err);
        console.log('❌ Error stack:', err.stack);
        crashlytics().recordError(err);
      });
    
    console.log('=== END APOLLO CLIENT DEBUG ===');
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