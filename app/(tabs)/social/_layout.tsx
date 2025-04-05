import { Stack } from 'expo-router';

export default function CommunitiesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="createCommunity" />
    </Stack>
  );
}

