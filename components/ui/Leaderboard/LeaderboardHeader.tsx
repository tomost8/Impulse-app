import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// Import the back arrow icon
const backArrow = require("@/assets/icons/backArrow.png");

interface LeaderboardHeaderProps {
  onBackPress: () => void;
}

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({ onBackPress }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Image source={backArrow} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Leaderboard Title */}
      <Text style={styles.title}>Leaderboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 390,
    height: 98,
    backgroundColor: "#E0EDFD", // Matches Figma
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20, // Ensures proper spacing
  },
  backButton: {
    padding: 10, // Adds touchable area
    marginRight: 10, // Space between icon and title
  },
  backIcon: {
    width: 7,
    height: 14,
    tintColor: "#242020", // Dark color from Figma
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#242020", // Dark color
  },
});

export default LeaderboardHeader;
