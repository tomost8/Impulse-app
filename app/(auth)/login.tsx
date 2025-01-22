import { View, TextInput, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Login() {
  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Email" 
        style={styles.input}
      />
      <TextInput 
        placeholder="Password" 
        secureTextEntry
        style={styles.input}
      />
      <Button 
        title="Login" 
        onPress={() => router.replace('/(tabs)/home')} 
      />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
}); 