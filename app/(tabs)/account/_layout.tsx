import { Stack } from 'expo-router';

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ headerShown: true }}
      />
      <Stack.Screen 
        name="friends" 
        options={{ headerShown: true }}
      />
      <Stack.Screen 
        name="communities" 
        options={{ headerShown: true }}
      />
    </Stack>
  );
}

