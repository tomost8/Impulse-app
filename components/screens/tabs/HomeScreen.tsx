import React, { useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Text, TouchableOpacity, Image } from "react-native";

import TopSection from "../../ui/HomeComponents/HeaderComponents/TopSection"; // ✅ Added Top Section
import QuoteofDay from "../../ui/HomeComponents/QuoteofDay"; // ✅ Matches the actual file name
import DailyGoals from "../../ui/HomeComponents/ActivitiesContainer";
import LeaderboardFull from "../../ui/HomeComponents/LeaderboardComponents/LeaderboardFull";
import DailyAddPopup from "../home/dailyaddpopup";

interface HomeScreenProps {
  isLoading: boolean;
  name: string;
  activities: any[]; 
  friendsLeaderboard: any[]; 
}

const HomeScreen: React.FC<HomeScreenProps> = ({ 
  isLoading,
  name,
  activities,
  friendsLeaderboard,
}) => {
  const [showDailyAddPopup, setShowDailyAddPopup] = useState(false);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TopSection name={name} />
        <TouchableOpacity 
          style={styles.checkButton}
          onPress={() => setShowDailyAddPopup(true)}
        >
          <Image 
            source={require("@/assets/icons/greencheck.png")}
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
            isActivitiesLoading={isLoading} 
          />
        </View>

        {/* ✅ Leaderboard Section with Navigation to Full Leaderboard */}
        <View style={styles.leaderboardWrapper}>
          <LeaderboardFull 
            users={friendsLeaderboard}
            isUsersLoading={isLoading}
          />
        </View>
      </ScrollView>

      <DailyAddPopup 
        isVisible={showDailyAddPopup}
        onClose={() => setShowDailyAddPopup(false)}
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
    alignItems: 'center',
    paddingRight: 16,
  },
  checkButton: {
    padding: 8,
  },
  checkIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});

export default HomeScreen;