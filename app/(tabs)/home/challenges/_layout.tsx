import { Stack } from 'expo-router';

export default function ChallengesLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Challenges',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="addChallenge" 
        options={{ 
          title: 'Join Challenge',
          headerShown: false 
        }} 
      />
    </Stack>
  );
}



