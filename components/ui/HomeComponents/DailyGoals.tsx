import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DailyGoalCard from "../CommonComponents/DailyGoalCard";
import AddDailyGoalsBox from "./AddDailyGoalsBox";
import { router } from "expo-router";

interface DailyGoalsProps {
  activities: any[];
  isActivitiesLoading: boolean;
}

const DailyGoals = ({ activities, isActivitiesLoading }: DailyGoalsProps) => {
  console.log(activities);
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Daily Goals</Text>
        <TouchableOpacity onPress={() => {router.push('/home/activityView')}}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Goals Cards */}
      {activities.map((activity) => (
        <DailyGoalCard
          key={activity.id}
          title={activity.category}
          timeRange={activity.createdAt}
          status={activity.status}
          description={activity.description}
        />
      ))}

      {/* Example Goal */}
      <DailyGoalCard
        title="Rise and Shine"
        timeRange="02:00 PM to 03:00 PM"
        status="In Progress"
        description="activity description: test test test"
      />

      {/* Add Daily Goals Box */}
      <View style={styles.addGoalContainer}>
        <AddDailyGoalsBox />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 14,
    color: "#DE728D",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  addGoalContainer: {
    marginTop: 20, // Add some space between the cards and the add box
    alignSelf: "stretch", // Ensures it spans full width
    alignItems: "center", // Centers content properly
    marginLeft: -14,
  },
});

export default DailyGoals;
