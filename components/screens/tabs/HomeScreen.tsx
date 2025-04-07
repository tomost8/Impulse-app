import React, { useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Text, TouchableOpacity, Image } from "react-native";

import TopSection from "../../ui/HomeComponents/HeaderComponents/TopSection"; // ✅ Added Top Section
import QuoteofDay from "../../ui/HomeComponents/QuoteofDay"; // ✅ Matches the actual file name
import DailyGoals from "../../ui/HomeComponents/ActivitiesContainer";
import LeaderboardFull from "../../ui/HomeComponents/LeaderboardComponents/LeaderboardFull";
import DailyAddPopup from "../home/dailyaddpopup";

interface HomeScreenProps {
  loading: boolean;
  name: string;
  activities: any[]; 
  timezone: string;
  friendsLeaderboard: any[]; 
}

const HomeScreen: React.FC<HomeScreenProps> = ({ 
  loading,
  name,
  activities,
  timezone,
  friendsLeaderboard,
}) => {
  if (loading) {
    return <Text>Loading...</Text>;
  }
  const [showDailyAddPopup, setShowDailyAddPopup] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.topSectionWrapper}>
          <TopSection name={name} />
        </View>
        <TouchableOpacity 
          style={styles.checkButton}
          onPress={() => setShowDailyAddPopup(true)}
        >
          <Image 
            source={require("../../../assets/icons/greencheck.png")}
            style={styles.checkIcon}
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.quoteSection}>
          <QuoteofDay />
        </View>
        
        <View style={styles.section}>
          <DailyGoals 
            activities={activities} 
            timezone={timezone}
          />
        </View>

        {/* ✅ Leaderboard Section with Navigation to Full Leaderboard */}
        <View style={styles.leaderboardWrapper}>
          <LeaderboardFull 
            users={friendsLeaderboard}
            isUsersLoading={loading}
          />
        </View>
      </ScrollView>

      <DailyAddPopup 
        isVisible={showDailyAddPopup}
        onClose={() => setShowDailyAddPopup(false)}
        onConfirm={() => setShowDailyAddPopup(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flexGrow: 1, // ✅ Fix: Ensures the content expands and prevents cutoff
    padding: 16,
    paddingBottom: 80, // ✅ Increased padding to avoid bottom cutoff
    paddingTop: 0,
    //backgroundColor: "red", // Testing padding - visual check
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  topSectionWrapper: {
    flex: 1,
  },
  checkButton: {
    padding: 8,
    marginLeft: 16,
  },
  checkIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#4CAF50',
  },
});

export default HomeScreen;