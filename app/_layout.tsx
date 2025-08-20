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
    // Test network connectivity
    const testNetwork = async () => {
      try {
        // Test with a public API first
        console.log('🔍 Testing with public API...');
        const publicResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (publicResponse.ok) {
          console.log('✅ Public API test successful:', publicResponse.status);
        } else {
          console.log('⚠️ Public API test failed:', publicResponse.status);
        }
        
        // Test with form-urlencoded content type
        console.log('🔍 Testing with form-urlencoded...');
        const formResponse = await fetch('http://18.191.234.29:3000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'query={__typename}'
        });
        
        if (formResponse.ok) {
          const data = await formResponse.text();
          console.log('✅ Form-urlencoded test successful:', formResponse.status);
          console.log('📄 Response:', data.substring(0, 200) + '...');
        } else {
          console.log('⚠️ Form-urlencoded test failed:', formResponse.status);
        }
        
        // Test with the actual Users query
        console.log('🔍 Testing with Users query...');
        const usersResponse = await fetch('http://18.191.234.29:3000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `query Users {
              users {
                success
                errors {
                  field
                  message
                }
                users {
                  id
                  email
                }
              }
            }`
          })
        });
        
        if (usersResponse.ok) {
          const data = await usersResponse.text();
          console.log('✅ Users query successful:', usersResponse.status);
          console.log('📄 Response:', data.substring(0, 300) + '...');
        } else {
          console.log('⚠️ Users query failed:', usersResponse.status);
          const errorText = await usersResponse.text();
          console.log('📄 Error response:', errorText);
        }
        
      } catch (error) {
        console.error('❌ Network test failed:', error instanceof Error ? error.message : String(error));
        console.error('❌ Error type:', typeof error);
        console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack');
      }
    };
    
    testNetwork();
    
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
              {/* Network Test Toggle Button - Hidden for now */}
              {/* <TouchableOpacity 
                style={styles.testButton} 
                onPress={() => setShowNetworkTest(true)}
              >
                <Text style={styles.testButtonText}>🔍 Network Test</Text>
              </TouchableOpacity> */}
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