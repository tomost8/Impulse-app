import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import LeaderboardHeader from "@/components/ui/Leaderboard/LeaderboardHeader";
import LeaderboardPodium from "@/components/ui/Leaderboard/LeaderboardPodium";
import LeaderboardList from "@/components/ui/Leaderboard/LeaderboardList";
import LeaderboardTabs from "@/components/ui/Leaderboard/LeaderboardTabs";

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
  { rank: 6, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
  { rank: 7, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
  { rank: 8, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
  { rank: 9, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
];

// Dummy Data for Global Leaderboard
const globalLeaderboard = [
  { rank: 4, name: "Michael", points: 900, profileImage: AndrewProfile },
  { rank: 5, name: "Sophia", points: 850, profileImage: AndrewProfile },
];

const LeaderboardScreen: React.FC = () => {
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
          {/*
          <View style={styles.tabsContainer}>
            <LeaderboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </View>
          */}
  
          {/* Podium */}
          <View style={styles.podiumContainer}>
            <LeaderboardPodium podiumData={podiumUsers} />
          </View>
  
          {/* Conditional Leaderboard List */}
          <View style={styles.listContainer}>
            <LeaderboardList users={friendsLeaderboard} />
          </View>
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
      flexGrow: 1,
    },
    podiumContainer: {
      paddingHorizontal: 10, // Reduced horizontal padding
      marginTop: 20,
    },
    listContainer: {
      paddingHorizontal: 5, // Reduced horizontal padding
      marginTop: 20,
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