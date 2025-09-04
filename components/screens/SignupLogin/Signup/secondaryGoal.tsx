import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { s } from 'react-native-size-matters';
import { router, useLocalSearchParams } from 'expo-router';
import { goals } from '@/utils/goals';
import { useSignup } from '@/contexts/SignupContext';
import LoadingScreen from '@/components/ui/common/loading';

interface SecondaryGoalScreenProps {
  isLoading: boolean;
  handleCreateAccount: (formData: any) => void;
}

const SecondaryGoalScreen = ({ isLoading, handleCreateAccount }: SecondaryGoalScreenProps) => {
  if (isLoading) {
    return <LoadingScreen />;
  }
  const { signupData, updateSignupData } = useSignup();
  const { primaryGoalId } = useLocalSearchParams<{ primaryGoalId: string }>();

  // Filter out the primary goal
  const availableGoals = goals.filter(goal => goal.id !== Number(primaryGoalId));

  const handleGoalSelect = (goalId: number) => {
    // If clicking the same goal, unselect it
    if (signupData.secondaryGoalId === goalId) {
      updateSignupData({ secondaryGoalId: null });
    } else {
      // Select the new goal
      updateSignupData({ secondaryGoalId: goalId });
    }
  };

  const handleFinish = () => {
    const formData = {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      username: signupData.username,
      password: signupData.password,
      age: signupData.age,
      gender: signupData.gender,
      timezone: signupData.timezone,
      bio: signupData.bio,
      profilePicture: signupData.profilePicture,
      code: signupData.code,
      communityId: signupData.communityId,
      primaryGoalId: signupData.primaryGoalId,
      secondaryGoalId: signupData.secondaryGoalId,
    }
    handleCreateAccount(formData);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Progress Bars */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFilled} />
          <View style={styles.progressFilled} />
          <View style={styles.progressFilled} />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Select your secondary goal</Text>
        
        <Text style={styles.subtitle}>
          Pick a second goal or stick to just one. Keeping it simple helps you stay focused and make real progress.
        </Text>

        <Text style={styles.description}>
          Your goal selections aren't permanent, you can update this anytime in Settings.
        </Text>

        {/* Goals Grid */}
        <View style={styles.goalsGrid}>
          {availableGoals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalCard,
                signupData.secondaryGoalId === goal.id && styles.goalCardSelected
              ]}
              onPress={() => handleGoalSelect(goal.id)}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={goal.icon as ImageSourcePropType}
                  style={[
                    styles.goalIcon,
                    signupData.secondaryGoalId === goal.id && styles.goalIconSelected
                  ]}
                />
              </View>
              <Text style={[
                styles.goalText,
                signupData.secondaryGoalId === goal.id && styles.goalTextSelected
              ]}>
                {goal.label}
              </Text>
              {signupData.secondaryGoalId === goal.id && (
                <Image
                  source={require('@/assets/icons/checkGreen.png')}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

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
  goalCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: s(16),
    padding: s(16),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    alignItems: 'center',
    marginBottom: s(10),
  },
  goalCardSelected: {
    borderColor: '#DE728D',
    borderWidth: 2,
  },
  iconContainer: {
    width: s(55),
    height: s(55),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: s(8),
  },
  goalIcon: {
    width: s(55),
    height: s(55),
    tintColor: '#DE728D',
  },
  goalIconSelected: {
    tintColor: '#DE728D',
  },
  goalText: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#242020',
    textAlign: 'center',
  },
  goalTextSelected: {
  },
  checkIcon: {
    width: s(30),
    height: s(30),
    position: 'absolute',
    top: s(8),
    right: s(8),
  },
  errorMessage: {
    color: '#DE728D',
    fontSize: s(12),
    fontFamily: 'Open Sans',
    marginBottom: s(16),
    marginTop: -15, 
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
