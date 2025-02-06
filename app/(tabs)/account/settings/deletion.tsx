import styles from '@/constants/testStyles';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking } from 'react-native';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@/hooks/graphql/users/mutations';
import useUserInfo from '@/hooks/useUserInfo';


export default function DeletionScreen() {
  const { authToken } = useUserInfo();
  const [updateUser] = useMutation(UPDATE_USER);
  const [formData, setFormData] = useState({
    code: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value, // Update the specific field in the state
    });
  };

  const handleSubmit = async () => {
    const { code } = formData;
    if (code === "INSPIRE") {
      console.log('Community Leader Code submitted: ', formData);
      try {
        const { data } = await updateUser({
          variables: {
            input: {
              role: "INFLUENCER"
            },
          },
          context: {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        });
        console.log('Profile updated successfully:', data);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    } else {
      console.log('Invalid promotion code: ', formData);
    }
  };

  const handleFormPress = () => {
    Linking.openURL('https://share.hsforms.com/1w35t-H25T2CMEpiTciIoyAscwc9');
  };

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
        onChangeText={(value) => handleChange('code', value)} // Update code
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text}>Apply</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFormPress}>
        <Text style={styles.text}>Account Deletion Form</Text>
      </TouchableOpacity>
    </View>
  );
}