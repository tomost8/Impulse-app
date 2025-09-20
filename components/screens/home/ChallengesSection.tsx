import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface ChallengesSectionProps {
  challenges: any;
}

const ChallengesSection: React.FC<ChallengesSectionProps> = ({ challenges }) => {
  const router = useRouter();

  const handleChallengesPress = () => {
    router.push("/home/challenges");
  };

  const handleStartChallengePress = () => {
    router.push("/home/challenges/addChallenge");
  };

  // Get active challenges data
  const activeChallenges = challenges?.activeChallenges || [];
  const completedChallenges = challenges?.completedChallenges || [];
  const hasActiveChallenges = activeChallenges.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Challenges</Text>
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={handleChallengesPress}
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        {hasActiveChallenges ? (
          <>
            <Text style={styles.subtitle}>
              {activeChallenges.length} Active Challenge{activeChallenges.length !== 1 ? 's' : ''}
            </Text>
            {activeChallenges.slice(0, 2).map((challenge: any, index: number) => (
              <View key={challenge.userChallenge.id} style={styles.challengeItem}>
                <Text style={styles.challengeTitle}>
                  {challenge.userChallenge.challenge.title}
                </Text>
                <Text style={styles.challengeProgress}>
                  {challenge.progress.progressLabel} • {challenge.progress.daysRemaining} days left
                </Text>
              </View>
            ))}
            {activeChallenges.length > 2 && (
              <Text style={styles.moreText}>
                +{activeChallenges.length - 2} more challenge{activeChallenges.length - 2 !== 1 ? 's' : ''}
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.subtitle}>No active challenges, join one today!</Text>
        )}
        
        {/* Always show the Add Challenge button */}
        <TouchableOpacity 
          style={styles.challengeButton}
          onPress={handleStartChallengePress}
        >
          <Text style={styles.challengeButtonText}>Add a Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewAllText: {
    fontSize: 14,
    color: "#DE728D",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginRight: 6,
  },
  content: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 16,
  },
  challengeItem: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#DE728D',
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  challengeProgress: {
    fontSize: 12,
    color: '#666666',
  },
  moreText: {
    fontSize: 12,
    color: '#DE728D',
    fontStyle: 'italic',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  challengeButton: {
    backgroundColor: '#DE728D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 140,
  },
  challengeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ChallengesSection;
