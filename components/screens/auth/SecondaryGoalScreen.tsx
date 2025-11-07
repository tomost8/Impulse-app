import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { s } from 'react-native-size-matters';
import { router, useLocalSearchParams } from 'expo-router';
import { goals } from '@/utils/goals';
import { useSignup } from '@/contexts/SignupContext';
import LoadingOverlay from '@/components/ui/common/LoadingOverlay';

import GoalCard from '@/components/screens/auth/GoalCard';

interface SecondaryGoalScreenProps {
  isLoading: boolean;
  handleCreateAccount: (formData: any) => void;
}

const SecondaryGoalScreen: React.FC<SecondaryGoalScreenProps> = ({ isLoading, handleCreateAccount }) => {
  const { signupData, updateSignupData } = useSignup();
  const { primaryGoalId } = useLocalSearchParams<{ primaryGoalId: string }>();

  // Filter out the primary goal
  const availableGoals = goals.filter(goal => goal.id !== Number(primaryGoalId));

  const handleGoalSelect = useCallback((goalId: number) => {
    // If clicking the same goal, unselect it
    if (signupData.secondaryGoalId === goalId) {
      updateSignupData({ secondaryGoalId: null });
    } else {
      // Select the new goal
      updateSignupData({ secondaryGoalId: goalId });
    }
  }, [signupData.secondaryGoalId, updateSignupData]);

  const handleFinish = () => {
    const formData = {
        ...signupData, // Spread all existing data
        primaryGoalId: signupData.primaryGoalId, // Explicitly keep key goals for clarity
        secondaryGoalId: signupData.secondaryGoalId,
    };
   
    handleCreateAccount(formData);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LoadingOverlay visible={isLoading} />
      
      {/* Progress Bars */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFilled} />
          <View style={styles.progressFilled} />
          <View style={styles.progressFilled} />
        </View>
      </View>

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Content */}
          <Text style={styles.title}>Select your secondary goal</Text>
          
          <Text style={styles.subtitle}>
            Pick a second goal or stick to just one. Keeping it simple helps you stay focused and make real progress.
          </Text>

          <Text style={styles.description}>
            Your goal selections aren't permanent, you can update this anytime in Settings.
          </Text>

          {/* Goals Grid - Now using the reusable GoalCard */}
          <View style={styles.goalsGrid}>
            {availableGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal as any} // Cast goal to 'any' or define the GoalItem type in goals.ts and import it
                isSelected={signupData.secondaryGoalId === goal.id}
                onSelect={handleGoalSelect}
              />
            ))}
          </View>
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleFinish}
          >
            <Text style={styles.nextButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Use exact same styles as PrimaryGoal
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressContainer: {
    paddingTop: s(22),
    paddingHorizontal: s(20),
    marginBottom: s(22),
  },
  progressBar: {
    flexDirection: 'row',
    gap: s(5),
    height: s(4),
  },
  progressFilled: {
    flex: 1,
    backgroundColor: '#DE728D',
    borderRadius: s(2),
  },
  progressEmpty: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: s(2),
  },
  container: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingBottom: s(20),
  },
  title: {
    fontSize: s(22),
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#242020',
    marginBottom: s(6),
  },
  subtitle: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    color: '#242020',
    marginBottom: s(12),
    lineHeight: s(16),
  },
  description: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    color: '#242020',
    marginBottom: s(24),
    lineHeight: s(18),
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: s(8),
    marginBottom: s(16),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(16),
    marginTop: 'auto',
  },
  backButton: {
    flex: 1,
    height: s(48),
    borderWidth: 1,
    borderColor: '#DE728D',
    borderRadius: s(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#DE728D',
  },
  nextButton: {
    flex: 1,
    height: s(48),
    backgroundColor: '#DE728D',
    borderRadius: s(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default SecondaryGoalScreen;