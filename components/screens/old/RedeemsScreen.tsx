import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import RedeemsModal from '@/components/modals/RedeemsModal';
import RedeemButton from '@/components/RedeemButton';

export default function RedeemsScreenOld({ 
  user, 
  isUserLoading,
  rewards, 
  isRewardsLoading,
  handleCreateRedeem,
  isCreatingRedeem
}: { 
  user: any; 
  isUserLoading: boolean;
  rewards: any;
  isRewardsLoading: boolean;
  handleCreateRedeem: (rewardId: number) => void;
  isCreatingRedeem: boolean;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  if (isUserLoading || isRewardsLoading || isCreatingRedeem) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showModal}>
      <Text style={styles.text}>
        Open Modal for Redeems
      </Text>
    </TouchableOpacity>
    <RedeemsModal 
      visible={modalVisible} 
      hideModal={hideModal}
    />
    <View style={styles.section}>
      <Text style={styles.text}>{user.point.spending_points} Total Rewards Points</Text>
    </View>
    <View style={styles.section}>
      {rewards.map((reward: any) => (
        <RedeemButton 
          key={reward.id}
          title={reward.title}
          description={reward.description}
          requiredPoints={reward.required_points}
          spendingPoints={Number(user.point.spending_points)}
          rewardId={reward.id}
          handleCreateRedeem={handleCreateRedeem}
          isCreatingRedeem={isCreatingRedeem}
        />
        ))}
      </View>
    </View>
  );
}