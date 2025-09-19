import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, Platform } from "react-native";
import LoadingScreen from "@/components/ui/common/loading";
import Header from "@/components/ui/common/headers/Header";
import { router } from "expo-router";

interface AddChallengeScreenProps {
  isLoading: boolean;
  challenges: any[];
  success: boolean;
  errors: any[];
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string | undefined) => void;
  onJoinChallenge: (challengeId: number) => Promise<void>;
  isJoiningChallenge: boolean;
}

const AddChallengeScreen: React.FC<AddChallengeScreenProps> = ({ 
  isLoading, 
  challenges, 
  success, 
  errors, 
  selectedCategory, 
  setSelectedCategory,
  onJoinChallenge,
  isJoiningChallenge
}) => {
  const categories = [
    { key: undefined, label: 'All' },
    { key: 'FOOD', label: 'Food' },
    { key: 'WELLNESS', label: 'Wellness' },
    { key: 'WORKING_OUT', label: 'Working Out' },
    { key: 'STUDYING_WORKING', label: 'Studying/Working' },
    { key: 'RISE_AND_SHINE', label: 'Rise & Shine' },
    { key: 'PASSION_HOBBY', label: 'Passion/Hobby' },
  ];

  const handleJoinChallenge = async (challengeId: number, challengeTitle: string) => {
    console.log('Join Challenge button pressed for:', challengeTitle, 'ID:', challengeId);
    onJoinChallenge(challengeId);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header 
          title="Join Challenge"
          onBackPress={() => router.back()}
        />

        {/* Category Filter */}
        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key || 'all'}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.key && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.key)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category.key && styles.categoryButtonTextActive
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Available Challenges Section */}
        {challenges && challenges.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Available Challenges</Text>
            <View style={styles.challengesContainer}>
              {challenges.map((challengeItem, index) => (
                <View key={challengeItem.challenge.id || index} style={styles.challengeCard}>
                  <Text style={styles.challengeTitle}>{challengeItem.challenge.title}</Text>
                  <Text style={styles.challengeDescription}>
                    {challengeItem.shortDescription || challengeItem.challenge.description}
                  </Text>
                  <View style={styles.challengeMeta}>
                    <Text style={styles.challengeCategory}>{challengeItem.challenge.category}</Text>
                    <Text style={styles.challengeLength}>{challengeItem.challenge.length}</Text>
                  </View>
                  <View style={styles.challengePoints}>
                    <Text style={styles.pointsLabel}>Points:</Text>
                    <Text style={styles.pointsText}>
                      Bronze: {challengeItem.challenge.points_bronze} | 
                      Silver: {challengeItem.challenge.points_silver} | 
                      Gold: {challengeItem.challenge.points_gold} | 
                      Diamond: {challengeItem.challenge.points_diamond}
                    </Text>
                  </View>
                  <View style={styles.challengeStatus}>
                    <Text style={[
                      styles.statusText,
                      challengeItem.isJoined ? styles.joinedText : styles.notJoinedText
                    ]}>
                      {challengeItem.isJoined ? 'Already Joined' : 'Available to Join'}
                    </Text>
                    <Text style={[
                      styles.statusText,
                      challengeItem.isLocked ? styles.lockedText : styles.unlockedText
                    ]}>
                      {challengeItem.isLocked ? 'Locked' : 'Available'}
                    </Text>
                  </View>
                  
                  {!challengeItem.isJoined && !challengeItem.isLocked && (
                    <TouchableOpacity 
                      style={[styles.joinButton, isJoiningChallenge && styles.joinButtonDisabled]}
                      onPress={() => handleJoinChallenge(challengeItem.challenge.id, challengeItem.challenge.title)}
                      disabled={isJoiningChallenge}
                    >
                      <Text style={styles.joinButtonText}>
                        {isJoiningChallenge ? 'Joining...' : 'Join Challenge'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No challenges available</Text>
            <Text style={styles.emptySubtext}>Check back later for new challenges</Text>
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
  categorySection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryButtonActive: {
    backgroundColor: '#DE728D',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
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
  challengeDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 12,
  },
  challengeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  challengeCategory: {
    fontSize: 12,
    color: "#DE728D",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  challengeLength: {
    fontSize: 12,
    color: "#666666",
  },
  challengePoints: {
    marginBottom: 12,
  },
  pointsLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#242020",
    marginBottom: 4,
  },
  pointsText: {
    fontSize: 11,
    color: "#666666",
  },
  challengeStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  joinedText: {
    color: '#DE728D',
  },
  notJoinedText: {
    color: '#666666',
  },
  lockedText: {
    color: '#FF9800',
  },
  unlockedText: {
    color: '#DE728D',
  },
  joinButton: {
    backgroundColor: '#DE728D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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

export default AddChallengeScreen;
