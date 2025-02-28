import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
// Components
import ProfileScreen from '@/components/screens/profile/ProfileSetting/EditProfileScreen';
import EditProfileScreenOld from '@/components/old/account/EditProfileScreen';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';
import { processAndUploadImage, pickImage as pickImageFromProcessing } from '@/utils/imageProcessing';



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
      console.log('Form Data:', formData);
      // Check if profile_picture has a value and process it
      if (formData.profile_picture) {
        console.log('Processing profile picture:', formData.profile_picture);
        const downloadURL = await processAndUploadImage(formData.profile_picture);
        formData.profile_picture = downloadURL; // Update the profile_picture with the download URL
      }

      const input = Object.fromEntries(
        Object.entries(formData)
          .filter(([key, value]) => value !== '' && key !== 'email')
          .map(([key, value]) => [
            key,
            key === 'age' ? Number(value) : value
          ])
      );
      console.log('Input:', input);
      const response = await updateUser(input, authToken);
      console.log('User updated successfully:', response);
    } catch (error) {
      console.error('Error updating user:', error);
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

  if (!userRef.current?.profile_picture) {
    formData.profile_picture = DEFAULT_PROFILE_PICTURE;
    console.log("Setting default profile picture", formData);
  } else {
    formData.profile_picture = '';
    console.log("Resetting profile picture form data", formData);
  }

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
        user={userRef.current}
        isUserLoading={!hasFetchedUser.current}
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