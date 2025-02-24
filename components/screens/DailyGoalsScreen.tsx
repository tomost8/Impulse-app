import React from "react";
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from "react-native";
import AddGoalButton from "../ui/DailyGoalsViewAll/AddGoalButton"; // ✅ Corrected Import
import GoalsHeader from "../ui/DailyGoalsViewAll/GoalsHeader"; // ✅ Added GoalsHeader
import GoalsList from "../ui/DailyGoalsViewAll/GoalsList"; // ✅ Added GoalsList
import { router } from "expo-router";

interface DailyGoalsScreenProps {
  activities: any[];
  isActivitiesLoading: boolean;
}
  
const DailyGoalsScreen: React.FC<DailyGoalsScreenProps> = ({ activities, isActivitiesLoading }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <GoalsHeader onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Section Title - "Goals for the Day" */}
        <Text style={styles.sectionTitle}>Goals for the Day</Text>

        {/* Goals List */}
        <View style={styles.activitiesContainer}>
          <GoalsList/> {/* ✅ Displays all daily goals */}
        </View>
      </ScrollView>

      {/* Add Goal Button */}
      <View style={styles.buttonContainer}>
        <AddGoalButton onPress={() => router.push("/home/activityAdd")} />
      </View>
    </SafeAreaView>
  );
};
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#FFFFFF", // Match Figma background
    },
    scrollContent: {
      flexGrow: 1, // Allows content to be scrollable
      paddingBottom: 30, // Matches Figma spacing
    },
    buttonContainer: {
      paddingHorizontal: 20,
      paddingBottom: 30, // Matches Figma spacing
      alignSelf: "center",
      width: "100%",
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: "Poppins",
      fontWeight: "600",
      color: "#242020", // Dark color from Figma
      marginTop: 20, // Adjust spacing as per Figma
      paddingLeft: 25,
    },
    activitiesContainer: {
      marginTop: 0, // Space below the section title
    },
  });
  
  export default DailyGoalsScreen;
  