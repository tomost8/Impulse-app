import SecondaryGoalScreen from '@/components/screens/SignupLogin/Signup/secondaryGoal';
import { useUserAuth } from '@/services/AuthContext';
import { getCategoryById } from '@/utils/goals';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';
import { router } from 'expo-router';
import { useState } from 'react';
// GraphQL + Auth
import { useMutation } from '@apollo/client';
import { FIREBASE_AUTH } from '@/hooks/graphql/auth';
import { UPDATE_USER } from '@/hooks/graphql/users/mutations';
import { getAuth } from '@/config/firebaseConfig';
import { useCreateCommunityMember } from '@/hooks/graphql/communities/mutations';

// Signup Page 4
export default function SecondaryGoal() {
  const {login} = useUserAuth();
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
  // Mutations
  const { createCommunityMember } = useCreateCommunityMember();
  const [isCreatingCommunityMember, setIsCreatingCommunityMember] = useState(false);
  const handleCreateCommunityMember = async (userId: number, communityId: number) => {
    setIsCreatingCommunityMember(true);
    try {
      const input = {
        community_id: communityId,
        user_id: userId
      };
      const response = await createCommunityMember(input);
      if (response.success) {
        console.log("Community Member created successfully:", response);
      } else {
        console.error("Error creating community member:", response);
      }
    } catch (error) {
      console.error("Error creating community member:", error);
    } finally {
      setIsCreatingCommunityMember(false);
    }
  };

  const handleCreateAccount = async (formData: any) => {
    try {
      const userCredential = await getAuth().createUserWithEmailAndPassword(formData.email as string, formData.password as string);
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
        await login(authToken, userData.id, false, formData.email as string);

        const input = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          age: Number(formData.age),
          gender: formData.gender,
          timezone: formData.timezone.split(' ')[0],
          profile_picture: DEFAULT_PROFILE_PICTURE,
          bio: formData.bio,
          primary_goal: getCategoryById(Number(formData.primaryGoalId)),
          secondary_goal: getCategoryById(Number(formData.secondaryGoalId)),
        };
        console.log("Form Data:", formData, "\nInput:", input);
        const { data: updateData } = await updateUser({
          variables: { input },
          context: {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        });
        console.log("Backend User Data Created:", updateData.updateUser.user, "Redirecting to Home");
        
        if (formData.communityId) {
          console.log("Join with Community Code:", formData.code, formData.communityId);
          await handleCreateCommunityMember(userData.id, formData.communityId);
          console.log("Community Member created successfully:");
        }
        
        router.replace('/(tabs)/account/settings/featureGuide');
      } else {
        throw new Error("firebaseAuth failed: firebaseAuth.success is false");
      }
    } catch (error) {
      console.log('Signup failed', error);
      setError(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return <SecondaryGoalScreen handleCreateAccount={handleCreateAccount} />;
}