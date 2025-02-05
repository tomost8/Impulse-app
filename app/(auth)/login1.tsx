import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
//authentication
import { auth } from '@/config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../graphql/constants/auth';
import { useMutation } from '@apollo/client';

import { API_CONFIG } from '@/config/apiConfig';
import { useUserInfo } from '@/services/UserContext';

export default function Login() {
  const { login } = useUserInfo();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
      let authToken;
      if (API_CONFIG.API_ENV === 'local') {
        authToken = email;
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password); // imported from firebase/auth
        authToken = await userCredential.user.getIdToken();
      }
      const { data } = await firebaseAuth({
        context: {
          headers: {
              Authorization: `Bearer ${authToken}`
          }
        }
      });
      console.log("data", data.firebaseAuth.success, data.firebaseAuth.user, data.firebaseAuth.errors);
      
      if (data?.firebaseAuth?.success && data.firebaseAuth?.user) {
        const userData = data.firebaseAuth.user;
        await login(authToken, userData.id);
        console.log("redirecting to home");
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
        secureTextEntry={!isPasswordVisible}
        style={styles.input}
      />
      <Button 
        title={isPasswordVisible ? "Hide Password" : "Show Password"}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
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