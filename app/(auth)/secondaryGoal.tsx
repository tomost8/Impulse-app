import { useState } from 'react';
import { router } from 'expo-router';
// Services
import { useMutation } from '@apollo/client';
import mixpanel from '@/config/mixpanelConfig';
import { getAuth } from '@/config/firebaseConfig';
import { createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { useAuth } from '@/contexts/AuthContext';
// GraphQL Hooks
import { FIREBASE_AUTH } from '@/hooks/graphql/auth';
import { UPDATE_USER } from '@/hooks/graphql/users/mutations';
import { useCreateCommunityMember } from '@/hooks/graphql/communities/mutations';
// Utils
import { getCategoryById } from '@/utils/goals';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';
import { uploadImage } from '@/utils/imageProcessing';
// Components
import SecondaryGoalScreen from '@/components/screens/auth/SecondaryGoalScreen';
import EmailTakenModal from '@/components/screens/auth/EmailTakenModal';

// Signup Page 4
export default function SecondaryGoal() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);

  // Mutations
  const [firebaseAuth] = useMutation(FIREBASE_AUTH);
  const [updateUser] = useMutation(UPDATE_USER); 
  
  const { createCommunityMember } = useCreateCommunityMember();
  const handleCreateCommunityMember = async (userId: number, communityId: number) => {
    try {
      const input = {
        community_id: communityId,
        user_id: userId
      };
      const response = await createCommunityMember(input);
      if (response.success) {
        mixpanel.trackEvent('Community Joined', {
          timestamp: new Date().toISOString(),
        });
        console.log("Community Member created successfully:", response);
      } else {
        console.error("Error creating community member:", response);
      }
    } catch (error) {
      console.error("Error creating community member:", error);
    }
  };

  const handleCreateAccount = async (formData: any, newEmail?: string, fromModal?: boolean): Promise<boolean> => {
    if (!fromModal) {
      setIsLoading(true);
    }
    try {
      // 1. Create Firebase user
      const emailToUse = newEmail || formData.email;
      const userCredential = await createUserWithEmailAndPassword(getAuth(), emailToUse as string, formData.password as string);
      console.log(`✅ Firebase User Created:\n  - Email: ${userCredential.user.email}\n  - Firebase UID: ${userCredential.user.uid}`);
      
      // 2. Get Firebase token directly from user (fixes race condition)
      const authToken = await userCredential.user.getIdToken();
      console.log(`🔐 Firebase token obtained:\n  - Token: ${authToken.substring(0, 10)}...${authToken.substring(authToken.length - 10)}\n  - Firebase UID: ${userCredential.user.uid}\n  - Email: ${userCredential.user.email}`);
      
      const { data } = await firebaseAuth({
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        },
        fetchPolicy: 'no-cache',
      });
      
      if (data?.firebaseAuth?.success) {
        const userData = data.firebaseAuth.user;
        console.log(`✅ Backend User Created:\n  - Email: ${userData.email}\n  - Firebase UID: ${userData.firebase_uid}\n  - UID: ${userData.id}`);
        
        // Check Firebase UID consistency - fail early if they don't match
        const firebaseUID = userCredential.user.uid;
        const backendUID = userData.firebase_uid;
        const firebaseEmail = userCredential.user.email;
        const backendEmail = userData.email;
        
        if (firebaseUID !== backendUID || firebaseEmail !== backendEmail) {
          console.error("❌ Firebase and Backend user data mismatch - signup will fail");
          throw new Error(`User data mismatch: Firebase(${firebaseEmail}, ${firebaseUID}) vs Backend(${backendEmail}, ${backendUID})`);
        } else {
          console.log("✅ Firebase and Backend user data match");
        }

        // 3. Upload profile picture if provided, otherwise use default
        let profilePictureUrl = DEFAULT_PROFILE_PICTURE;
        if (formData.profilePicture) {
          try {
            profilePictureUrl = await uploadImage(formData.profilePicture, 'profile_pictures');
            console.log("✅ Profile Picture Uploaded:", profilePictureUrl);
          } catch (error) {
            console.error("❌ Profile Picture Upload Failed:", error);
          }
        }

        // 4. Update user profile with all data
        const input = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          age: Number(formData.age),
          gender: formData.gender,
          timezone: formData.timezone.split(' ')[0],
          profile_picture: profilePictureUrl,
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
        
        if (updateData?.updateUser?.success && updateData?.updateUser?.user) {
          const { __typename, email, id, role, status, is_double_cam, ...profileData } = updateData.updateUser.user;

          const user = updateData.updateUser.user;
          // --- MIXPANEL TRACKING: Sign Up Completed ---
          mixpanel.trackEvent('Sign Up Completed', {
            timestamp: new Date().toISOString(), // Use server time if possible
            email: user.email,      // Add more props as desired.
            method: 'email', // Or 'google' / etc. if you support SSO
          });
          // Note: User identification will be handled in _layout.tsx after login

          // Sanity check: input and result match for shared fields
          const sharedFields = Object.keys(input).filter(key => key in profileData);
          const fieldsMatch = sharedFields.every(field => (input as any)[field] === (profileData as any)[field]);
          console.log("✅ Profile Updated", fieldsMatch ? "(Input matches result)" : "(Input differs from result)");
        } else {
          console.error("❌ Profile Update Failed:", updateData?.updateUser);
          throw new Error("Profile update failed");
        }
        
        // 5. Handle community membership if applicable
        if (formData.communityId) {
          console.log("Join with Community Code:", formData.code, formData.communityId);
          await handleCreateCommunityMember(userData.id, formData.communityId);
          console.log("Community Member created successfully");
        }
        
        // 6. Login only after profile is complete
        await login(authToken, userData.id, userCredential.user.uid, true, formData.email as string);
        console.log("✅ User logged in successfully, redirecting to homepage with welcome popup");
        router.replace('/(tabs)/home?welcome=true');
        return true; // Success
      } else {
        throw new Error("firebaseAuth failed: firebaseAuth.success is false");
      }
    } catch (error: any) {
      // Handle email already exists error
      if (error.code === 'auth/email-already-in-use') {
        setEmailModalVisible(true);
        return false; // Failure
      } else {
        console.error('Signup failed', error);
      }
      // For other errors, you might want to show a generic error message or handle them differently
      return false; // Failure
    } finally {
      if (!fromModal) {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <SecondaryGoalScreen 
        isLoading={isLoading}
        handleCreateAccount={handleCreateAccount}
      />
      <EmailTakenModal
        visible={emailModalVisible}
        onClose={() => setEmailModalVisible(false)}
        handleCreateAccount={(formData, newEmail) => handleCreateAccount(formData, newEmail, true)}
      />
    </>
  );
}