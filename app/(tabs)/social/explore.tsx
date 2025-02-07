import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getCommunities } from '../../../hooks/graphql/communities/queries';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '@/constants/testStyles';


export default function ExploreScreen() {
  
  const { communities } = getCommunities();
  

  const handleCommunityPress = (id: string | number) => {
    router.push(`/community/${id}`);
  };

  return (
    <ScrollView>

      <View style={styles.section}>
        <Text style={styles.text}>Communities</Text>
        {(
          communities.map((community: any) => (
            <TouchableOpacity 
              style={styles.button}
              key={community.id}
              onPress={() => handleCommunityPress(community.id)}
            >
              <Text style={styles.text}>
                {community.name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}