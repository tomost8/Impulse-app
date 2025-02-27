import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Header from "@/components/ui/DailyGoalsViewAll/AddDailyGoals/Header";
import AddActivityCard from "@/components/ui/common/AddActivityCard";
import AddGoalButton from "@/components/ui/DailyGoalsViewAll/AddDailyGoals/AddGoalButton";
import { goals } from "@/utils/goals"; // Import goals from goals.ts

const AddDailyGoals: React.FC = () => {
  const [selectedGoals, setSelectedGoals] = useState<number[]>([]); // Array of selected goals
  const [expandedGoal, setExpandedGoal] = useState<number | null>(null); // Currently expanded goal
  
  const handleSelectGoal = (goalId: number) => {
    setSelectedGoals((prev) => [...prev, goalId]);
    if (expandedGoal === goalId) {
      setExpandedGoal(null);
    } else {
      setExpandedGoal(goalId);
    }
  };

  const handleCheckIconPress = (goalId: number) => {
    if (expandedGoal === goalId) {
      setExpandedGoal(null);
    }
    setSelectedGoals(prev => prev.filter(id => id !== goalId)); // Remove the goal from selectedGoals
  }
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header/>
  
      {/* Goals List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {goals.map((goal) => (
          <AddActivityCard
            key={goal.id}
            title={goal.label}
            icon={goal.icon}
            isSelected={selectedGoals.includes(goal.id)}
            onSelect={() => handleSelectGoal(goal.id)}
            isExpanded={expandedGoal === goal.id}
            onCheckIconPress={() => handleCheckIconPress(goal.id)}
          />
        ))}
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