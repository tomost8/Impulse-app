import { useState } from 'react';
import styles from '@/utils/testStyles';
import { View, TextInput, Button, Text, Platform, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import PrimaryGoalScreen from '@/components/screens/SignupLogin/Signup/primaryGoal';

// Signup Page 3
export default function PrimaryGoal() {
  return <PrimaryGoalScreen />;

  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const params = useLocalSearchParams();
  const { email, password, firstName, lastName, username, age, gender, timezone, bio } = params;

  const handleBack = async () => {
    router.back();
  };

  const handleNext = async () => {
    router.push({
      pathname: '/(auth)/secondaryGoal',
      params: {
        email,
        password,
        primaryGoal: selectedGoal,
        firstName,
        lastName,
        username,
        age,
        gender,
        timezone,
        bio
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Your Primary Goal</Text>
      <Text style={styles.text}>This app works best when you prioritize a single goal, helping you build a strong connection to
        your progress.
      </Text>
      <Text style={styles.text}>Each category is flexible - you can choose what specifically you want to work on within it.
      </Text>
      <Button 
        title="Back" 
        onPress={handleBack}
      />
      <Button 
        title="Next" 
        onPress={handleNext}
        disabled={!selectedGoal}
      />
    </View>
  );
}