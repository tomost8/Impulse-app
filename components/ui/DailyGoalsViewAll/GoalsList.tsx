import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import DailyGoals from "./DailyGoals"; // Import the updated DailyGoals component
import { router } from "expo-router";

// Dummy Data for Daily Goals (Replace with API data later)
const dailyGoalsData = [
  {
    id: "1",
    title: "Rise and Shine",
    timeRange: "02:00 PM to 03:00 PM",
    description: "Activity Description: text text text text text text text text text text text",
  },
  {
    id: "2",
    title: "Exercise",
    timeRange: "06:30 AM to 07:00 AM",
    description: "Morning workout session to start the day strong.",
  },
  {
    id: "3",
    title: "Read a Book",
    timeRange: "08:00 PM to 09:00 PM",
    description: "Read 20 pages of a personal development book.",
  },
];

interface GoalsListProps {
  onEditClick: (goal: { id: string; title: string; icon: any }) => void;
  editingGoalId?: string;
}

// Goals List Component
const GoalsList: React.FC<GoalsListProps> = ({ onEditClick, editingGoalId }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dailyGoalsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.goalItem,
            editingGoalId === item.id && styles.hiddenGoal
          ]}>
            <DailyGoals
              title={item.title}
              timeRange={item.timeRange}
              description={item.description}
              onEditPress={() => onEditClick({
                id: item.id,
                title: item.title,
                icon: require("@/assets/icons/riseshine.png")
              })}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  listContent: {
    paddingBottom: 20, // Prevents cutoff at bottom
  },
  goalItem: {
    opacity: 1,
  },
  hiddenGoal: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
  },
});

export default GoalsList;

