import styles from '@/utils/testStyles';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function PasswordScreenOld({
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