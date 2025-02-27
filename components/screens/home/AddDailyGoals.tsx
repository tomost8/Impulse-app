import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import Header from "@/components/ui/DailyGoalsViewAll/AddDailyGoals/Header";
import DailyGoalItem from "@/components/ui/CommonComponents/DailyGoalItem";
import ExpandedGoalDetails from "@/components/ui/DailyGoalsViewAll/AddDailyGoals/ExpandedGoalDetails";
import AddGoalButton from "@/components/ui/DailyGoalsViewAll/AddDailyGoals/AddGoalButton";

import workoutIcon from "@/assets/icons/workout.png";
import foodIcon from "@/assets/icons/food.png";
import studyingIcon from "@/assets/icons/studyingworking.png";
import riseshineIcon from "@/assets/icons/riseshine.png";
import passionhobbyIcon from "@/assets/icons/passionhobby.png";
import wellnessIcon from "@/assets/icons/wellness.png";

// Goal Data
const goals = [
    { id: "workout", title: "Workout", icon: workoutIcon },
    { id: "food", title: "Food", icon: foodIcon },
    { id: "studying", title: "Studying / Working", icon: studyingIcon },
    { id: "riseshine", title: "Rise and Shine", icon: riseshineIcon },
    { id: "passionhobby", title: "My Passion/Hobby", icon: passionhobbyIcon },
    { id: "wellness", title: "Wellness", icon: wellnessIcon },
  ];
  
  const AddDailyGoals: React.FC = () => {
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  
    // Handle goal selection (only one goal can be expanded at a time)
    const handleSelectGoal = (goalId: string) => {
        console.log(`🟢 Goal Clicked: ${goalId}`); // Check if click registers
        setSelectedGoal((prev) => {
          console.log(`🔵 Previous Selected: ${prev}, New Selected: ${prev === goalId ? null : goalId}`); // Debug state update
          return prev === goalId ? null : goalId;
        });
      };      
      
    return (
      <View style={styles.container}>
        {/* Header */}
        <Header title = "Add Daily Goals" />
  
        {/* Goals List */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {goals.map((goal) =>
            selectedGoal === goal.id ? (

              <ExpandedGoalDetails
                key={goal.id}
                title={goal.title}
                icon={goal.icon}
                isSelected={selectedGoal === goal.id}
                onSelect={() => {
                    console.log("onSelect triggered for:", goal.title); // ✅ Debug log
                    handleSelectGoal(goal.id);
                  }}
              />
            ) : (
              <DailyGoalItem
                key={goal.id}
                title={goal.title}
                icon={goal.icon}
                isSelected={selectedGoal === goal.id}onSelect={() => {
                    console.log("onSelect triggered for:", goal.title); // ✅ Debug log
                    handleSelectGoal(goal.id);
                  }}onSelect={() => handleSelectGoal(goal.id)}
              />
            )
          )}
        </ScrollView>
  
        {/* Add Goal Button */}
        <AddGoalButton onPress={() => console.log("Goal Added")} />
      </View>
    );
  };
  


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF",
    },
    scrollContainer: {
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    goalContainer: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#E1E1E1",
        padding: 10,
        marginBottom: 20, // Adds more spacing between each goal
        marginTop: 20, // Adds extra space above the first goal
      },
  });
  
  export default AddDailyGoals;