import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="index" />
      <Stack.Screen name="activityAdd" />
      <Stack.Screen name="viewActivity" />
      <Stack.Screen name="leaderboards" />
    </Stack>
  );
}
