import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function ActivityDetailsScreenOld({
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
        <View style={styles.section}>
          <Text style={styles.text}>Activity edit form here</Text>
          <TextInput
            style={styles.input}
            placeholder="Start Time"
            placeholderTextColor="gray"
            value={formData.startTime.slice(11, 16)} // Display only HH:MM
            onChangeText={(value) => handleFormDataChange('startTime', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Duration"
            placeholderTextColor="gray"
            value={formData.duration}
            onChangeText={(value) => handleFormDataChange('duration', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="gray"
            value={formData.description}
            onChangeText={(value) => handleFormDataChange('description', value)}
          />
          <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/home/activityAdd')}>
          <Text style={styles.text}>
            Add new daily goal
          </Text>
        </TouchableOpacity>
      </View>
    );
  }