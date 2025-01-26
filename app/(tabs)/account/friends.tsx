import { useGetFriends } from '../../../hooks/api/useFriends';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from '@/constants/testStyles';

export default function FriendsScreen() {
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

  const { friends, isLoading, error } = useGetFriends(userId as number);
  console.log('Friends data:', friends);
  const handleFriendPress = (id: string | number) => {
    console.log('Friend ID:', id);
    router.push(`/user/${id}`);
  };
  
  return (
    <ScrollView>

      <View style={styles.section}>
        <Text style={styles.text}>Friends</Text>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          friends.map((friend: any) => (
            <TouchableOpacity style={styles.button}
              key={friend.friend.id}
              onPress={() => handleFriendPress(friend.friend.id)}
            >
              <Text style={styles.text}>
                {friend.friend.first_name} {friend.friend.last_name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}