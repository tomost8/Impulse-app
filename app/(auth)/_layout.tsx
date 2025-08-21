import { Stack } from 'expo-router';
import { SignupProvider } from '@/contexts/SignupContext';

export default function AuthLayout() {
  return (
    <SignupProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="getStarted" /> 
        <Stack.Screen name="createAccount" />
        <Stack.Screen name="personalProfile" />
        <Stack.Screen name="primaryGoal" />
        <Stack.Screen name="secondaryGoal" />
      </Stack>
    </SignupProvider>
  );
} 