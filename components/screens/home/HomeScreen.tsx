import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import LoadingScreen from "@/components/ui/common/loading";
import LoadingOverlay from "@/components/ui/common/LoadingOverlay";

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
  const { welcome } = useLocalSearchParams();
  const [showWelcomePopup, setShowWelcomePopup] = useState(welcome === 'true');
  const [showDailyAddPopup, setShowDailyAddPopup] = useState(activities.length === 0 && !showWelcomePopup);

  // Daily Acivities modal only shows after Welcome modal closed
  useEffect(() => {
    if (!showWelcomePopup && activities.length === 0) {
      console.log("Setting showDailyAddPopup to true with delay");
      // Add a small delay to see if timing helps
      setTimeout(() => {
        setShowDailyAddPopup(true);
      }, 500);
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
        <HomeHeader name={name} />
        {!loading && (
          <View style={styles.contentContainer}>
            <ScrollView 
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              bounces={true}
              alwaysBounceVertical={false}
              scrollEventThrottle={16}
              decelerationRate="normal"
            >
              <QuoteofDay />
              <ActivitiesSection 
                activities={activities} 
                timezone={timezone}
              />
              <ChallengesSection 
                challenges={challenges} 
              />
              <LeaderboardFull 
                users={friendsLeaderboard}
                isUsersLoading={loading}
              />
            </ScrollView>
          </View>
        )}
        
        {/* Loading Overlay */}
        <LoadingOverlay 
          visible={loading} 
          top={130} 
        />

        <SetupActivitiesModal  
          isVisible={showDailyAddPopup && !loading}
          onClose={() => {
            console.log("SetupActivitiesModal onClose called");
            setShowDailyAddPopup(false);
          }}
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
  /* Containers */
  safeArea: {
    flex: 1,
    backgroundColor: '#E0EDFD',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80, 
  },
});

export default HomeScreen;