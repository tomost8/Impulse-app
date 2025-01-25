import styles from '@/constants/testStyles';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking } from 'react-native';


export default function DeletionScreen() {
  const [formData, setFormData] = useState({
    code: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value, // Update the specific field in the state
    });
  };

  const handleSubmit = () => {
    const { code } = formData;

    console.log('Community Leader Code submitted:', formData);
    
    // clear input
    setFormData({
      code: '',
    });
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
        secureTextEntry 
        value={formData.code}
        onChangeText={(value) => handleChange('code', value)} // Update code
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text}>Apply (TODO: functionality)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFormPress}>
        <Text style={styles.text}>Account Deletion Form</Text>
      </TouchableOpacity>
    </View>
  );
}