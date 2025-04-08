import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { s } from "react-native-size-matters";
import Header from "./Header";
import PointsDisplay from "./PointsDisplay";
import RewardItem from "./RewardItem";
import RedeemRewardPopup from "../popups/RedeemRewardPopup";

interface RewardsScreenProps {
  loading: boolean;
  userPoints: number;
  rewards: any;
  handleCreateRedeem: (rewardId: number) => void;
}

const RewardsScreen: React.FC<RewardsScreenProps> = ({ 
  loading,
  userPoints, 
  rewards,
  handleCreateRedeem,
}) => {
  if (loading) {
    return <Text>Loading...</Text>;
  }
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [showRedeemPopup, setShowRedeemPopup] = useState(false);

  const handleRedeemPress = (reward: any) => {
    setSelectedReward(reward);
    setShowRedeemPopup(true);
    console.log("selected reward", selectedReward, "reward", reward);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Header />
      <View style={styles.content}>
        <PointsDisplay points={userPoints} />
        <View style={styles.rewardsList}>
          {rewards.map((reward: any) => (
            <RewardItem
              key={reward.id}
              title={reward.title}
              points={reward.required_points}
              isRedeemable={userPoints >= reward.required_points}
              onRedeem={() => handleRedeemPress(reward)}
            />
          ))}
        </View>
      </View>

      {showRedeemPopup && selectedReward && (
        <RedeemRewardPopup
          isVisible={showRedeemPopup}
          onClose={() => setShowRedeemPopup(false)}
          reward={selectedReward}
          handleCreateRedeem={handleCreateRedeem}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingTop: s(20),
  },
  rewardsList: {
    paddingHorizontal: s(20),
    marginTop: s(20),
  },
});

export default RewardsScreen;
