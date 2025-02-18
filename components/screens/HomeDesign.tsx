import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // ✅ Import navigation hook

import TopSection from "../ui/HomeComponents/HeaderComponents/TopSection"; // ✅ Added Top Section
import QuoteofDay from "../ui/HomeComponents/QuoteofDay"; // ✅ Matches the actual file name
import DailyGoals from "../ui/HomeComponents/DailyGoals";
import LeaderboardFull from "../ui/HomeComponents/LeaderboardComponents/LeaderboardFull";
import BottomNav from "../ui/HomeComponents/BottomNav";

// Dummy Data for UI Testing
const dummyActivities = [
  { id: "1", title: "Morning Run", time: "6:00 AM - 7:00 AM", status: "Completed" },
  { id: "2", title: "Read Book", time: "8:00 PM - 9:00 PM", status: "In Progress" },
];

const HomeDesign: React.FC = () => {
  const navigation = useNavigation(); // ✅ Fix: Initialize navigation

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ✅ Fix: Added flexGrow to ScrollView */}
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* ✅ Top Section with Greeting & Streak */}
        <TopSection />

        {/* ✅ Fix: Added spacing and replaced QuoteCard with QuoteOfTheDay */}
        <View style={styles.quoteSection}>
          <QuoteofDay />
        </View>

        {/* Daily Goals Section */}
        <View style={styles.section}>
          <DailyGoals activities={dummyActivities} isLoading={false} />
        </View>

        {/* ✅ Fix: Wrapped LeaderboardFull to avoid being pushed down */}
        <View style={styles.leaderboardWrapper}>
          <LeaderboardFull />
        </View>

        {/* ✅ Leaderboard Section with Navigation to Full Leaderboard */}
        <View style={styles.leaderboardWrapper}>
          <View style={styles.leaderboardHeader}>
            <Text style={styles.leaderboardTitle}>Weekly Leaderboard</Text>
            <TouchableOpacity onPress={() => navigation.navigate("leaderboard")}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* ✅ Keep only one instance of LeaderboardFull */}
          <LeaderboardFull />
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
