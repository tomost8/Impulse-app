import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import HomeActiveChallenge from "./cards/HomeActiveChallenge";
import HomeCompletedChallenge from "./cards/HomeCompletedChallenge";

interface ChallengesSectionProps {
  challenges: any;
}

const ChallengesSection: React.FC<ChallengesSectionProps> = ({ challenges }) => {
  const router = useRouter();



  // Get active challenges data
  const activeChallenges = challenges?.activeChallenges || [];
  const completedChallenges = challenges?.completedChallenges || [];
  
  // TEMPORARY: Force empty state for testing
  const forceEmptyState = false;
  const hasActiveChallenges = forceEmptyState ? false : activeChallenges.length > 0;
  const hasCompletedChallenges = completedChallenges.length > 0;
  const hasAnyChallenges = hasActiveChallenges || hasCompletedChallenges;


  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>My Challenges</Text>
        <TouchableOpacity onPress={() => router.push("/home/challenges")}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content: Challenge Cards */}
      <View style={styles.content}>
        {hasAnyChallenges ? (
          <>
            {/* Active Challenges */}
            {hasActiveChallenges && (
              <>
            {activeChallenges.map((challenge: any, index: number) => (
              <HomeActiveChallenge
                key={challenge.userChallenge.id}
                id={challenge.userChallenge.id}
                title={challenge.userChallenge.challenge.title}
                daysCompleted={challenge.userChallenge.days_completed}
                progress={challenge.progress}
                status="active"
                description={challenge.userChallenge.challenge.description}
              />
            ))}
              </>
            )}

            {/* Completed Challenges */}
            {hasCompletedChallenges && (
              <>
            {completedChallenges.map((challenge: any, index: number) => (
              <HomeCompletedChallenge
                key={challenge.userChallenge.id}
                id={challenge.userChallenge.id}
                title={challenge.userChallenge.challenge.title}
                totalDays={challenge.userChallenge.challenge.length}
                completedAt={challenge.userChallenge.completed_at}
                endsAt={challenge.userChallenge.ends_at}
                badge={challenge.userChallenge.badge_level || []}
              />
            ))}
              </>
            )}
          </>
        ) : (
          // No challenges at all, display empty state
          <View style={styles.emptyState}>
            <Text style={styles.emptyMessage}>No challenges yet, join one today!</Text>
          </View>
        )}
        
        {/* Add Challenge button (always shown) */}
        <TouchableOpacity 
          style={styles.addChallengeButton}
          onPress={() => router.push("/home/challenges/addChallenge")}
        >
          <Text style={styles.plusSymbol}>+</Text>
          <Text style={styles.addChallengeText}>Add a Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Section Container + Header
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Poppins",
    color: "#242020",
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Poppins",
    color: "#DE728D",
    textDecorationLine: "underline",
  },
  // Main Content
  content: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  emptyMessage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    textAlign: 'center',
  },
  // Add Challenge Button
  addChallengeButton: {
    backgroundColor: '#DE728D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  plusSymbol: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 6,
    lineHeight: 18,
  },
  addChallengeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default ChallengesSection;
