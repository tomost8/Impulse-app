import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserOverview = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Looking good, <Text style={styles.bold}>Gabriel!</Text>
      </Text>
      <View style={styles.streakTracker}>
        <Text style={styles.streakNumber}>72</Text>
        <Text style={styles.streakLabel}>Day Streak</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#E8F1FF",
    borderRadius: 12,
    alignItems: "center",
  },
  greeting: {
    fontSize: 18,
  },
  bold: {
    fontWeight: "bold",
  },
  streakTracker: {
    marginTop: 10,
    alignItems: "center",
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  streakLabel: {
    fontSize: 14,
  },
});

export default UserOverview;
