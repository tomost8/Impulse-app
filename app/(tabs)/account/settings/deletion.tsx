import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
// Components
import styles from '@/utils/testStyles';
import { View, Text, TextInput, TouchableOpacity, Linking } from 'react-native';
// Debug
import { debugRenders } from '@/utils/debug';

function DeletionScreen({
  formData,
  handleFormDataChange,
  handleFormSubmit, 
  isSubmitting,
}: {
  formData: any, 
  handleFormDataChange: any,
  handleFormSubmit: any, 
  isSubmitting: boolean,
}) {
  if (isSubmitting) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
          Email Us At
      </Text>
      <Text style={styles.text}>
          support@findyourimpulse.com
      </Text>
      <Text style={styles.text}>
          Community Leader Code
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter given code"
        placeholderTextColor="gray"
        value={formData.code}
        onChangeText={(value) => handleFormDataChange('code', value)}
      />
      <TouchableOpacity style={styles.button} 
      onPress={handleFormSubmit}>
          <Text style={styles.text}>Apply</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} 
      onPress={() => Linking.openURL('https://share.hsforms.com/1w35t-H25T2CMEpiTciIoyAscwc9')}>
        <Text style={styles.text}>Account Deletion Form</Text>
      </TouchableOpacity>
    </View>
  );
}

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

  return (
    <DeletionScreen
      formData={formData}
      handleFormDataChange={handleFormDataChange}
      handleFormSubmit={handleFormSubmit}
      isSubmitting={isSubmitting}
    />
  );
}

export default AuthWrapper(DeletionPage);
