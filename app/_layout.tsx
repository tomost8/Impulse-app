import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
// Import Firebase config FIRST before any Firebase modules
import '@/config/firebaseConfig';
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
// Temporarily disabled crashlytics import
import { NativeModules } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Hide splash screen once the app is ready
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    // Temporarily disable crashlytics to focus on Firebase initialization
    console.log('=== APOLLO CLIENT DEBUG ===');
    console.log('Testing fetch with URL:', API_CONFIG.BASE_URL);
    console.log('API_CONFIG object:', API_CONFIG);
    
    if (!API_CONFIG.BASE_URL) {
      console.log('❌ ERROR: BASE_URL is empty!');
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
        // Temporarily disabled crashlytics
        // try {
        //   const crashlytics = getCrashlytics();
        //   crashlytics().log('Apollo client fetch successful');
        // } catch (error) {
        //   console.error('Crashlytics error:', error);
        // }
      })
      .catch(err => {
        console.log('❌ Fetch error:', err.message);
        console.log('❌ Full error object:', err);
        console.log('❌ Error stack:', err.stack);
        // Temporarily disabled crashlytics
        // try {
        //   const crashlytics = getCrashlytics();
        //   crashlytics().recordError(err);
        // } catch (error) {
        //   console.error('Crashlytics error:', error);
        // }
      });
    
    console.log('=== END APOLLO CLIENT DEBUG ===');
  }, []);

  // Temporarily disabled crashlytics error handling
  // useEffect(() => {
  //   // Global error handler for React Native bridge errors
  //   const originalConsoleError = console.error;
  //   console.error = (...args) => {
  //     // Call original console.error first to avoid infinite loops
  //     originalConsoleError.apply(console, args);
  //     
  //     // Log to Crashlytics (but don't log crashlytics errors to avoid infinite loop)
  //     try {
  //       const crashlytics = getCrashlytics();
  //       const errorMessage = args.join(' ');
  //       if (!errorMessage.includes('Crashlytics error')) {
  //         crashlytics().log(`Console Error: ${errorMessage}`);
  //         crashlytics().recordError(new Error(`Console Error: ${errorMessage}`));
  //       }
  //     } catch (error) {
  //       // Use original console.error to avoid infinite loop
  //       originalConsoleError('Crashlytics logging failed:', error);
  //     }
  //   };

  //   // Handle unhandled promise rejections
  //   const handleUnhandledRejection = (event: any) => {
  //     try {
  //       const crashlytics = getCrashlytics();
  //       crashlytics().log(`Unhandled Promise Rejection: ${event.reason}`);
  //       crashlytics().recordError(new Error(`Unhandled Promise Rejection: ${event.reason}`));
  //     } catch (error) {
  //       console.error('Crashlytics error:', error);
  //     }
  //   };

  //   // Handle JavaScript errors
  //   const handleError = (event: any) => {
  //     try {
  //       const crashlytics = getCrashlytics();
  //       crashlytics().log(`JavaScript Error: ${event.message}`);
  //       crashlytics().recordError(new Error(`JavaScript Error: ${event.message}`));
  //     } catch (error) {
  //       console.error('Crashlytics error:', error);
  //     }
  //   };

  //   window.addEventListener('unhandledrejection', handleUnhandledRejection);
  //   window.addEventListener('error', handleError);

  //   return () => {
  //     window.removeEventListener('unhandledrejection', handleUnhandledRejection);
  //     window.removeEventListener('error', handleError);
  //   };
  // }, []);

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