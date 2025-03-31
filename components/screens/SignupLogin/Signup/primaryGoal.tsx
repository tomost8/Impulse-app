import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { s } from 'react-native-size-matters';
import { router } from 'expo-router';

const GOALS = [
  { id: 1, name: 'Workout', icon: 'workout.png' },
  { id: 2, name: 'Studying / Working', icon: 'studyingworking.png' },
  { id: 3, name: 'Food', icon: 'food.png' },
  { id: 4, name: 'Wellness', icon: 'wellness.png' },
  { id: 5, name: 'Rise and Shine', icon: 'riseshine.png' },
  { id: 6, name: 'Passion / Hobby', icon: 'passionhobby.png' },
];

const PrimaryGoalScreen = () => {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleGoalSelect = (goalId: number) => {
    // If clicking the same goal, unselect it
    if (selectedGoal === goalId) {
      setSelectedGoal(null);
    } else {
      // Select the new goal
      setSelectedGoal(goalId);
    }
    // Clear any error message when making a selection
    if (errorMessage) setErrorMessage('');
  };

  const handleNext = () => {
    if (!selectedGoal) {
      setErrorMessage('Please select a primary goal');
      return;
    }
    router.push({
      pathname: '/(auth)/secondaryGoal',
      params: { primaryGoalId: selectedGoal }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bars */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFilled} />
          <View style={styles.progressFilled} />
          <View style={styles.progressEmpty} />
        </View>
      </View>

      <Text style={styles.title}>Select your primary goal</Text>
      
      <Text style={styles.subtitle}>
        This app works best when you prioritize a single goal, helping you build a strong connection to your progress.
      </Text>

      <Text style={styles.description}>
        Each category is flexible—you can choose what specifically you want to work on within it
      </Text>

      {/* Error Message */}
      {errorMessage && (
        <Text style={styles.errorMessage}>Error: {errorMessage}</Text>
      )}

      {/* Goals Grid */}
      <View style={styles.goalsGrid}>
        {GOALS.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[
              styles.goalCard,
              selectedGoal === goal.id && styles.goalCardSelected
            ]}
            onPress={() => handleGoalSelect(goal.id)}
          >
            <View style={styles.iconContainer}>
              {/* comment out image for now since import broken
              <Image
                source={require(`@/assets/icons/${goal.icon}`)}
                style={[
                  styles.goalIcon,
                  selectedGoal === goal.id && styles.goalIconSelected
                ]}
              />
              */}
            </View>
            <Text style={[
              styles.goalText,
              selectedGoal === goal.id && styles.goalTextSelected
            ]}>
              {goal.name}
            </Text>
            {selectedGoal === goal.id && (
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
          style={[
            styles.nextButton,
            !selectedGoal && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: s(20),
  },
  progressContainer: {
    marginBottom: s(32),
  },
  progressBar: {
    flexDirection: 'row',
    gap: s(4),
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
  title: {
    fontSize: s(32),
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: s(16),
  },
  subtitle: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    color: '#242020',
    marginBottom: s(16),
    lineHeight: s(20),
  },
  description: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    color: '#242020',
    marginBottom: s(32),
    lineHeight: s(20),
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: s(16),
    marginBottom: s(32),
  },
  goalCard: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: s(16),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    padding: s(16),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // For positioning the check icon
  },
  goalCardSelected: {
    borderColor: '#DE728D',
    borderWidth: 2,
    backgroundColor: '#FEF0F4',
  },
  iconContainer: {
    width: s(64),
    height: s(64),
    borderRadius: s(32),
    backgroundColor: '#FEF0F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(12),
  },
  goalIcon: {
    width: s(32),
    height: s(32),
    tintColor: '#DE728D',
  },
  goalIconSelected: {
    tintColor: '#DE728D',
  },
  goalText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    color: '#242020',
    textAlign: 'center',
  },
  goalTextSelected: {
    color: '#242020',
    fontWeight: '600',
  },
  checkIcon: {
    position: 'absolute',
    top: s(12),
    right: s(12),
    width: s(20),
    height: s(20),
  },
  errorMessage: {
    color: '#DE728D',
    fontSize: s(12),
    fontFamily: 'Open Sans',
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
  nextButtonDisabled: {
    backgroundColor: '#E1E1E1',
  },
});

export default PrimaryGoalScreen;
