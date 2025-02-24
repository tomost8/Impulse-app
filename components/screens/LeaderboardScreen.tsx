import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import LeaderboardHeader from "../ui/Leaderboard/LeaderboardHeader";
import LeaderboardPodium from "../ui/Leaderboard/LeaderboardPodium";
import LeaderboardList from "../ui/Leaderboard/LeaderboardList";
import LeaderboardTabs from "../ui/Leaderboard/LeaderboardTabs";

import { router } from "expo-router";

// Import Andrew's image as a placeholder (for all profile images)
const AndrewProfile = require("@/assets/images/andrew.png");

// Dummy Data for Podium (Top 3 Users)
const podiumUsers = [
  { position: 1, name: "Pedro", points: 3645, profileImage: AndrewProfile },
  { position: 2, name: "Andrew", points: 3496, profileImage: AndrewProfile },
  { position: 3, name: "Freida", points: 3178, profileImage: AndrewProfile },
];

// Dummy Data for Friends Leaderboard
const friendsLeaderboard = [
  { rank: 4, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
  { rank: 5, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
];

// Dummy Data for Global Leaderboard
const globalLeaderboard = [
  { rank: 4, name: "Michael", points: 900, profileImage: AndrewProfile },
  { rank: 5, name: "Sophia", points: 850, profileImage: AndrewProfile },
];

const LeaderboardScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"Friends" | "All Users">("Friends");
    const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header + Leaderboard Selector */}
          <LeaderboardHeader
            onBackPress={() => router.back()}
            selectedOption={selectedPeriod}
            setSelectedOption={setSelectedPeriod}
          />
  
          {/* Tabs Section - Fixing Alignment */}
          <View style={styles.tabsContainer}>
            <LeaderboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </View>
  
          {/* Podium */}
          <LeaderboardPodium podiumData={podiumUsers} />
  
          {/* Conditional Leaderboard List */}
          {activeTab === "Friends" ? (
            <LeaderboardList users={friendsLeaderboard} />
          ) : (
            <LeaderboardList users={globalLeaderboard} />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F8F8",
    },
    scrollContent: {
      paddingBottom: 20, // Prevents cutoff
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 10, // Adjust spacing as needed
      },
  });
  
  export default LeaderboardScreen;