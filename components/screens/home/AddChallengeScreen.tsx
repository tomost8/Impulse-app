import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, Platform } from "react-native";
import LoadingScreen from "@/components/ui/common/loading";
import Header from "@/components/ui/common/headers/Header";
import { ExploreChallenge } from "@/components/features/goals";
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
      {/* Blue Header Area */}
      <SafeAreaView style={styles.headerArea}>
        <Header 
          title="Challenges"
          onBackPress={() => router.back()}
        />
      </SafeAreaView>

      {/* White Category Filter Area */}
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

      {/* White Bottom Area */}
      <View style={styles.bottomArea}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {challenges && challenges.length > 0 ? (
            <>
              <View style={styles.challengesContainer}>
                {challenges.map((challengeItem, index) => (
                  <ExploreChallenge
                    key={challengeItem.challenge.id || index}
                    challengeItem={challengeItem}
                    isJoiningChallenge={isJoiningChallenge}
                    onJoinChallenge={handleJoinChallenge}
                  />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerArea: {
    backgroundColor: "#E0EDFD",
  },
  bottomArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
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
