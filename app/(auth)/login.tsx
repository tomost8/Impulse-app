import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/constants/testStyles';
import { router } from 'expo-router';

export default function AuthScreen() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
          Let's get started
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/signup1')}>
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
          Already have an account?
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/login1')}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

