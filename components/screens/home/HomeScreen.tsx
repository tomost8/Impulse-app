import React, { useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import LoadingScreen from "@/components/ui/common/loading";

import { HomeHeader, QuoteofDay } from "../../features/home";
import { ActivitiesSection, ChallengesSection, DailyAddPopup } from "../../features/goals";
import LeaderboardFull from "@/components/ui/common/Leaderboard/homeLeaderboard/LeaderboardFull"

interface HomeScreenProps {
  loading: boolean;
  name: string;
  activities: any[]; 
  timezone: string;
  challenges: any;
  friendsLeaderboard: any[]; 
  handleAddGoals: (selectedGoals: any[], goalFormData: any) => Promise<void>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ 
  loading,
  name,
  activities,
  timezone,
  challenges,
  friendsLeaderboard,
  handleAddGoals,
}) => {
  if (loading) {
    return <LoadingScreen />;
  }
  const [showDailyAddPopup, setShowDailyAddPopup] = useState(activities.length === 0);

  const onConfirm = async (selectedGoals: any[], goalFormData: any) => {
    await handleAddGoals(selectedGoals, goalFormData);
    setShowDailyAddPopup(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          alwaysBounceVertical={false}
          scrollEventThrottle={16}
          decelerationRate="normal"
        >
          <View style={styles.headerExtension}>
            <HomeHeader name={name} />
          </View>

          <View style={styles.quoteSection}>
            <QuoteofDay />
          </View>

          {/* Activities Section */}
          <View style={styles.section}>
            <ActivitiesSection 
              activities={activities} 
              timezone={timezone}
            />
          </View>

          {/* Challenges Section */}
          <ChallengesSection challenges={challenges} />

          {/* Leaderboard Section with Navigation to Full Leaderboard */}
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
          onConfirm={onConfirm}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E0EDFD',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerExtension: {
    backgroundColor: '#E0EDFD',
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 65, // Add padding at bottom to ensure visibility
  },
  quoteSection: {
    marginTop: 24,
    marginBottom: 20,
    alignItems: "center",
  },
  section: {
    marginBottom: 24, // Ensures spacing between sections
  },
  leaderboardWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 45, // Add margin to ensure space at bottom
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