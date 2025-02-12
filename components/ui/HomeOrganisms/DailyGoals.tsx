import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DailyGoals = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Goals</Text>
      <Text style={styles.viewAll}>View All</Text>
      {/* Example goal */}
      <View style={styles.goalItem}>
        <Text style={styles.goalTitle}>Rise and Shine</Text>
        <Text style={styles.time}>02:00 PM - 03:00 PM</Text>
        <Text style={styles.status}>In Progress</Text>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 14,
    color: "pink",
    textAlign: "right",
  },
  goalItem: {
    padding: 12,
    marginTop: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
});

export default DailyGoals;
