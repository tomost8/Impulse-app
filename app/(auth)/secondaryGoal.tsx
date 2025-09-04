import SecondaryGoalScreen from '@/components/screens/SignupLogin/Signup/secondaryGoal';
import { useAuth } from '@/contexts/AuthContext';
import { getCategoryById } from '@/utils/goals';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';
import { router } from 'expo-router';
import { useState } from 'react';
// GraphQL + Auth
import { useMutation } from '@apollo/client';
import { FIREBASE_AUTH } from '@/hooks/graphql/auth';
import { UPDATE_USER } from '@/hooks/graphql/users/mutations';
import { getAuth } from '@/config/firebaseConfig';
import { createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { useCreateCommunityMember } from '@/hooks/graphql/communities/mutations';

// Signup Page 4
export default function SecondaryGoal() {
  const {login} = useAuth();
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
      // 1. Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(getAuth(), formData.email as string, formData.password as string);
      console.log("✅ Firebase User Created:", { uid: userCredential.user.uid, email: userCredential.user.email });
      
      // 2. Create backend user using Firebase ID token
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
        console.log("✅ Backend User Created:", {
          email: userData.email,
          firebase_uid: userData.firebase_uid,
          id: userData.id
        });

        // 3. Update user profile with all data
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
        
        const { data: updateData } = await updateUser({
          variables: { input },
          context: {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        });
        // Filter out system fields from result
        const { __typename, email, id, role, status, is_double_cam, ...profileData } = updateData.updateUser.user;
        console.log("✅ Profile Updated:\n📤 Input:", JSON.stringify(input, null, 2), "\n📥 Result:", JSON.stringify(profileData, null, 2));
        
        // 4. Handle community membership if applicable
        if (formData.communityId) {
          console.log("Join with Community Code:", formData.code, formData.communityId);
          await handleCreateCommunityMember(userData.id, formData.communityId);
          console.log("Community Member created successfully");
        }
        
        // 5. Login only after profile is complete
        await login(authToken, userData.id, false, formData.email as string);
        console.log("User logged in with complete profile, redirecting to Home");
        
        // 6. Navigate to main app
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