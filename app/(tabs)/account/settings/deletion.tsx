import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
// Components
import DeletionScreen from '@/components/screens/profile/ProfileSetting/SupportScreen';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';


const DeletionPage = () => {
  const { authToken } = useUserInfo();

  // Mutations
  const { updateUser } = useUpdateUser();
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const handleUpdateToLeader = async () => {
    setIsUpdatingUser(true);
    try {
      const input = {
        role: "INFLUENCER"
      }
      const response = await updateUser(input, authToken as string);
      if (response.success) {
        console.log('Profile updated successfully:', response.user);
      } else {
        throw new Error('updateUser response.success is false');
      }
    } catch (error) {
      console.error('Error change user role:', error);
    } finally {
      setIsUpdatingUser(false);
    }
  }

  // Debug
  const loading = isUpdatingUser;

  return (
    <DeletionScreen
      loading={loading}
      handleUpdateUser={handleUpdateToLeader}
    />
  )
}

export default AuthWrapper(DeletionPage);
