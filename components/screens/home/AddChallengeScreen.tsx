import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import LoadingScreen from "@/components/ui/common/loading";
import Header from "@/components/ui/common/headers/Header";
import { ExploreChallenge } from "@/components/features/goals";
import { router } from "expo-router";
import { getCategoryIcon } from "@/utils/challengeUtils";

interface AddChallengeScreenProps {
  isLoading: boolean;
  challenges: any[];
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string | undefined) => void;
}

const AddChallengeScreen: React.FC<AddChallengeScreenProps> = ({ 
  isLoading, 
  challenges, 
  selectedCategory, 
  setSelectedCategory
}) => {
  const categories = [
    { key: undefined, label: 'Available' },
    { key: 'FOOD', label: 'Food' },
    { key: 'WELLNESS', label: 'Wellness' },
    { key: 'WORKING_OUT', label: 'Working Out' },
    { key: 'STUDYING_WORKING', label: 'Studying/Working' },
    { key: 'RISE_AND_SHINE', label: 'Rise & Shine' },
    { key: 'PASSION_HOBBY', label: 'Passion/Hobby' },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerArea}>
        <Header 
          title="Challenges"
          onBackPress={() => router.back()}
        />
      </SafeAreaView>

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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image 
                  source={getCategoryIcon(category.key)}
                  style={[
                    styles.icon,
                    selectedCategory === category.key && styles.iconActive
                  ]}
                />
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category.key && styles.categoryButtonTextActive
                ]}>
                  {category.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Explore Challenge Cards */}
      <View style={styles.bottomArea}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {challenges && challenges.length > 0 ? (
            <>
              <View style={styles.challengesContainer}>
                {challenges
                .filter((challengeItem) => {
                  // If category.key is undefined → only allow ACTIVE or COMPLETED
                  if (selectedCategory === undefined) {
                    return ( 
                      !challengeItem.isJoined && !challengeItem.isLocked
                    );
                  }
                  // Otherwise, keep everything
                  return true;
                })
                .map((challengeItem, index) => (
                  <ExploreChallenge
                    key={challengeItem.challenge.id || index}
                    challengeItem={challengeItem}
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
    backgroundColor: "#E0EDFD",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  categoryScroll: {
    paddingVertical: 12,
    paddingLeft: 10,
  },
  categoryButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 4,
    resizeMode: "contain",
  },
  iconActive: {
    tintColor: '#FFFFFF',
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
