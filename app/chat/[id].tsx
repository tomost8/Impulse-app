import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useChat } from '../../hooks/useChats'; // You'll need to create this hook

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const { chat, isLoading, error } = useChat(Number(id));

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="white" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chat?.type}</Text>
      {/* Add chat messages and input here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  error: {
    color: '#ff6b6b',
    textAlign: 'center',
  },
}); 