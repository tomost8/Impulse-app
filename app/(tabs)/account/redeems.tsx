import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useRouter, useLocalSearchParams } from 'expo-router';
import RedeemsModal from '@/components/modals/RedeemsModal';
import { useGetRewards } from '@/hooks/api/useRewards';
import RedeemButton from '@/components/RedeemButton';
import useUserInfo from '@/hooks/useUserInfo';
import { useGetPoints } from '@/hooks/api/useUsers';

export default function RedeemsScreen() {
  const { userId } = useUserInfo();
  const { points, isLoading: pointsLoading, error: pointsError } = useGetPoints(userId as number);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { rewards, isLoading, error } = useGetRewards();
  console.log('Rewards:', rewards, "points:", points);

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
        <Text style={styles.text}>{points.spending_points} Total Rewards Points</Text>
      </View>
      <View style={styles.section}>
        {rewards.map((reward: any) => (
          <RedeemButton 
            key={reward.id}
            title={reward.title}
            description={reward.description}
            requiredPoints={reward.required_points}
            spendingPoints={Number(points.spending_points)}
            userId={userId as number}
            rewardId={reward.id}
        />
        ))}
      </View>
    </View>
  );
}