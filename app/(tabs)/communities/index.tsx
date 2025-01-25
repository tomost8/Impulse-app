import { StyleSheet, Image, Platform, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getUserCommunities } from '../../../hooks/api/useCommunities';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CommunitiesScreen() {
  const [userId, setUserId] = useState<number | null>(null);
  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('idUser');
        if (storedUserId) {
          setUserId(parseInt(storedUserId));
        }
      } catch (error) {
        console.error('Error fetching userId from AsyncStorage:', error);
      }
    };

    getUserId();
  }, []);
  
  const { communityMembers, isLoading, error } = getUserCommunities(userId as number);
  if (userId !== null) {
    console.log('Community Members data:', communityMembers);
  }
  

  const handleCommunityPress = (id: string | number) => {
    router.push(`/community/${id}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Communities</Text>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          communityMembers.map((communityMember: any) => (
            <TouchableOpacity
              key={communityMember.community.id}
              onPress={() => handleCommunityPress(communityMember.community.id)}
            >
              <Text style={styles.communityName}>
                {communityMember.community.name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => router.push('communities/explore')}>
          <Text style={styles.text}>Explore</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
