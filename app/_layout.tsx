import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { UserProvider, useUserAuth } from '../services/AuthContext';
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

// Token Testing Button Component
const TokenTestButton = () => {
  const { getTokenInfo, checkAndRefreshToken } = useUserAuth();
  const [isVisible, setIsVisible] = useState(false);

  // Show button after a delay to avoid interfering with app startup
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTokenTest = async () => {
    try {
      const tokenInfo = getTokenInfo();
      console.log('🧪 Token Info:', tokenInfo);
      
      if (tokenInfo) {
        Alert.alert(
          '🔐 Token Info',
          `Created: ${tokenInfo.createdAt}\nExpires: ${tokenInfo.expiresAt}\nTime Left: ${tokenInfo.timeUntilExpiry} minutes\nValid: ${tokenInfo.isValid ? '✅' : '❌'}`,
          [
            { text: 'OK', style: 'default' },
            { 
              text: 'Test Refresh', 
              onPress: async () => {
                console.log('🧪 Testing token refresh...');
                const success = await checkAndRefreshToken();
                console.log('🧪 Token refresh result:', success);
                Alert.alert('Token Refresh', success ? '✅ Refresh successful!' : '❌ Refresh failed');
              }
            }
          ]
        );
      } else {
        Alert.alert('Token Info', 'No token available');
      }
    } catch (error) {
      console.error('Token test error:', error);
      Alert.alert('Error', 'Failed to get token info');
    }
  };

  if (!isVisible) return null;

  return (
    <TouchableOpacity style={styles.tokenButton} onPress={handleTokenTest}>
      <Text style={styles.tokenButtonText}>🔐</Text>
    </TouchableOpacity>
  );
};

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
            <View style={styles.container}>
              <TokenTestButton />
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
      </UserProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tokenButton: {
    position: 'absolute',
    top: 50,
    right: 70,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tokenButtonText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

