import { Stack } from 'expo-router';
import { SignupProvider } from '@/contexts/SignupContext';

export default function AuthLayout() {
  return (
    <SignupProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="getStarted"
          options={{ headerShown: false }}
          component={require('./getStarted').default}
        />
        <Stack.Screen 
          name="createAccount"
          options={{ headerShown: false }}
          component={require('./createAccount').default}
        />
        <Stack.Screen 
          name="personalProfile"
          options={{ headerShown: false }}
          component={require('./personalProfile').default}
        />
        <Stack.Screen 
          name="primaryGoal"
          options={{ headerShown: false }}
          component={require('./primaryGoal').default}
        />
        <Stack.Screen 
          name="secondaryGoal"
          options={{ headerShown: false }}
          component={require('./secondaryGoal').default}
        />
      </Stack>
    </SignupProvider>
  );
} 