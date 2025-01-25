import styles from '@/constants/testStyles';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';


export default function PasswordScreen() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value, // Update the specific field in the state
    });
  };

  const handleSubmit = () => {
    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    console.log('Password change submitted:', formData);
    
    // clear input
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Old password"
        placeholderTextColor="gray"
        secureTextEntry // Hides the text input
        value={formData.oldPassword}
        onChangeText={(value) => handleChange('oldPassword', value)} // Update old password
      />
      <TextInput
        style={styles.input}
        placeholder="New password"
        placeholderTextColor="gray"
        secureTextEntry 
        value={formData.newPassword}
        onChangeText={(value) => handleChange('newPassword', value)} // Update new password
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        placeholderTextColor="gray"
        secureTextEntry 
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)} // Update confirm password
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>Reset (TODO: functionality)</Text>
      </TouchableOpacity>
    </View>
  );
}
