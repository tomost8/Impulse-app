import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import AddGoalButton from "../ui/DailyGoalsViewAll/AddGoalButton"; // ✅ Corrected Import

const DailyGoalsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Add Goal Button */}
      <View style={styles.buttonContainer}>
        <AddGoalButton onPress={() => console.log("Add Goal Pressed!")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Match Figma background
    justifyContent: "flex-end", // Places button at the bottom
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30, // Matches Figma spacing
  },
});

export default DailyGoalsScreen;

