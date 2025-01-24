import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getCommunity } from '../../hooks/useCommunities';

export default function CommunityScreen() {
  const { id } = useLocalSearchParams();
  const { community, isLoading, error } = getCommunity(Number(id));

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
      <Text style={styles.title}>{community?.name}</Text>
      {/* Add more community details here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // or your app's background color
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