import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "@/components/ui/common/headers/Header";
import { router } from "expo-router";
import LoadingScreen from "@/components/ui/common/loading";

interface ChallengeDetailScreenProps {
  challengeId: string;
  challenge: any;
  isLoading: boolean;
}

const ChallengeDetailScreen: React.FC<ChallengeDetailScreenProps> = ({
  challengeId,
  challenge,
  isLoading,
}) => {
  if (isLoading) {
    return <LoadingScreen />;
  }

  const challengeData = challenge.userChallenge.challenge;
  const status = challenge.userChallenge.status;
  const isActive = status === 'ACTIVE';
  const isCompleted = status === 'COMPLETED';

  return (
    <View style={styles.container}>
      <Header 
        title="Challenge Details"
        onBackPress={() => router.back()}
      />
      
      {/* Section 1: Card Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Challenge Card - ID: {challenge.userChallenge.id}</Text>
        <View style={styles.cardPlaceholder}>
          <Text style={styles.placeholderText}>Card component will go here</Text>
        </View>
      </View>

      {/* Section 2: Progress Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Progress - {isActive ? 'Active' : isCompleted ? 'Completed' : 'Unknown'}
        </Text>
        <View style={styles.progressPlaceholder}>
          <Text style={styles.placeholderText}>Progress/Summary components will go here</Text>
        </View>
      </View>

      {/* Section 3: Daily Recap Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Recap</Text>
        <View style={styles.milestonesPlaceholder}>
          <Text style={styles.placeholderText}>Daily recap component will go here</Text>
        </View>
      </View>

      {/* Section 4: Friends Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Friends</Text>
        <View style={styles.actionsPlaceholder}>
          <Text style={styles.placeholderText}>Friends component will go here</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#242020",
    marginBottom: 12,
    fontFamily: "Open Sans",
  },
  cardPlaceholder: {
    backgroundColor: "#FEF3F2",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FECACA",
    borderStyle: "dashed",
  },
  progressPlaceholder: {
    backgroundColor: "#FEF3F2",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FECACA",
    borderStyle: "dashed",
  },
  milestonesPlaceholder: {
    backgroundColor: "#FEF3F2",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FECACA",
    borderStyle: "dashed",
  },
  actionsPlaceholder: {
    backgroundColor: "#FEF3F2",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FECACA",
    borderStyle: "dashed",
  },
  placeholderText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default ChallengeDetailScreen;
