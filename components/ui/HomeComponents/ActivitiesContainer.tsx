import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DailyGoalCard from "../common/ActivityCard";
import AddDailyGoalsBox from "./AddDailyGoalsBox";
import { router } from "expo-router";

interface DailyGoalsProps {
  activities: any[];
  timezone: string;
}

const DailyGoals = ({ activities, timezone }: DailyGoalsProps) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Daily Goals</Text>
        <TouchableOpacity onPress={() => {router.push('/home/viewActivity')}}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Goals Cards */}
      {activities.length > 0 ? (
        activities.map((activity) => (
          <DailyGoalCard
            key={activity.id}
            category={activity.category}
            scheduledDatetime={activity.scheduledDatetime}
            duration={activity.duration}
            status={activity.status}
            description={activity.description}
            timezone={timezone}
          />
        ))
      ) : (
        <View style={styles.addGoalContainer}>
          <AddDailyGoalsBox />
        </View>
      )}
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
    marginTop: 10, // Add some space between the cards and the add box
    alignSelf: "stretch", // Ensures it spans full width
    alignItems: "center", // Centers content properly
    marginLeft: -3,
  },
});

export default DailyGoals;
