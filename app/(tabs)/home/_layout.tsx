import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      {/* Home Screen */}
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />

      {/* Activity Add Screen */}
      <Stack.Screen 
        name="activityAdd" 
        options={{ headerShown: true, headerTitle: "Add Activity" }} 
      />

      {/* Activity View Screen */}
      <Stack.Screen 
        name="activityView" 
        options={{ headerShown: false }} 
      />

      {/* Leaderboard Screen */}
      <Stack.Screen 
        name="leaderboards" 
        options={{ 
          headerShown: true, 
          headerTitle: "Leaderboard",
          animation: "slide_from_right", // Smooth transition animation
        }} 
      />
    </Stack>
  );
}
