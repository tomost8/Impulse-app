import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const StreakBadge: React.FC<{ streakCount: number }> = ({ streakCount }) => {
  return (
    <View style={styles.container}>
      {/* Background Circle */}
      <Image source={require("@/assets/icons/streakIconWhite.png")} style={styles.backgroundCircle} />

      {/* Fire Icon */}
      <Image source={require("@/assets/icons/streakFireNew.png")} style={styles.fireIcon} />

      {/* Streak Count */}
      <Text style={styles.streakCount}>{streakCount}</Text>

      {/* "Day Streak" Text */}
      <Text style={styles.streakText}>Day Streak</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2, 
  },
  backgroundCircle: {
    position: "absolute",
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  fireIcon: {
    position: "absolute",
    width: 75,
    height: 65,
    resizeMode: "contain",
  },
  streakCount: {
    position: "absolute",
    fontSize: 21,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "#CC750E", // Stroke effect
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    lineHeight: 22, 
  },
  streakText: {
    position: "absolute",
    bottom: 17,
    fontSize: 6,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "#CC750E",
    textShadowOffset: { width: 0.8, height: 0.8 },
    textShadowRadius: 0.8,
  },
});

export default StreakBadge;
