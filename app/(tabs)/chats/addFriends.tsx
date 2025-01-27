import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Searchbar } from 'react-native-paper';


export default function AddFriendsScreen() {
  const [userId, setUserId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Searchbar
          placeholder="Search username"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
        <Text style={styles.text}>We get all users and display image + name + add friend button</Text>
      </View>
    </View>
  );
}