import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="activityAdd" 
        options={{ headerShown: true }}
      />
      <Stack.Screen 
        name="activityView" 
        options={{ headerShown: true }}
      />
      <Stack.Screen 
        name="leaderboards" 
        options={{ headerShown: true }}
      />
    </Stack>
  );
}

