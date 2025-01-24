import { StyleSheet, Image, Platform, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getCommunities } from '../../../hooks/useCommunities';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUserChats } from '@/hooks/useChats';


export default function ExploreScreen() {
  
  const { communities, isLoading, error } = getCommunities();
  

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
