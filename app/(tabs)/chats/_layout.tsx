import { Stack } from 'expo-router';

export default function ChatsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="addFriends" 
        options={{ headerShown: true }}
      />
      <Stack.Screen 
        name="groupCreate" 
        options={{ headerShown: true }}
      />    
      <Stack.Screen 
        name="groupJoin" 
        options={{ headerShown: true }}
      />    
    </Stack>
  );
}

