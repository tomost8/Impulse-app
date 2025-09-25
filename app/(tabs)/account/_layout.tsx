import { Stack } from 'expo-router';

export default function AccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="referrals" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="friends" />
      <Stack.Screen name="badges" />
      <Stack.Screen name="communities" />
    </Stack>
  );
}

