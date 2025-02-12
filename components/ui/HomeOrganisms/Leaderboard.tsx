import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Leaderboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Leaderboard</Text>
      <Text style={styles.viewAll}>View All</Text>

      {/* Example leaderboard item */}
      <View style={styles.rank}>
        <Text style={styles.rankNumber}>1</Text>
        <Text style={styles.userName}>Pedro</Text>
        <Text style={styles.points}>3,645 Pts</Text>
      </View>

      <View style={styles.rank}>
        <Text style={styles.rankNumber}>2</Text>
        <Text style={styles.userName}>Andrew</Text>
        <Text style={styles.points}>3,496 Pts</Text>
      </View>

      <View style={styles.rank}>
        <Text style={styles.rankNumber}>3</Text>
        <Text style={styles.userName}>Freida</Text>
        <Text style={styles.points}>3,178 Pts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 20,
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
  rank: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginTop: 8,
    borderRadius: 8,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 16,
  },
  points: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Leaderboard;