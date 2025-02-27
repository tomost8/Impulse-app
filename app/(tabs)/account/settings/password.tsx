import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// Components
import styles from '@/utils/testStyles';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

function PasswordScreen({
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
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Old password"
        placeholderTextColor="gray"
        secureTextEntry // Hides the text input
        value={formData.oldPassword}
        onChangeText={(value) => handleFormDataChange('oldPassword', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="New password"
        placeholderTextColor="gray"
        secureTextEntry 
        value={formData.newPassword}
        onChangeText={(value) => handleFormDataChange('newPassword', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        placeholderTextColor="gray"
        secureTextEntry 
        value={formData.confirmPassword}
        onChangeText={(value) => handleFormDataChange('confirmPassword', value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={styles.text}>Reset (TODO: functionality)</Text>
      </TouchableOpacity>
    </View>
  );
}

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

  return <PasswordScreen
    formData={formData}
    handleFormDataChange={handleFormDataChange}
    handleFormSubmit={handleFormSubmit}
    isSubmitting={isSubmitting}
  />
}

export default AuthWrapper(PasswordPage);