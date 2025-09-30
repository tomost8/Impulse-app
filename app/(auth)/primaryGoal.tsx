import { useState } from 'react';
import styles from '@/utils/testStyles';
import { View, TextInput, Button, Text, Platform, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import PrimaryGoalScreen from '@/components/screens/auth/PrimaryGoalScreen';

// Signup Page 3
export default function PrimaryGoal() {
  return <PrimaryGoalScreen />;
}