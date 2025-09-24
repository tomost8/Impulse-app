import React, { useState, useMemo } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Platform, Image, Dimensions } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { goals } from "@/utils/goals";

import LoadingScreen from "@/components/ui/common/loading";
import Header from "@/components/ui/common/headers/Header";
import { ViewActiveChallenge, ViewCompletedChallenge, WelcomeModal } from "@/components/features/goals";

interface ChallengesScreenProps {
  isLoading: boolean;
  myChallenges: any;
}

const ViewChallengesScreen: React.FC<ChallengesScreenProps> = ({ 
  isLoading, 
  myChallenges,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);
  const [filterButtonY, setFilterButtonY] = useState<number>(200);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);

  // Testing options for empty challenge state
  //myChallenges = { ...myChallenges, activeChallenges: [] }; // Test: No active challenges
  //myChallenges = { ...myChallenges, completedChallenges: [] }; // Test: No completed challenges

  // Category Filter
  const filteredChallenges = useMemo(() => {
    if (!myChallenges) return { activeChallenges: [], completedChallenges: [] };
    let filteredActive = myChallenges.activeChallenges || [];
    let filteredCompleted = myChallenges.completedChallenges || [];
    // Only filter completed challenges, leave active challenges unfiltered
    if (selectedCategories.length > 0) {
      filteredCompleted = filteredCompleted.filter((challenge: any) => 
        selectedCategories.includes(challenge.userChallenge.challenge.category)
      );
    }
    return {
      activeChallenges: filteredActive,
      completedChallenges: filteredCompleted
    };
  }, [myChallenges, selectedCategories]);

  // Show welcome modal if no challenges (neither active nor completed)
  React.useEffect(() => {
    if (isLoading) {
      setShowWelcomeModal(false);
    } else if (myChallenges && 
        (!myChallenges.activeChallenges?.length && !myChallenges.completedChallenges?.length)) {
      setShowWelcomeModal(true);
    }
  }, [isLoading, myChallenges]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Challenges"
        onBackPress={() => router.back()}
      />
      <ScrollView>
        {/* Active Challenges Header */}
        <View style={styles.activeHeader}>
          <Text style={styles.activeHeaderTitle}>My Challenges</Text>
          <TouchableOpacity 
            style={styles.addNewButton}
            onPress={() => router.push("/home/challenges/addChallenge")}
          >
            <Text style={styles.plusSymbol}>+</Text>
            <Text style={styles.addNewText}>Add New</Text>
          </TouchableOpacity>
        </View>

        {/* Active Challenges */}
        {myChallenges && myChallenges.activeChallenges?.length > 0 && (
          <View style={styles.challengesContainer}>
            {myChallenges.activeChallenges.map((activeChallenge: any, index: number) => (
              <ViewActiveChallenge
                key={activeChallenge.userChallenge.id}
                id={activeChallenge.userChallenge.id}
                title={activeChallenge.userChallenge.challenge.title}
                progress={activeChallenge.progress}
                category={activeChallenge.userChallenge.challenge.category}
              />
            ))}
          </View>
        )}

        {/* Empty state when no Active Challenges */}
        {myChallenges && !myChallenges.activeChallenges?.length && (
          <View style={styles.emptyActiveContainer}>
            <Text style={styles.emptyActiveText}>No active challenges, join one today!</Text>
          </View>
        )}

        {/* Spacing for Completed Challenges section */}
        <View style={styles.spacingContainer} />

        {/* Completed Challenges Header + Category Filter Button */}
        <View 
          style={styles.completedHeader}
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            setFilterButtonY(y);
          }}
        >
          <Text style={styles.completedHeaderTitle}>
            Completed Challenges ({filteredChallenges.completedChallenges.length})
          </Text>
          <View style={styles.filterButtonWrapper}>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                setShowCategoryDropdown(!showCategoryDropdown);
              }}
              style={[
                styles.filterButton,
                showCategoryDropdown && styles.filterButtonActive
              ]}
            >
              <Ionicons 
                name="options-outline" 
                size={20} 
                color={showCategoryDropdown ? '#DE728D' : '#666'} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Completed Challenges */}
        {myChallenges && myChallenges.completedChallenges?.length > 0 && (
          <View style={styles.challengesContainer}>
            {filteredChallenges.completedChallenges.map((completedChallenge: any, index: number) => (
              <ViewCompletedChallenge
                key={completedChallenge.userChallenge.id}
                id={completedChallenge.userChallenge.id}
                title={completedChallenge.userChallenge.challenge.title}
                totalDays={completedChallenge.userChallenge.challenge.length}
                completedAt={completedChallenge.userChallenge.completed_at}
                endsAt={completedChallenge.userChallenge.ends_at}
                badgesEarned={completedChallenge.badgesEarned}
                badge={completedChallenge.userChallenge.badge_level || []}
                category={completedChallenge.userChallenge.challenge.category}
              />
            ))}
          </View>
        )}

        {/* Category Filter Dropdown */}
        {showCategoryDropdown && (
          <View style={[styles.categoryFilterContainer, { top: filterButtonY + 40 }]}>
            <TouchableOpacity 
              style={styles.categoryFilter}
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <Text style={styles.categoryFilterTitle}>Filter by Category</Text>
              <View style={styles.categoryFilterButtons}>
                {goals.map((goal) => (
                  <TouchableOpacity
                    key={goal.category}
                    onPress={() => {
                      if (selectedCategories.includes(goal.category)) {
                        setSelectedCategories(selectedCategories.filter(cat => cat !== goal.category));
                      } else {
                        setSelectedCategories([...selectedCategories, goal.category]);
                      }
                    }}
                    style={[
                      styles.categoryFilterButton,
                      selectedCategories.includes(goal.category) && styles.categoryFilterButtonActive
                    ]}
                  >
                    <View style={styles.categoryFilterButtonContent}>
                      <Image 
                        source={goal.categoryIcon as any} 
                        style={[
                          styles.categoryFilterIcon,
                          selectedCategories.includes(goal.category) && styles.categoryFilterIconActive
                        ]}
                        resizeMode="contain"
                      />
                      <Text style={[
                        styles.categoryFilterButtonText,
                        selectedCategories.includes(goal.category) && styles.categoryFilterButtonTextActive
                      ]}>
                        {goal.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Welcome Modal */}
      <WelcomeModal 
        visible={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  /* Layout & Containers */
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  challengesContainer: {
    marginTop: 0,
    paddingHorizontal: 20,
  },
  spacingContainer: {
    flex: 1,
    minHeight: Dimensions.get('window').height * 0.15,
  },

  /* Headers & Titles */
  activeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 10+8,
    marginBottom: 10,
    //borderColor: "#007AFF",
    //borderWidth: 1,
  },
  completedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 10+8,
    marginBottom: 10,
    //borderColor: "#007AFF",
    //borderWidth: 1,
  },
  activeHeaderTitle: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#242020",
  },
  completedHeaderTitle: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#5E6676",
  },

  /* "Add New" Button */
  addNewButton: {
    backgroundColor: '#DE728D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusSymbol: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
    lineHeight: 16,
  },
  addNewText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },

  /* Empty Active Challenges Display */
  emptyActiveContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyActiveText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Poppins',
  },

  /* Filter Button */
  filterButtonWrapper: {
    position: 'relative',
    zIndex: 100,
  },
  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    //backgroundColor: '#f0f0f0',
    //borderColor: '#007AFF',
    //borderWidth: 1,
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: '#f0f0f0',
    borderColor: '#DE728D',
  },

  /* Category Filter */
  categoryFilterContainer: {
    position: 'absolute',
    right: 16,
    zIndex: 200,
  },
  categoryFilter: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  categoryFilterTitle: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryFilterButtons: {
    gap: 4,
  },
  categoryFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryFilterButtonActive: {
    backgroundColor: '#DE728D',
    borderColor: '#DE728D',
  },
  categoryFilterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryFilterIcon: {
    width: 16,
    height: 16,
    opacity: 0.7,
    tintColor: '#DE728D',
  },
  categoryFilterIconActive: {
    opacity: 1,
    tintColor: '#FFFFFF',
  },
  categoryFilterButtonText: {
    fontSize: 11,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#666',
    flex: 1,
  },
  categoryFilterButtonTextActive: {
    color: '#fff',
  },
});

export default ViewChallengesScreen;



