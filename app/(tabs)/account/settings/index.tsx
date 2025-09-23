import SettingsScreen from '@/components/screens/account/settings/SettingsScreen';
// GraphQL hooks
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useState } from 'react';

export default function SettingsPage() {
  const { authToken } = useAuth();
  const { fetching, user, setUser } = useDataProvider();

  // Mutations
  const { updateUser } = useUpdateUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormSubmit = async (isEnabled: any) => {
    setIsSubmitting(true);
    try {
      const input = {
        is_double_cam: isEnabled,
      };
      const response = await updateUser(input, authToken as string);
      if (response.success) {
        console.log('✅ updateUser mutation successful: double cam setting updated');
        setUser(response.user);
      } else {
        throw new Error('updateUser response.success is false');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = fetching || isSubmitting;
  return (
    <SettingsScreen 
      loading={isLoading}
      isDoubleCameraEnabled={user?.is_double_cam}
      onToggleDoubleCamera={handleFormSubmit}
    />
  );
}