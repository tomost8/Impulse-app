import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Header from "./Header";
import PointsDisplay from "./PointsDisplay";
import RewardItem from "./RewardItem";

const rewardsData = [
  {
    title: "$10 Payment via PayPal or Gift Card",
    points: "7.5k Points",
    isRedeemable: true,
  },
  {
    title: "$25 Payment via PayPal or Gift Card",
    points: "15k Points",
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

const RewardsScreen: React.FC<RewardsScreenProps> = ({ user, isUserLoading, rewards, isRewardsLoading, handleCreateRedeem, isCreatingRedeem }) => {
  console.log("User: ", user, "\nRewards: ", rewards);
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.container} 
      //accessibilityRole="main"
      >
        <Header />
        <View style={styles.content}>
          <PointsDisplay points={9205} maxPoints={15000} />
          <View style={styles.rewardsList}>
            {rewardsData.map((reward, index) => (
              <RewardItem
                key={index}
                title={reward.title}
                points={reward.points}
                isRedeemable={reward.isRedeemable}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    borderRadius: 30,
    maxWidth: 480,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
  },
  content: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 350,
    marginTop: -29,
    zIndex: 10,
  },
  rewardsList: {
    marginTop: 36,
  },
});

export default RewardsScreen;
