import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const ChallengesSection: React.FC = () => {
  const router = useRouter();

  const handleChallengesPress = () => {
    router.push("/home/challenges");
  };

  const handleStartChallengePress = () => {
    router.push("/home/challenges/addChallenge");
  };

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
        <Text style={styles.subtitle}>No active challenges, join one today!</Text>
        
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
