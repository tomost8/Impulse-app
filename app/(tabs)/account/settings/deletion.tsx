import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
// Components
import DeletionScreen from '@/components/screens/account/settings/SupportScreen';
// Services
import { useAuth } from '@/contexts/AuthContext';


const DeletionPage = () => {
  const { authToken } = useAuth();

  // Mutations
  const { updateUser } = useUpdateUser();
  const handleUpdateToLeader = async () => {
    try {
      const input = {
        role: "INFLUENCER"
      }
      const response = await updateUser(input, authToken as string);
      if (response.success) {
        console.log('✅ updateUser mutation successful: role updated to INFLUENCER');
      } else {
        throw new Error('updateUser response.success is false');
      }
    } catch (error) {
      console.error('Error change user role:', error);
      throw error; // Re-throw so SupportScreen can handle the error
    }
  }

  return (
    <DeletionScreen
      handleUpdateUser={handleUpdateToLeader}
    />
  )
}

export default AuthWrapper(DeletionPage);
