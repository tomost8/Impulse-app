import { Stack } from 'expo-router';

export default function SocialLayout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        animation: 'none'
      }}
    >
      <Stack.Screen 
        name="."
        options={{
          headerShown: false,
          title: 'Social'
        }}
      />
      <Stack.Screen 
        name="explore"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="createCommunity"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}

