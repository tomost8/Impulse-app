import React from "react";
import { View, StyleSheet } from "react-native";
import LeaderboardProfile from "./LeaderboardProfile";
import LeaderboardPodium from "./LeaderboardPodium";

const LeaderboardCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topProfiles}>
        {/* ✅ Fixed: Using require() directly instead of import */}
        <LeaderboardProfile name="Andrew" points="3,496" imageUrl={require("@/assets/images/andrew.png")} rank={2} />
        <LeaderboardProfile name="Pedro" points="3,645" imageUrl={require("@/assets/images/andrew.png")} rank={1} />
        <LeaderboardProfile name="Freida" points="3,178" imageUrl={require("@/assets/images/andrew.png")} rank={3} />
      </View>

      <View style={styles.podiumContainer}>
        <LeaderboardPodium position={2} />
        <LeaderboardPodium position={1} />
        <LeaderboardPodium position={3} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 348,
    height: 260,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    paddingTop: 28,
    paddingLeft: 3.2,
    paddingRight: 3.2,
    alignItems: "center",
  },
  
  topProfiles: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },

  podiumContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

export default LeaderboardCard;
