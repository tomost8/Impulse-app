import React from "react";
import { View, StyleSheet, ScrollView, Text, Platform, StatusBar } from "react-native";
import { LeaderboardHeader, LeaderboardPodium, LeaderboardList } from "@/components/features/leaderboard";

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
        <LeaderboardHeader
          onBackPress={() => router.back()}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
        <ScrollView style={styles.scrollView}>
          {/* Podium */}
          <LeaderboardPodium podiumData={communityLeaderboard.slice(0, 3)} selectedPeriod={selectedPeriod} />
          {/*  Leaderboard List */}
          <LeaderboardList leaderboardData={communityLeaderboard.slice(3)} selectedPeriod={selectedPeriod} />
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    scrollView: {
      flex: 1,
    },
  });
  
  export default LeaderboardScreen;