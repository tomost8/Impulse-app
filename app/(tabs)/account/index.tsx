import { router } from 'expo-router';
import { useState } from 'react';
import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useGetPoints, useGetUser } from '@/hooks/api/useUsers';

export default function AccountScreen() {
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

  const { user, isLoading: userLoading, error: userError } = useGetUser(userId as number);
  const { points, isLoading: pointsLoading, error: pointsError } = useGetPoints(userId as number);
  if (userId !== null) {
    console.log('User data:', user);
    console.log('Points data:', points);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings')}>
          <Text style={styles.text}>
              Settings
          </Text>
      </TouchableOpacity>
      <Text style={styles.text}>
          Profile Picture: {user.profile_picture}
      </Text>
      <Text style={styles.text}>
          First Name: {user.first_name}
      </Text>
      <Text style={styles.text}>
          Username: {user.username}
      </Text>
      <Text style={styles.text}>
          Points: {points.points}
      </Text>
      <Text style={styles.todoText}>
          Todo: add points modal + redeem button
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('account/friends')}>
          <Text style={styles.text}>
              Friends
          </Text>
      </TouchableOpacity>
      <Text style={styles.todoText}>
          Todo: fetch bio
      </Text>
      <Text style={styles.text}>
          Gender: {user.gender}
      </Text>
      <Text style={styles.text}>
          Timezone: {user.timezone}
      </Text>
      <Text style={styles.todoText}>
          Todo: fetch primary + secondary goal (preferences)
      </Text>
    </View>
  );
}

