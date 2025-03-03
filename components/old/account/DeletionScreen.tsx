import styles from '@/utils/testStyles';
import { View, Text, TextInput, TouchableOpacity, Linking } from 'react-native';

export default function DeletionScreenOld({
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