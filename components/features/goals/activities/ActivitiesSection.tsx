import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ActivityCard from "./ActivityCard";
import AddDailyGoalsBox from "./AddDailyGoalsBox";
import { router } from "expo-router";

interface ActivitiesSectionProps {
  activities: any[];
  timezone: string;
}

const ActivitiesSection = ({ activities, timezone }: ActivitiesSectionProps) => {
  // Sort activities: in-progress first, then completed
  const sortedActivities = [...activities].sort((a, b) => {
    const aIsPending = a.status.toLowerCase() === 'pending';
    const bIsPending = b.status.toLowerCase() === 'pending';
    
    // If one is pending and the other isn't, pending comes first
    if (aIsPending && !bIsPending) return -1;
    if (!aIsPending && bIsPending) return 1;
    
    // If both have the same status, maintain original order
    return 0;
  });

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
        sortedActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            category={activity.category}
            scheduledDatetime={activity.scheduledDatetime}
            duration={activity.duration}
            status={activity.status}
            description={activity.description}
            timezone={timezone}
            isOwnProfile={true}
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
    marginLeft: 8,
  },
  viewAll: {
    fontSize: 14,
    color: "#DE728D",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginRight: 6, 
  },
  addGoalContainer: {
    marginTop: 12, // Add some space between the cards and the add box
    alignSelf: "stretch", // Ensures it spans full width
    alignItems: "center", // Centers content properly
    marginLeft: -3,
  },
});

export default ActivitiesSection;
