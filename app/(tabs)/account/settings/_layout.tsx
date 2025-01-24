import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="deletion" 
        options={{ headerShown: true }}
      />
      <Stack.Screen 
        name="password" 
        options={{ headerShown: true }}
      />    
      <Stack.Screen 
        name="profile" 
        options={{ headerShown: true }}
      />
      <Stack.Screen 
        name="notifications" 
        options={{ headerShown: true }}
      />
      <Stack.Screen 
        name="feedback" 
        options={{ headerShown: true }}
      />
    </Stack>
  );
}
