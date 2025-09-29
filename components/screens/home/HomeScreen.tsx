import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import LoadingScreen from "@/components/ui/common/loading";

import { HomeHeader, QuoteofDay, WelcomePopup } from "@/components/features/home";
import { ActivitiesSection, ChallengesSection, SetupActivitiesModal } from "@/components/features/goals";
import { LeaderboardFull } from "@/components/features/leaderboard";

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
  
  const { welcome } = useLocalSearchParams();
  const [showWelcomePopup, setShowWelcomePopup] = useState(welcome === 'true');
  const [showDailyAddPopup, setShowDailyAddPopup] = useState(activities.length === 0 && !showWelcomePopup);

  // Daily Acivities modal only shows after Welcome modal closed
  useEffect(() => {
    if (!showWelcomePopup && activities.length === 0) {
      setShowDailyAddPopup(true);
    }
  }, [showWelcomePopup, activities.length]);

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false);
  };

  const onConfirm = async (selectedGoals: any[], goalFormData: any) => {
    await handleAddGoals(selectedGoals, goalFormData);
    setShowDailyAddPopup(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerExtension}>
          <HomeHeader name={name} />
        </View>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          alwaysBounceVertical={false}
          scrollEventThrottle={16}
          decelerationRate="normal"
        >
          <View style={styles.quoteSection}>
            <QuoteofDay />
          </View>

          {/* Activities Section */}
          <View>
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

        <SetupActivitiesModal  
          isVisible={showDailyAddPopup}
          onClose={() => setShowDailyAddPopup(false)}
          onConfirm={onConfirm}
        />
      </View>
      
      <WelcomePopup
        visible={showWelcomePopup}
        onClose={handleCloseWelcomePopup}
      />
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