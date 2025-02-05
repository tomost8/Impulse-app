import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Login',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="signup1" 
        options={{ 
          title: "Sign Up",
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="signup2" 
        options={{ 
          title: "Additional Info",
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="signup3" 
        options={{ 
          title: "Primary Goal",
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="signup4" 
        options={{ 
          title: "Secondary Goal",
          headerShown: false 
        }} 
      />
    </Stack>
  );
} 