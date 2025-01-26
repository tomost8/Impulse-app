import { router } from 'expo-router';
import { useState } from 'react';
import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useGetPoints, useGetUser } from '@/hooks/api/useUsers';
import { Modal, Portal, Button } from 'react-native-paper';
import PointsModal from '@/components/modals/PointsModal';

export default function AccountScreen() {
  const [userId, setUserId] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
      <TouchableOpacity style={styles.button} onPress={showModal}>
        <Text style={styles.text}>
          Open Modal for Points
        </Text>
      </TouchableOpacity>
      <PointsModal 
        visible={visible} 
        hideModal={hideModal}
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push({ 
          pathname: 'account/redeems', 
          params: { points: points?.points } 
        })}>
        <Text style={styles.text}>
          Redeem
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('account/friends')}>
        <Text style={styles.text}>
          Friends
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Bio: {user.bio}
      </Text>
      <Text style={styles.text}>
        Gender: {user.gender}
      </Text>
      <Text style={styles.text}>
        Timezone: {user.timezone}
      </Text>
      <Text style={styles.text}>
        Primary Goal: {user.primary_goal}
      </Text>
      <Text style={styles.text}>
        Secondary Goal: {user.secondary_goal}
      </Text>
    </View>
  );
}

