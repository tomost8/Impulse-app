import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, Platform } from "react-native";
import { router } from "expo-router";

import LoadingScreen from "@/components/ui/common/loading";
import Header from "@/components/ui/common/headers/Header";
import { ViewActiveChallenge, ViewCompletedChallenge } from "@/components/features/goals";

interface ChallengesScreenProps {
  isLoading: boolean;
  myChallenges: any;
}

const ViewChallengesScreen: React.FC<ChallengesScreenProps> = ({ 
  isLoading, 
  myChallenges,
}) => {

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header 
        title="My Challenges"
        onBackPress={() => router.back()}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Active Challenges Section */}
        {myChallenges && myChallenges.activeChallenges && myChallenges.activeChallenges.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>My Challenges</Text>
            <View style={styles.challengesContainer}>
              {myChallenges.activeChallenges.map((activeChallenge: any, index: number) => (
                <ViewActiveChallenge
                  key={activeChallenge.userChallenge.id}
                  id={activeChallenge.userChallenge.id}
                  title={activeChallenge.userChallenge.challenge.title}
                  progress={activeChallenge.progress}
                  status="active"
                  description={activeChallenge.userChallenge.challenge.description}
                  category={activeChallenge.userChallenge.challenge.category}
                />
              ))}
            </View>
          </>
        )}

        {/* Completed Challenges Section */}
        {myChallenges && myChallenges.completedChallenges && myChallenges.completedChallenges.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Completed Challenges</Text>
            <View style={styles.challengesContainer}>
              {myChallenges.completedChallenges.map((completedChallenge: any, index: number) => (
                <ViewCompletedChallenge
                  key={completedChallenge.userChallenge.id}
                  id={completedChallenge.userChallenge.id}
                  title={completedChallenge.userChallenge.challenge.title}
                  totalDays={completedChallenge.userChallenge.challenge.length}
                  completedAt={completedChallenge.userChallenge.completed_at}
                  endsAt={completedChallenge.userChallenge.ends_at}
                  badgesEarned={completedChallenge.badgesEarned}
                  category={completedChallenge.userChallenge.challenge.category}
                />
              ))}
            </View>
          </>
        )}

        {/* Empty State */}
        {(!myChallenges || 
          (!myChallenges.activeChallenges?.length && !myChallenges.completedChallenges?.length)) && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No challenges yet</Text>
            <Text style={styles.emptySubtext}>Start a challenge to see your progress here</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#242020",
    marginTop: 15,
    paddingLeft: 25,
    marginBottom: 15,
  },
  challengesContainer: {
    marginTop: 0,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666666',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
});

export default ViewChallengesScreen;



