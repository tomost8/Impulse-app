import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ActivityCard from "./cards/ActivityCard";
import EmptyActivitiesState from "./EmptyActivitiesState";
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
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Daily Goals</Text>
        <TouchableOpacity onPress={() => {router.push('/home/viewActivity')}}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content: Activity Cards */}
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
        // No activities, display empty state
        <View style={styles.addGoalContainer}>
          <EmptyActivitiesState />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Section Container + Header
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Poppins",
    color: "#242020",
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Poppins",
    color: "#DE728D",
    textDecorationLine: "underline",
  },
  // Main Content
  addGoalContainer: {
    marginTop: 12, // Add some space between the cards and the add box
    alignSelf: "stretch", // Ensures it spans full width
    alignItems: "center", // Centers content properly
    marginLeft: -3,
  },
});

export default ActivitiesSection;
