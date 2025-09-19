import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, Platform } from "react-native";
import LoadingScreen from "@/components/ui/common/loading";
import Header from "@/components/ui/common/headers/Header";
import { router } from "expo-router";

interface ChallengesScreenProps {
  isLoading: boolean;
  myChallenges: any;
  myChallengesSuccess: boolean;
  myChallengesErrors: any[];
}

const ViewChallengesScreen: React.FC<ChallengesScreenProps> = ({ 
  isLoading, 
  myChallenges,
  myChallengesSuccess,
  myChallengesErrors
}) => {

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header 
          title="My Challenges"
          onBackPress={() => router.back()}
        />


        {/* Active Challenges Section */}
        {myChallenges && myChallenges.activeChallenges && myChallenges.activeChallenges.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Active Challenges</Text>
            <View style={styles.challengesContainer}>
              {myChallenges.activeChallenges.map((activeChallenge: any, index: number) => {
                const userChallenge = activeChallenge.userChallenge;
                const challenge = userChallenge.challenge;
                return (
                  <View key={userChallenge.id || index} style={styles.challengeCard}>
                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                    <Text style={styles.challengeCategory}>{challenge.category}</Text>
                    <Text style={styles.challengeProgress}>
                      {userChallenge.days_completed} days completed
                    </Text>
                    <Text style={styles.challengeStatus}>
                      {activeChallenge.progress?.daysRemaining || 'Unknown'} days remaining
                    </Text>
                  </View>
                );
              })}
            </View>
          </>
        )}

        {/* Completed Challenges Section */}
        {myChallenges && myChallenges.completedChallenges && myChallenges.completedChallenges.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Completed Challenges</Text>
            <View style={styles.challengesContainer}>
              {myChallenges.completedChallenges.map((completedChallenge: any, index: number) => {
                const userChallenge = completedChallenge.userChallenge;
                const challenge = userChallenge.challenge;
                return (
                  <View key={userChallenge.id || index} style={styles.challengeCard}>
                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                    <Text style={styles.challengeCategory}>{challenge.category}</Text>
                    <Text style={styles.challengeProgress}>
                      Completed on {new Date(userChallenge.ends_at).toLocaleDateString()}
                    </Text>
                    <Text style={styles.challengeStatus}>
                      Status: {userChallenge.status}
                    </Text>
                  </View>
                );
              })}
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
  challengeCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    padding: 16,
    marginBottom: 16,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#242020",
    marginBottom: 8,
  },
  challengeCategory: {
    fontSize: 12,
    color: "#DE728D",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  challengeProgress: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  challengeStatus: {
    fontSize: 12,
    color: "#999999",
    fontWeight: "500",
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



