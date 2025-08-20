import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// Components
import PasswordScreen from '@/components/screens/profile/ProfileSetting/ResetPasswordScreen';
// Firebase
import auth from '@react-native-firebase/auth';
// Debug

const PasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (oldPassword: string, newPassword: string) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const user = auth().currentUser;
      
      if (!user || !user.email) {
        throw new Error('User not found or email not verified');
      }

      // First, re-authenticate the user with their old password
      const credential = auth.EmailAuthProvider.credential(user.email, oldPassword);
      await user.reauthenticateWithCredential(credential);
      
      // If re-authentication successful, update to new password
      await user.updatePassword(newPassword);
      //console.log('Password updated successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
      console.error('Password update error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loading = isSubmitting;

  return <PasswordScreen
    loading={loading}
    errorMessage={error || ''}
    handleResetPassword={handleFormSubmit}
  />
}

export default AuthWrapper(PasswordPage);