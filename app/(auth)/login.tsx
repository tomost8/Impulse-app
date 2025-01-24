import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useMutation } from '@apollo/client';
import { FIREBASE_AUTH } from '../../services/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [firebaseAuth] = useMutation(FIREBASE_AUTH, {
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
        console.log("email", email, "password", password);
        const authToken = 'dev-token-123'
        console.log("authToken", authToken);
        const { data } = await firebaseAuth({
            context: {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
            }
        });
        console.log("data", data);
        
        if (data?.firebaseAuth?.success) {
            await AsyncStorage.setItem('authToken', authToken);
            if (data.firebaseAuth.user) {
                const userData = data.firebaseAuth.user;
                console.log('Authenticated user:', userData);
                await AsyncStorage.setItem('idUser', userData.id);
                await AsyncStorage.setItem('idFirebase', userData.firebase_uid);
            }
            router.replace('/(tabs)/home');
        }
    } catch (error) {
      console.log('Login failed', error);
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
      
      <TextInput 
        placeholder="Email" 
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      
      <TextInput 
        placeholder="Password" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button 
          title="Login" 
          onPress={handleLogin}
          disabled={!email || !password}
        />
      )}
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
}); 