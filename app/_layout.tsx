import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { UserProvider } from '../services/AuthContext';
import { UserDataProvider } from '../services/UserPreferencesContext';
import { InitialDataLoader } from '../components/InitialDataLoader';
import { ApolloProvider } from '@apollo/client';
import { client } from '../services/client';
import { NetworkTest } from '../components/NetworkTest';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Import Firebase app first to ensure early initialization
import '@react-native-firebase/app';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showNetworkTest, setShowNetworkTest] = useState(false);
  
  useEffect(() => {
    // Hide splash screen once the app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <UserDataProvider>
          <InitialDataLoader>
            {showNetworkTest ? (
              <View style={styles.container}>
                <TouchableOpacity 
                  style={styles.closeButton} 
                  onPress={() => setShowNetworkTest(false)}
                >
                  <Text style={styles.closeButtonText}>Close Network Test</Text>
                </TouchableOpacity>
                <NetworkTest />
              </View>
            ) : (
              <>
                <Stack>
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="community/[id]" options={{ headerShown: false }} />
                  <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
                  <Stack.Screen name="post/[id]" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
              </>
            )}
          </InitialDataLoader>
        </UserDataProvider>
      </UserProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  testButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1000,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});