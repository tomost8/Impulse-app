import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface RewardsScreenProps {
  user: any;
  isUserLoading: boolean;
  rewards: any;
  isRewardsLoading: boolean;
  handleCreateRedeem: (rewardId: number) => void;
  isCreatingRedeem: boolean;
}

const RewardsScreen: React.FC<RewardsScreenProps> = ({ user, isUserLoading, rewards, isRewardsLoading, handleCreateRedeem, isCreatingRedeem }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  if (isUserLoading || isRewardsLoading || isCreatingRedeem) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>9:41</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.redeemHeader}>
          <Image
            accessibilityLabel="Redeem icon"
            resizeMode="contain"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/4d39bc5daaab98a3b68dd2a2f8fd26aa7a5b1d303d27ca2e808a9c44a919bdac?placeholderIfAbsent=true&apiKey=ea4b1df1a7464c4cadfa7bc5641e7e40",
            }}
            style={styles.redeemIcon}
          />
          <Text style={styles.redeemText}>Redeem</Text>
        </View>
        <View style={styles.pointsContainer}>
          <View style={styles.pointsCircle}>
            <Text style={styles.pointsValue}>9,205</Text>
            <Text style={styles.pointsLabel}>Rewards Points</Text>
          </View>
          <Text style={styles.pointsProgress}>9,205 / 15,000 pts</Text>
        </View>
        <View style={styles.rewardsContainer}>
          <TouchableOpacity
            style={styles.rewardCard}
            accessibilityRole="button"
            onPress={() => console.log("Redeem Reward")}
          >
            <View>
              <Text style={styles.rewardTitle}>
                $10 Payment via PayPal or Gift Card
              </Text>
              <Text style={styles.rewardPoints}>7.5k Points</Text>
            </View>
            <View style={styles.redeemButton}>
              <Text style={styles.redeemButtonText}>Redeem</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rewardCard}
            accessibilityRole="button"
            onPress={() => console.log("Redeem Reward")}
          >
            <View>
              <Text style={styles.rewardTitle}>
                $25 Payment via PayPal or Gift Card
              </Text>
              <Text style={styles.rewardPoints}>15k Points</Text>
            </View>
            <View style={styles.redeemButton}>
              <Text style={styles.redeemButtonText}>Redeem</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.analyticsButton}
        accessibilityRole="button"
      >
        <Image
          accessibilityLabel="Analytics icon"
          resizeMode="contain"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/82b7401f00ad8f44f6b4d44268d2e6e171efcdbae999b6529affbce72e142a16?placeholderIfAbsent=true&apiKey=ea4b1df1a7464c4cadfa7bc5641e7e40",
          }}
          style={styles.analyticsIcon}
        />
        <Text style={styles.analyticsText}>Analytics</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    overflow: "hidden",
  },
  header: {
    width: "100%",
    paddingVertical: 11,
    paddingHorizontal: 37,
  },
  headerText: {
    fontFamily: "SF Pro Text",
    fontSize: 17,
    color: "#242020",
    fontWeight: "600",
    textAlign: "center",
  },
  content: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 350,
    paddingTop: 20,
  },
  redeemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 36,
  },
  redeemIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  redeemText: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "rgba(68, 68, 68, 1)",
    fontWeight: "600",
  },
  pointsContainer: {
    alignItems: "center",
    marginBottom: 36,
  },
  pointsCircle: {
    width: 226,
    height: 226,
    borderRadius: 113,
    backgroundColor: "rgba(222, 114, 141, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  pointsValue: {
    fontFamily: "Open Sans",
    fontSize: 55,
    color: "rgba(222, 114, 141, 1)",
    fontWeight: "700",
  },
  pointsLabel: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "rgba(222, 114, 141, 1)",
    fontWeight: "500",
    marginTop: 5,
  },
  pointsProgress: {
    fontFamily: "Open Sans",
    fontSize: 10,
    color: "rgba(143, 143, 143, 1)",
    marginTop: 12,
  },
  rewardsContainer: {
    width: "100%",
  },
  rewardCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  rewardTitle: {
    fontFamily: "Open Sans",
    fontSize: 16,
    color: "rgba(36, 32, 32, 1)",
    fontWeight: "600",
  },
  rewardPoints: {
    fontFamily: "Open Sans",
    fontSize: 14,
    color: "rgba(0, 0, 0, 1)",
    marginTop: 10,
  },
  redeemButton: {
    backgroundColor: "rgba(222, 114, 141, 1)",
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 15,
  },
  redeemButtonText: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "600",
  },
  analyticsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(222, 114, 141, 0.1)",
    paddingVertical: 15,
    marginTop: 22,
  },
  analyticsIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  analyticsText: {
    fontFamily: "Open Sans",
    fontSize: 14,
    color: "rgba(222, 114, 141, 1)",
    fontWeight: "600",
  },
});

export default RewardsScreen;
