import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import LeaderboardPodium from "../LeaderboardPodium";
import LeaderboardList from "./LeaderboardList";

interface LeaderboardFullProps {
  users: any[];
  isUsersLoading: boolean;
}

const LeaderboardFull: React.FC<LeaderboardFullProps> = ({ users, isUsersLoading }) => {
  const podiumUsers = users.slice(0, 3);
  const listUsers = users.slice(3, 10);
  return (
    <View style={styles.container}>
      
      {/* Leaderboard Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Leaderboard</Text>
        <TouchableOpacity onPress={() => router.push('/home/leaderboards')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <LeaderboardPodium podiumData={podiumUsers} />
      
      {/* Leaderboard List (Ranks 4+) */}
      {listUsers.length > 0 && (
        <LeaderboardList users={listUsers} />
      )}
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
    gap: 112,
    width: 340, // ✅ Matches leaderboard width
    marginBottom: 10, // ✅ Adds spacing before leaderboard
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
});

export default LeaderboardFull;
