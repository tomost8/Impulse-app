import { Stack } from 'expo-router';

export default function CommunitiesLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="explore" 
        options={{ headerShown: true }}
      />
      <Stack.Screen 
        name="createCommunity" 
        options={{ headerShown: true }}
      />
    </Stack>
  );
}

