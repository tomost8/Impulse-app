import { useState } from 'react';
import styles from '@/utils/testStyles';
import { View, TextInput, Button, Text, Platform, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import GoalSelector from '@/components/GoalSelector';
import { goals, getCategoryById } from '@/utils/goals';

import { auth } from '@/config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH} from '@/hooks/graphql/auth';
import { UPDATE_USER } from '@/hooks/graphql/users/mutations';
import { useMutation } from '@apollo/client';
import { useUserInfo } from '@/services/UserContext';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';

import SecondaryGoalScreen from '@/components/screens/SignupLogin/Signup/secondaryGoal';

// Signup Page 4
export default function SecondaryGoal() {
  const params = useLocalSearchParams();
  const { email, password, primaryGoal, firstName, lastName, username, age, gender, timezone, bio } = params;
  return <SecondaryGoalScreen primaryGoalId={Number(primaryGoal)} />;

  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const handleBack = async () => {
    router.back();
  };

  const { login } = useUserInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firebaseAuth] = useMutation(FIREBASE_AUTH, {
    onError: (error: any) => {
      console.error('GraphQL Error:', error);
      setError(error.message);
    }
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onError: (error) => {
      console.error('GraphQL Error:', error);
      setError(error.message);
    }
  });

  const handleSignup = async () => {
    console.log("params", params);
    //console.log("Primary Goal Category:", getCategoryById(Number(primaryGoal)));
    console.log("Secondary Goal Selected", getCategoryById(selectedGoal));
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email as string, password as string);
      const authToken = await userCredential.user.getIdToken();
      const { data } = await firebaseAuth({
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      });
      if (data?.firebaseAuth?.success) {
        const userData = data.firebaseAuth.user;
        console.log("Firebase Auth User Data Created:", userData);
        await login(authToken, userData.id);
      } else {
        throw new Error("firebaseAuth failed: firebaseAuth.success is false");
      }
      const input = {
        username,
        first_name: firstName,
        last_name: lastName,
        age: Number(age),
        gender,
        timezone,
        bio,
        primary_goal: getCategoryById(Number(primaryGoal)),
        secondary_goal: getCategoryById(selectedGoal),
        profile_picture: DEFAULT_PROFILE_PICTURE,
      }
      const { data: updateData } = await updateUser({
        variables: { input },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      });
      console.log("Backend User Data Created:", updateData.updateUser.user, "Redirecting to Home");
      router.replace('/(tabs)/home');
    } catch (error) {
      console.log('Signup failed', error);
      setError(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Your Secondary Goal</Text>
      <Text style={styles.text}>Pick a second goal or stick to just one. 
        Keeping it simple helps you stay focused and make real progress.
      </Text>
      <Text style={styles.text}>Your goal selections aren't permanent, 
        you can update this anytime in Settings. 
      </Text>
      <GoalSelector 
        selectedGoal={selectedGoal} 
        setSelectedGoal={setSelectedGoal} 
        primaryGoal={Number(primaryGoal)}
      />
      <Button 
        title="Back" 
        onPress={handleBack}
      />
      <Button 
        title="Finish" 
        onPress={handleSignup}
      />
    </View>
  );
}