import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
// Components
import DeletionScreen from '@/components/screens/profile/ProfileSetting/SupportScreen';
import DeletionScreenOld from '@/components/old/account/DeletionScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';


const DeletionPage = (props: any) => {
  const { userId, authToken } = props;

  // Mutations
  const { updateUser } = useUpdateUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormSubmit = async () => {
    const { code } = formData;
    if (code === "INSPIRE") {
      console.log('Community Leader Code submitted: ', formData);
      setIsSubmitting(true);
      try {
        const input = {
          role: "INFLUENCER"
        }
        const response = await updateUser(input, authToken);
        if (response.success) {
          console.log('Profile updated successfully:', response);
        } else {
          console.log('Error updating user:', response.errors);
        }
      } catch (error) {
        console.error('Error updating user:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Invalid promotion code: ', formData);
    }
  };

  // Form data
  const [formData, setFormData] = useState({
    code: '',
  });

  const handleFormDataChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Debug
  const loading = isSubmitting;
  if (debugRenders && !loading) {
    console.log("Rendering DeletionPage");
  }

  if (pageDisplay) {
    return (
      <DeletionScreen
        formData={formData}
        handleFormDataChange={handleFormDataChange}
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    )
  } else {
    return (
      <DeletionScreenOld
        formData={formData}
        handleFormDataChange={handleFormDataChange}
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    )
  }
}

export default AuthWrapper(DeletionPage);
