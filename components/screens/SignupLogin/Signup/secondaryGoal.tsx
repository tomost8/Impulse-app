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

// Import the same goals array as primary
const ALL_GOALS = [
  { id: 1, name: 'Workout', icon: 'workout.png' },
  { id: 2, name: 'Studying / Working', icon: 'studyingworking.png' },
  { id: 3, name: 'Food', icon: 'food.png' },
  { id: 4, name: 'Wellness', icon: 'wellness.png' },
  { id: 5, name: 'Rise and Shine', icon: 'riseshine.png' },
  { id: 6, name: 'Passion / Hobby', icon: 'passionhobby.png' },
];

interface SecondaryGoalScreenProps {
  primaryGoalId: number;
}

const SecondaryGoalScreen: React.FC<SecondaryGoalScreenProps> = ({ primaryGoalId }) => {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  // Filter out the primary goal
  const availableGoals = ALL_GOALS.filter(goal => goal.id !== primaryGoalId);

  const handleGoalSelect = (goalId: number) => {
    // If clicking the same goal, unselect it
    if (selectedGoal === goalId) {
      setSelectedGoal(null);
    } else {
      // Select the new goal
      setSelectedGoal(goalId);
    }
  };

  const handleFinish = () => {
    // Will handle finish action later
    console.log('Finish pressed with goal:', selectedGoal);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bars */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFilled} />
          <View style={styles.progressFilled} />
          <View style={styles.progressFilled} />
        </View>
      </View>

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
              selectedGoal === goal.id && styles.goalCardSelected
            ]}
            onPress={() => handleGoalSelect(goal.id)}
          >
            <View style={styles.iconContainer}>
              <Image
                source={require(`@/assets/icons/${goal.icon}`)}
                style={[
                  styles.goalIcon,
                  selectedGoal === goal.id && styles.goalIconSelected
                ]}
              />
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
          style={styles.finishButton}
          onPress={handleFinish}
        >
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Use the same styles as PrimaryGoal with a few modifications
const styles = StyleSheet.create({
  // ... copy all styles from PrimaryGoal ...
  finishButton: {
    flex: 1,
    height: s(48),
    backgroundColor: '#DE728D',
    borderRadius: s(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButtonText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default SecondaryGoalScreen;
