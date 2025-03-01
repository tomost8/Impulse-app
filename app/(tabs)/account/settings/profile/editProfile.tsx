import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { processAndUploadImage } from '@/utils/imageProcessing';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
// Components
import ProfileScreen from '@/components/screens/profile/ProfileSetting/EditProfileScreen';
import EditProfileScreenOld from '@/components/old/account/EditProfileScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';



const EditProfilePage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number, !hasFetchedUser.current);

  useEffect(() => {
    if (!hasNewUserData) {
      return;
    }
    if (hasNewUserData) {
      userRef.current = user;
      initializeFormData();
      hasFetchedUser.current = true;
    }
    if (hasFetchedUser.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewUserData]);

  // Mutations
  const { updateUser } = useUpdateUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormSubmit = async (input: any) => {
    setIsSubmitting(true);
    try {
      // Check if profile_picture is not already uploaded to Firestore
      if (formData.profile_picture && !formData.profile_picture.includes("https://firebasestorage.googleapis.com")) {
        console.log('Processing profile picture:');
        const downloadURL = await processAndUploadImage(formData.profile_picture);
        formData.profile_picture = downloadURL;
      }
      const input = Object.fromEntries(
        Object.entries(formData)
          .filter(([key, value]) => value !== '' && key !== 'email')
          .map(([key, value]) => [
            key,
            key === 'age' ? Number(value) : value
          ])
      );
      // TODO: handle the case where secondary_goal is '' because the user wants no goal, has to be on backend side i think
      console.log('Form Data:', formData, '\nInput:', input);
      const response = await updateUser(input, authToken);
      if (response.success) {
        console.log('User Profile Updated', response.user);
      } else {
        throw new Error('updateUser response.success is false');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Form Data
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    age: '',
    gender: '',
    profile_picture: '',
    timezone: '',
    bio: '',
    primary_goal: '',
    secondary_goal: '',
  });

  const handleFormDataChange = (field: string, value: string) => {
    setFormData((formData) => ({
      ...formData,
      [field]: value,
    }));
  };

  const initializeFormData = () => {
    setFormData({
      profile_picture: userRef.current.profile_picture || '',
      email: userRef.current.email || '',
      first_name: userRef.current.first_name || '',
      last_name: userRef.current.last_name || '',
      username: userRef.current.username || '',
      age: userRef.current.age || '',
      gender: userRef.current.gender || '',
      timezone: userRef.current.timezone || '',
      bio: userRef.current.bio || '',
      primary_goal: userRef.current.primary_goal || '',
      secondary_goal: userRef.current.secondary_goal || '',
    });
  };

  // Debug
  const loading = isSubmitting;
  if (debugRenders && !loading) {
    console.log("Rendering EditProfilePage\n",
      "User:", userRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
      "Form Data:", formData, "\n",
    );
  }

  if (pageDisplay) {
    return (
      <ProfileScreen
        formData={formData}
        handleFormDataChange={handleFormDataChange}
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    );
  } else {
    return (
      <EditProfileScreenOld
        user={userRef.current}
        isUserLoading={!hasFetchedUser.current}
        formData={formData}
        handleFormDataChange={handleFormDataChange}
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    );
  }
}

export default AuthWrapper(EditProfilePage);