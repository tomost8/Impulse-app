import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="getStarted" />
      <Stack.Screen name="createAccount" />
      <Stack.Screen name="personalProfile" />
      <Stack.Screen name="primaryGoal" />
      <Stack.Screen name="secondaryGoal" />
    </Stack>
  );
} 