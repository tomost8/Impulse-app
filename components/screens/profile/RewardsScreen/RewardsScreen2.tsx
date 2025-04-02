import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { s } from "react-native-size-matters";
import Header from "./Header";
import PointsDisplay from "./PointsDisplay";
import RewardItem from "./RewardItem";
import RedeemRewardPopup from "../popups/RedeemRewardPopup";

const rewardsData = [
  {
    id: 1,
    title: "$10 Payment via PayPal or Gift Card",
    points: "7.5k Points",
    isRedeemable: true,
  },
  {
    id: 2,
    title: "$25 Payment via PayPal or Gift Card",
    points: "15k Points",
    isRedeemable: false,
  },
  {
    id: 3,
    title: "$50 Payment via PayPal or Gift Card",
    points: "25k Points",
    isRedeemable: false,
  },
];

interface RewardsScreenProps {
  user: any;
  isUserLoading: boolean;
  rewards: any;
  isRewardsLoading: boolean;
  handleCreateRedeem: (rewardId: number) => void;
  isCreatingRedeem: boolean;
}

const RewardsScreen: React.FC<RewardsScreenProps> = ({ 
  user, 
  isUserLoading 
}) => {
  const [showRedeemPopup, setShowRedeemPopup] = useState(false);
  const [selectedReward, setSelectedReward] = useState<typeof rewardsData[0] | null>(null);

  const handleRedeemPress = (reward: typeof rewardsData[0]) => {
    setSelectedReward(reward);
    setShowRedeemPopup(true);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Header />
      <View style={styles.content}>
        <PointsDisplay points={9205} maxPoints={15000} />
        <View style={styles.rewardsList}>
          {rewardsData.map((reward) => (
            <RewardItem
              key={reward.id}
              title={reward.title}
              points={reward.points}
              isRedeemable={reward.isRedeemable}
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
