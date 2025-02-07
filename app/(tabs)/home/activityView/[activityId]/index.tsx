import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useUpdateActivity } from '@/hooks/graphql/activities/mutations';
// Components
// Debug
import { debugRenders } from '@/constants/debug';

function ActivityDetailsScreen({
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

const ActivityDetailsPage = (props: any) => {
  const { activityId } = useLocalSearchParams(); // string
  const { userId, authToken} = props;
  const [renderCounter, setRenderCounter] = useState(0);

  const { updateActivity } = useUpdateActivity();
  const [isUpdatingActivity, setIsUpdatingActivity] = useState(false);
  const handleUpdateActivity = async (input: any) => {
    setIsUpdatingActivity(true);
    try {
      const [hours, minutes] = formData.startTime.split(':'); // Split HH:MM
      const scheduledDatetime = new Date(); // Create a new date object
      scheduledDatetime.setHours(parseInt(hours), parseInt(minutes), 0, 0); // Set hours and minutes
      const input = {
        scheduledDatetime: scheduledDatetime.toISOString(), // Use the formatted date
        duration: parseInt(formData.duration), // Parse duration as an integer here
        description: formData.description
      }


      const response = await updateActivity(Number(activityId), input, authToken);
      if (response.success) {
        console.log("Activity updated successfully", response);
      } else {
        console.error("Failed to update activity", response.errors);
      }
    } catch (error) {
      console.error("Error updating activity:", error);
    } finally {
      setIsUpdatingActivity(false);
    }
  }

  // Form Data
  const [formData, setFormData] = useState({
    startTime: new Date().toISOString(), // Store full ISO string
    duration: '0',
    description: ''
  });

  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  
  // Debug
  if (debugRenders) {
    console.log('ActivityDetailsPage rendered');
  }

  return (
    <ActivityDetailsScreen
      formData={formData}
      handleFormDataChange={handleFormDataChange}
      handleFormSubmit={handleUpdateActivity}
      isSubmitting={isUpdatingActivity}
    />
  );
}

export default ActivityDetailsPage;