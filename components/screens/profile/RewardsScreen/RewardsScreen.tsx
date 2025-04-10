import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import { s } from "react-native-size-matters";
import { useRouter } from "expo-router";
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
  const router = useRouter();

  const handleRedeemPress = (reward: any) => {
    setSelectedReward(reward);
    setShowRedeemPopup(true);
    console.log("selected reward", selectedReward, "reward", reward);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Image 
                source={require("@/assets/icons/backArrow.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Redeem</Text>
          </View>
        </SafeAreaView>
      </View>
    <ScrollView style={styles.scrollView}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    backgroundColor: '#E0EDFD',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 12,
  },
  backIcon: {
    width: 10,
    height: 15,
    tintColor: '#242020',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
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
