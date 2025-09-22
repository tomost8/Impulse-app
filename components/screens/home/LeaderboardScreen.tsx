import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import LoadingScreen from "@/components/ui/common/loading";
import { LeaderboardHeader, LeaderboardPodium, LeaderboardList, LeaderboardTabs } from "@/components/features/leaderboard";

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
        return <LoadingScreen />;
    }
  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerBackground}>
            <SafeAreaView>
              <LeaderboardHeader
                onBackPress={() => router.back()}
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
              />
            </SafeAreaView>
          </View>
  
          {/* Tabs Section - Fixing Alignment */}
          <View>
            <LeaderboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </View>
  
          {/* Podium */}
          {activeTab === "Friends" ? (
            <LeaderboardPodium podiumData={friendsLeaderboard.slice(0, 3)} selectedPeriod={selectedPeriod} />
          ) : (
            <LeaderboardPodium podiumData={allLeaderboard.slice(0, 3)} selectedPeriod={selectedPeriod} />
          )}
  
          {/* Conditional Leaderboard List */}
          {activeTab === "Friends" ? (
            <LeaderboardList leaderboardData={friendsLeaderboard.slice(3)} selectedPeriod={selectedPeriod} />
          ) : (
            <LeaderboardList leaderboardData={allLeaderboard.slice(3)} selectedPeriod={selectedPeriod} />
          )}
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F8F8",
    },
    headerBackground: {
      backgroundColor: '#E0EDFD',
    },
    scrollContent: {
      paddingBottom: 20,
      paddingTop: 0,
    },
  });
  
  export default LeaderboardScreen;