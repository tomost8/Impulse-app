import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import UserOverview from "../ui/HomeComponents/UserOverview";
import QuoteCard from "../ui/HomeComponents/QuoteCard";
import DailyGoals from "../ui/HomeComponents/DailyGoals";
import LeaderboardCard from "../ui/HomeComponents/LeaderboardComponents/LeaderboardCard";
import BottomNav from "../ui/HomeComponents/BottomNav";

// Dummy Data for UI Testing
const dummyActivities = [
  { id: "1", title: "Morning Run", time: "6:00 AM - 7:00 AM", status: "Completed" },
  { id: "2", title: "Read Book", time: "8:00 PM - 9:00 PM", status: "In Progress" },
];

const dummyFriends = [
  { id: "1", name: "Andrew", points: 3496, rank: 2 },
  { id: "2", name: "Pedro", points: 3645, rank: 1 },
  { id: "3", name: "Freida", points: 3178, rank: 3 },
];

const HomeDesign: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* User Overview & Quote */}
        <UserOverview />
        <QuoteCard />

        {/* Daily Goals Section */}
        <View style={styles.section}>
          <DailyGoals activities={dummyActivities} isLoading={false} />
        </View>

        {/* Leaderboard Section */}
        <View style={styles.section}>
          <LeaderboardCard friends={dummyFriends} isLoading={false} />
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
    padding: 16,
    paddingBottom: 60,
  },
  section: {
    marginBottom: 24, // Ensures spacing between sections
  },
});

export default HomeDesign;
