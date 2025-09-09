import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import LeaderboardHeader from "@/components/ui/common/Leaderboard/LeaderboardHeader";
import LeaderboardPodium from "@/components/ui/common/Leaderboard/LeaderboardPodium";
import LeaderboardList from "@/components/ui/common/Leaderboard/LeaderboardList";

import { router } from "expo-router";

type LeaderboardPeriod = 'POINTS_WEEKLY' | 'POINTS_MONTHLY' | 'POINTS_ALL';

interface LeaderboardScreenProps {
  isLoading: boolean;
  communityLeaderboard: any[];
  selectedPeriod: LeaderboardPeriod;
  setSelectedPeriod: (period: LeaderboardPeriod) => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ isLoading, communityLeaderboard, selectedPeriod, setSelectedPeriod }) => {
    if (isLoading) {
        return <Text>Loading...</Text>;
    }
  
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Header + Leaderboard Selector */}
          <LeaderboardHeader
            onBackPress={() => router.back()}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
  
          {/* Podium */}
          <LeaderboardPodium podiumData={communityLeaderboard.slice(0, 3)} />
          {/*  Leaderboard List */}
          <LeaderboardList leaderboardData={communityLeaderboard.slice(3)} />

        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F8F8",
    },
    scrollView: {
      flex: 1,
    },
  });
  
  export default LeaderboardScreen;