import styles from '@/constants/testStyles';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetFriendsLeaderboard } from '@/hooks/api/useFriends';


export default function HomeScreen() {
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
  
  const { friends, isLoading, error } = useGetFriendsLeaderboard(userId as number, 'POINTS_WEEKLY');
  if (userId !== null) {
    console.log('Friends data:', friends);
  }

  return (
    <ScrollView >
      <View style={styles.section}>
        <Text style={styles.text}>Quote of the Day</Text>
        <Text style={styles.text}>The quote goes here using normal text</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Daily Goals</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('home/activityAdd')}>
          <Text style={styles.text}>Add Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('home/activityView')}>
          <Text style={styles.text}>View All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings/notifications')}>
          <Text style={styles.text}>Notifications</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Weekly Leaderboard</Text>
        {friends.map((friend: any) => (
          <Text key={friend.friend.id} style={styles.text}>{friend.friend.username}</Text>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => router.push('home/leaderboards')}>
          <Text style={styles.text}>View All</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}