import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
// Components
import DeletionScreen from '@/components/screens/profile/ProfileSetting/SupportScreen';
// Debug
import { debugRenders } from '@/debug/utils';
// Services
import { useAuth } from '@/contexts/AuthContext';


const DeletionPage = () => {
  const { authToken } = useAuth();

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
