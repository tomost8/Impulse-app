import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LeaderboardCard from "./LeaderboardCard";
import LeaderboardList from "./LeaderboardList";

const LeaderboardFull: React.FC = () => {
  return (
    <View style={styles.container}>
      
      {/* Leaderboard Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Leaderboard</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Leaderboard Card with Podium */}
      <LeaderboardCard />
      
      {/* Leaderboard List (Ranks 4-6) */}
      <LeaderboardList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10, // ✅ Ensures spacing from bottom navigation
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    gap: 107,
    width: 330, // ✅ Matches leaderboard width
    marginBottom: 10, // ✅ Adds spacing before leaderboard
  },
  title: {
    fontSize: 17,
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
});

export default LeaderboardFull;
