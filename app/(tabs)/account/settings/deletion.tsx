import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
// Components
import styles from '@/constants/testStyles';
import { View, Text, TextInput, TouchableOpacity, Linking } from 'react-native';
// Debug
import { debugRenders } from '@/constants/debug';

function DeletionScreen({
  handleUpdateUser, 
  isUpdatingUser,
  formData,
  handleFormDataChange
}: { 
  handleUpdateUser: any, 
  isUpdatingUser: boolean,
  formData: any, 
  handleFormDataChange: any
}) {
  if (isUpdatingUser) {
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
      onPress={handleUpdateUser}>
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
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const handleUpdateUser = async () => {
    const { code } = formData;
    if (code === "INSPIRE") {
      console.log('Community Leader Code submitted: ', formData);
      setIsUpdatingUser(true);
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
        setIsUpdatingUser(false);
      }
    } else {
      console.log('Invalid promotion code: ', formData);
    }
  };

  // Form data
  const [formData, setFormData] = useState({
    code: '',
  });

  const handleFormDataChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Debug
  const loading = isUpdatingUser;
  if (debugRenders && !loading) {
    console.log("Rendering DeletionPage");
  }

  return (
    <DeletionScreen
      formData={formData}
      handleFormDataChange={handleFormDataChange}
      handleUpdateUser={handleUpdateUser}
      isUpdatingUser={isUpdatingUser}
    />
  );
}

export default AuthWrapper(DeletionPage);
