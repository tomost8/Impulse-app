import { Stack } from 'expo-router';

export default function AccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="friends" />
      <Stack.Screen name="communities" />
      <Stack.Screen name="referrals" />
    </Stack>
  );
}

