import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useRouter, useLocalSearchParams } from 'expo-router';
import RedeemsModal from '@/components/modals/RedeemsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetRewards } from '@/hooks/api/useRewards';

export default function RedeemsScreen() {
    const { points } = useLocalSearchParams();

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

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

  const { rewards, isLoading, error } = useGetRewards();
  console.log('Rewards:', rewards);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (points < rewards[0].required_points) {
        setIsButtonDisabled(true);
    } else {
        setIsButtonDisabled(false);
    }
  }, [rewards]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showModal}>
        <Text style={styles.text}>
          Open Modal for Redeems
        </Text>
      </TouchableOpacity>
      <RedeemsModal 
        visible={visible} 
        hideModal={hideModal}
      />
      <View style={styles.section}>
        <Text style={styles.text}>{points} Total Rewards Points</Text>
      </View>
      <View style={styles.section}>
        {rewards.map((reward: any) => (
            <View key={reward.id} style={styles.section}>
                <Text style={styles.text}>{reward.required_points} Reward Points Redemption</Text>
                <Text style={styles.text}>{reward.title}, {reward.description}</Text>
                <TouchableOpacity 
                    style={[styles.button, isButtonDisabled && { opacity: 0.5 }]}
                    onPress={() => !isButtonDisabled && console.log('Redeem')}
                    disabled={isButtonDisabled}
                >
                    <Text style={styles.todoText}>TODO: Redeem</Text>
                </TouchableOpacity>
            </View>
        ))}
      </View>
      <Text>Your Points: {points}</Text>
    </View>
  );
}