import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

// Import the back arrow icon
const backArrow = require("@/assets/icons/backArrow.png");

interface GoalsHeaderProps {
  onBackPress: () => void;
}

const GoalsHeader: React.FC<GoalsHeaderProps> = ({ onBackPress }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Image source={backArrow} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>View All</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 52, // Matches Figma specs
    backgroundColor: "#E0EDFD", // Background color from Figma
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20, // Matches Figma padding
    paddingTop: 0, // Adjusted for status bar spacing
  },
  backButton: {
    padding: 10, // Enlarges touch area for usability
    marginRight: 5, // Spacing between back button and title
  },
  backIcon: {
    width: 10, // Matches Figma width
    height: 17, // Matches Figma height
    tintColor: "#242020", // Dark color from Figma
    marginLeft: -5,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#242020", // Dark text color
  },
});

export default GoalsHeader;
