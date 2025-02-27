import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Text, TouchableOpacity } from "react-native";

import TopSection from "../ui/HomeComponents/HeaderComponents/TopSection"; // ✅ Added Top Section
import QuoteofDay from "../ui/HomeComponents/QuoteofDay"; // ✅ Matches the actual file name
import DailyGoals from "../ui/HomeComponents/DailyGoals";
import LeaderboardFull from "../ui/HomeComponents/LeaderboardComponents/LeaderboardFull";
import AddDailyGoalsBox from "../ui/HomeComponents/AddDailyGoalsBox"; // ✅ Importing the new component


interface HomeDesignProps {
  friends: any[]; 
  isFriendsLoading: boolean;
  activities: any[]; 
  isActivitiesLoading: boolean;
}

const HomeDesign: React.FC<HomeDesignProps> = ({ 
  friends, 
  isFriendsLoading, 
  activities, 
  isActivitiesLoading 
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <TopSection />
        
        <View style={styles.quoteSection}>
          <QuoteofDay />
        </View>
        
        <View style={styles.section}>
  <       DailyGoals activities={activities} isActivitiesLoading={isActivitiesLoading} />
          <AddDailyGoalsBox />  // ✅ Add this below DailyGoals
        </View>

        {/* ✅ Leaderboard Section with Navigation to Full Leaderboard */}
        <View style={styles.leaderboardWrapper}>
          <LeaderboardFull 
            friends={friends}
            isFriendsLoading={isFriendsLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flexGrow: 1, // ✅ Fix: Ensures the content expands and prevents cutoff
    padding: 16,
    paddingBottom: 80, // ✅ Increased padding to avoid bottom cutoff
    paddingTop: 0,
  },
  quoteSection: {
    marginTop: 35, // ✅ Adds spacing between TopSection & Quote Card
    marginBottom: 20, // ✅ Prevents Quote from being too close to Daily Goals
    alignItems: "center",
  },
  section: {
    marginBottom: 24, // Ensures spacing between sections
  },
  leaderboardWrapper: {
    flex: 1, // ✅ Fix: Allows LeaderboardFull to expand dynamically
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeDesign;