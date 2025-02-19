import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LeaderboardSelector from "./LeaderboardSelector"; // ✅ Import selector
import { StatusBar } from "react-native";

// Import the back arrow icon
const backArrow = require("@/assets/icons/backArrow.png");

interface LeaderboardHeaderProps {
  onBackPress: () => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({ onBackPress, selectedOption, setSelectedOption }) => {
    return (
      <View style={styles.container}>
        {/* Left: Back Button & Title */}
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Image source={backArrow} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Leaderboard</Text>
        </View>
  
        {/* Right: Leaderboard Selector */}
        <View style={styles.selectorContainer}>
          <LeaderboardSelector selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: 75, // ✅ Matches Figma
      backgroundColor: "#E0EDFD",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 5,
      justifyContent: "space-between", // ✅ Title stays left, selector goes right
    },
    leftContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1, // ✅ Ensures it occupies only required space
    },
    backButton: {
      padding: 18, // Adds touchable area
      marginRight: 4, // ✅ Space between icon and title
    },
    backIcon: {
      width: 10,
      height: 17,
      tintColor: "#242020",
    },
    title: {
      fontSize: 16,
      fontFamily: "Poppins",
      fontWeight: "600",
      color: "#242020",
    },
    selectorContainer: {
      alignItems: "flex-end", // ✅ Aligns to the right
      justifyContent: "center",
      marginTop: -5,
      marginRight: -10,
    },
  });
  
  export default LeaderboardHeader;
