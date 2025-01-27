import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUsersLeaderboard } from '@/hooks/api/useUsers';


export default function LeaderboardsScreen() {
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

  const [activeView, setActiveView] = useState<'weekly' | 'monthly' | 'all'>('weekly');
  
  const { users, isLoading, error } = useGetUsersLeaderboard('POINTS_WEEKLY');
  if (userId !== null) {
    console.log('Users leaderboard data:', users);
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Leaderboards</Text>
      </View>
    </View>
  );
}