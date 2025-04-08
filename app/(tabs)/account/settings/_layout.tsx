import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="deletion" />
      <Stack.Screen name="password" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="feedback" />
      <Stack.Screen name="viewProfile" />
      <Stack.Screen name="editProfile" />
      <Stack.Screen name="featureGuide" />
    </Stack>
  );
}
