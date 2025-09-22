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
      {/* Header Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Weekly Leaderboard</Text>
        <TouchableOpacity onPress={() => router.push('/home/leaderboards')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content: Leaderboard */}
      <View style={styles.leaderboardContent}>
        <LeaderboardPodium podiumData={podiumUsers} selectedPeriod="POINTS_WEEKLY" />
        {/* Leaderboard List (Ranks 4+) */}
        {listUsers.length > 0 && (
          <LeaderboardList users={listUsers} />
        )}
      </View>
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
  leaderboardContent: {
    alignItems: "center",
    width: "100%",
  },
});

export default LeaderboardFull;
