import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// Components
import PasswordScreen from '@/components/screens/profile/ProfileSetting/ResetPasswordScreen';
import PasswordScreenOld from '@/components/old/account/PasswordScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';

const PasswordPage = (props: any) => {
  const { userId, authToken } = props;

  // TODO: Implement Firebase Password Reset
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormSubmit = () => {
    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    console.log('Password change submitted:', formData);
    
    // Clear form data after submitting
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  // Form data
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleFormDataChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const loading = isSubmitting;

  return <PasswordScreen
    loading={loading}
  />
}

export default AuthWrapper(PasswordPage);