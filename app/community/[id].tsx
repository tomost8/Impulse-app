import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useGetCommunity } from '../../hooks/graphql/communities/queries';

export default function CommunityScreen() {
  const { id } = useLocalSearchParams();
  const { community } = useGetCommunity(Number(id));

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