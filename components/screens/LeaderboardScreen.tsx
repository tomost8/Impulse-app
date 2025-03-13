import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import LeaderboardHeader from "../ui/Leaderboard/LeaderboardHeader";
import LeaderboardPodium from "../ui/Leaderboard/LeaderboardPodium";
import LeaderboardList from "../ui/Leaderboard/LeaderboardList";
import LeaderboardTabs from "../ui/Leaderboard/LeaderboardTabs";

import { router } from "expo-router";

type LeaderboardPeriod = 'POINTS_WEEKLY' | 'POINTS_MONTHLY' | 'POINTS_ALL';

interface LeaderboardScreenProps {
  isLoading: boolean;
  allLeaderboard: any[];
  friendsLeaderboard: any[];
  selectedPeriod: LeaderboardPeriod;
  setSelectedPeriod: (period: LeaderboardPeriod) => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ isLoading, allLeaderboard, friendsLeaderboard, selectedPeriod, setSelectedPeriod }) => {
    const [activeTab, setActiveTab] = useState<"Friends" | "All Users">("Friends");
    if (isLoading) {
        return <Text>Loading...</Text>;
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header + Leaderboard Selector */}
          <LeaderboardHeader
            onBackPress={() => router.back()}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
  
          {/* Tabs Section - Fixing Alignment */}
          <View>
            <LeaderboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </View>
  
          {/* Podium */}
          {activeTab === "Friends" ? (
            <LeaderboardPodium podiumData={friendsLeaderboard.slice(0, 3)} />
          ) : (
            <LeaderboardPodium podiumData={allLeaderboard.slice(0, 3)} />
          )}
  
          {/* Conditional Leaderboard List */}
          {activeTab === "Friends" ? (
            <LeaderboardList leaderboardData={friendsLeaderboard.slice(3)} />
          ) : (
            <LeaderboardList leaderboardData={allLeaderboard.slice(3)} />
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