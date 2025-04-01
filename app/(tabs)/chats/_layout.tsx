import { Stack } from 'expo-router';

export default function ChatsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="addFriends" />
      <Stack.Screen name="groupCreate" />
      <Stack.Screen name="groupJoin" />
      <Stack.Screen name="requests" />
    </Stack>
  );
}

