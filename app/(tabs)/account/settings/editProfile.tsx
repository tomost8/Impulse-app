import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { processAndUploadImage } from '@/utils/imageProcessing';
// GraphQL hooks
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
// Components
import ProfileScreen from '@/components/screens/profile/ProfileSetting/EditProfileScreen';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserAuth } from '@/services/AuthContext';
import { useUserData } from '@/services/UserPreferencesContext';



const EditProfilePage = () => {
  const { authToken } = useUserAuth();
  const { fetching, user } = useUserData();

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
  
  useEffect(() => {
    if (user) {
      setFormData({
        profile_picture: user.profile_picture || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        username: user.username || '',
        age: user.age || '',
        gender: user.gender || '',
        timezone: user.timezone || '',
        bio: user.bio || '',
        primary_goal: user.primary_goal || '',
        secondary_goal: user.secondary_goal || '',
      });
    }
  }, [user]);

  const handleFormDataChange = (field: string, value: string) => {
    setFormData((formData) => ({
      ...formData,
      [field]: value,
    }));
  };

  // Mutations
  const { updateUser } = useUpdateUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (input: any) => {
    if (fetching || !user?.id) {
      console.warn('Cannot update user profile: User data is not yet available');
      return;
    }
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
      const response = await updateUser(input, authToken as string);
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

  // Debug
  const loading = isSubmitting;
  if (debugRenders && !loading) {
    console.log("Rendering EditProfilePage\n",
      "User:", user, "\n",
      "Form Data:", formData, "\n",
    );
  }

  return (
    <ProfileScreen
      formData={formData}
      handleFormDataChange={handleFormDataChange}
      handleFormSubmit={handleFormSubmit}
      isSubmitting={isSubmitting}
    />
  );
}

export default AuthWrapper(EditProfilePage);