import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/constants/testStyles';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useGetUser } from '@/hooks/api/useUsers';

export default function ProfileScreen() {
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
  if (userId !== null) {
    console.log('User data:', user);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
          Profile Picture: {user.profile_picture}
      </Text>
      <Text style={styles.text}>
          Email: {user.email}
      </Text>
      <Text style={styles.text}>
          First Name: {user.first_name}
      </Text>
      <Text style={styles.text}>
          Last Name: {user.last_name}
      </Text>
      <Text style={styles.text}>
          Username: {user.username}
      </Text>
      <Text style={styles.text}>
          Age: {user.dob}
      </Text>
      <Text style={styles.text}>
          Gender: {user.gender}
      </Text>
      <Text style={styles.text}>
          Timezone: {user.timezone}
      </Text>
      <Text style={styles.todoText}>
          Todo: fetch bio
      </Text>
      <Text style={styles.todoText}>
          Todo: fetch primary + secondary goal (preferences)
      </Text>
    </View>
  );
}

