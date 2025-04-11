import React from "react";
import { View, StyleSheet } from "react-native";
import Greeting from "./Greeting"; // ✅ Updated import
import StreakTracker from "./StreakTracker"; // ✅ Import StreakTracker component
import StreakBadge from "./StreakBadge"; // ✅ Importing StreakBadge


const TopSectionContainer: React.FC<{ name: string }> = ({ name }) => {
    return (
      <View style={styles.container}>
        {/* Greeting */}
        <Greeting name={name} />
  
        {/* Streak Section */}
        <View style={styles.streakWrapper}>
          <StreakBadge streakCount={72} />
          <StreakTracker />
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 130,
    backgroundColor: "#E0EDFD",
    paddingHorizontal: 15,
    paddingTop: 6,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  streakContainer: {
    alignSelf: "flex-start", // ✅ Aligns to the left as per Figma
  },
  streakSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: 50, // Add explicit height
    backgroundColor: "E0EDFD", // Debugging
    gap: -10, 
    marginTop: 0, 
  },
  streakWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative", // Allows StreakTracker to be positioned inside
    marginTop: -5,
    marginBottom: -10,
  },
});


export default TopSectionContainer;
