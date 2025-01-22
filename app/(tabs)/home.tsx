import { StyleSheet, Image, Platform, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useCommunities } from '../../hooks/useCommunities';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { communities, isLoading, error } = useCommunities();
  console.log('Communities data:', communities);
  

  const handleCommunityPress = (id: string | number) => {
    router.push(`/community/${id}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Quote of the Day</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Daily Goals</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Communities</Text>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          communities.map((community: any) => (
            <TouchableOpacity
              key={community.id}
              onPress={() => handleCommunityPress(community.id)}
            >
              <Text style={styles.communityName}>
                {community.name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Accountability Progress or Leaderboards</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ... existing code ...
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#333', // Optional: adds visual separation between sections
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  communityName: {
    color: 'white',
    fontSize: 16,
    marginVertical: 4,
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 10,
  }
});