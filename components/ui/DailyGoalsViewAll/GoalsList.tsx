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

// Goals List Component
const GoalsList: React.FC = () => {
  // Function to handle edit button press
  const handleEditGoal = (goalId: string) => {
    router.push(`/home/activityView/${goalId}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dailyGoalsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DailyGoals
            title={item.title}
            timeRange={item.timeRange}
            description={item.description}
            onEditPress={() => handleEditGoal(item.id)}
          />
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
});

export default GoalsList;

