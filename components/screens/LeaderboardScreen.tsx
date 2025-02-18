import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"; // ✅ Added for navigation
import LeaderboardHeader from "../ui/Leaderboard/LeaderboardHeader";
import LeaderboardPodium from "../ui/Leaderboard/LeaderboardPodium";
import LeaderboardList from "../ui/Leaderboard/LeaderboardList";


// Import Andrew's image as a placeholder (for all profile images)
const AndrewProfile = require("@/assets/images/andrew.png");

// Dummy Data for Podium (Top 3 Users)
const podiumUsers = [
  { position: 1, name: "Pedro", points: 3645, profileImage: AndrewProfile },
  { position: 2, name: "Andrew", points: 3496, profileImage: AndrewProfile },
  { position: 3, name: "Freida", points: 3178, profileImage: AndrewProfile },
];

// Dummy Data for Leaderboard List (Ranks 4 - 10)
const leaderboardUsers = [
  { rank: 4, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
  { rank: 5, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
  { rank: 6, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
  { rank: 7, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
  { rank: 8, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
  { rank: 9, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
  { rank: 10, name: "Rodrigo", points: 800, profileImage: AndrewProfile },
];

/*
const LeaderboardScreen: React.FC = () => {
    const navigation = useNavigation(); // ✅ Allows navigation back
}
*/

const LeaderboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Friends"); // Track active leaderboard (Friends or All Users)

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section: DON'T WORRY ABOUT THIS FOR NOW, WE WILL TRY TO HANDLE THIS WITH EXPO ROUTING HEADERS */}
        {/*<LeaderboardHeader />*/}

        {/* Toggle Tabs (Friends / All Users) */}
        {/*<LeaderboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />*/}

        {/* Podium (Top 3 Users) */}
        <LeaderboardPodium podiumData={podiumUsers} />

        {/* List (4th - 10th place users) */}
        <LeaderboardList users={leaderboardUsers} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8", // Match the leaderboard background
  },
  scrollContent: {
    paddingBottom: 50, // Prevents bottom cutoff when scrolling
  },
});

export default LeaderboardScreen;