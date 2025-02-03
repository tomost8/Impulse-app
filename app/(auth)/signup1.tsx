import { useState } from 'react';
import styles from '@/constants/testStyles';
import { View, TextInput, Button, Text, Platform } from 'react-native';
import { router } from 'expo-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';

export default function Signup1() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const checkValidFields = async () => {
    setError(null);
    
    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Invalid email format');
        return false;
      }

      // Check email availability
      const emailQuery = await getDocs(
        query(collection(db, 'users'), where('email', '==', email.toLowerCase()))
      );
      if (!emailQuery.empty) {
        setError('Email is already in use');
        return false;
      }
      // Check username availability
      const usernameQuery = await getDocs(
        query(collection(db, 'users'), where('userName', '==', username.toLowerCase()))
      );
      if (!usernameQuery.empty) {
        setError('Username is already taken');
        return false;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return false;
      }

      setError('All fields valid!');
      return true;

    } catch (error) {
      console.error('Error checking field availability:', error);
      setError(error instanceof Error ? error.message : 'Availability check failed');
      return false;
    }
  };

  const handleNext = async () => {
    const isAvailable = await checkValidFields();
    if (isAvailable) {
      router.push({
        pathname: '/(auth)/signup2',
        params: {
          email,
          username,
          password,
          firstName,
          lastName
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
      <TextInput 
        placeholder="First Name" 
        placeholderTextColor="gray"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />

      <TextInput 
        placeholder="Last Name" 
        placeholderTextColor="gray"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      
      <TextInput 
        placeholder="Username" 
        placeholderTextColor="gray"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
      />
      
      <TextInput 
        placeholder="Email" 
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      
      <TextInput 
        placeholder="Password" 
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button 
        title="Check Availability" 
        onPress={checkValidFields}
        //disabled={!email || !username}
      />

      <Button 
        title="Next" 
        onPress={handleNext}
        disabled={!email || !password || !firstName || !lastName || !username}
      />
    </View>
  );
}