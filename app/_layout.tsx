import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ApolloProvider } from '@apollo/client';
import { client } from '../services/client';
import { PaperProvider } from 'react-native-paper';
import { UserProvider } from '@/services/UserContext';
import { useColorScheme } from 'react-native';
import { UserDataProvider } from '@/services/UserPreferencesContext';
import { InitialDataLoader } from '@/components/InitialDataLoader';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Hide splash screen once the app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <UserDataProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <PaperProvider>
              <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen 
                  name="community/[id]" 
                  options={{
                    headerShown: true,
                    headerTitle: "Community",
                  }} 
                />
                <Stack.Screen name="+not-found" />
              </Stack>
              <InitialDataLoader>
                <StatusBar style="auto" />
              </InitialDataLoader>
            </PaperProvider>
          </ThemeProvider>
        </UserDataProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
