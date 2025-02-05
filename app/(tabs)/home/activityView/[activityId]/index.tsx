import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useGetActivities } from '@/hooks/graphql/useActivites';
import useUserInfo from '@/hooks/useUserInfo';
import { useMutation } from '@apollo/client';
import { UPDATE_ACTIVITY } from '@/hooks/graphql/constants/activities'; // Ensure this import is correct

export default function ActivityDetailsScreen() {

  const { userId, authToken} = useUserInfo();
  const details = useLocalSearchParams();
  const activityId = parseInt(details.activityId as string);
  console.log("activityId:", activityId);

  const [formData, setFormData] = useState({
    startTime: new Date().toISOString(), // Store full ISO string
    duration: '0',
    description: ''
  });

  const [updateActivity] = useMutation(UPDATE_ACTIVITY);

  const handleChange = (field: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const [hours, minutes] = formData.startTime.split(':'); // Split HH:MM
      const scheduledDatetime = new Date(); // Create a new date object
      scheduledDatetime.setHours(parseInt(hours), parseInt(minutes), 0, 0); // Set hours and minutes

      const { data } = await updateActivity({
        variables: {
          id: activityId, 
          input: {
            scheduledDatetime: scheduledDatetime.toISOString(), // Use the formatted date
            duration: parseInt(formData.duration), // Parse duration as an integer here
            description: formData.description
          }
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}` // Ensure authToken is defined
          }
        }
      });
      if (data.updateActivity.success) {
        console.log("Activity updated successfully", data);
      } else {
        console.error("Failed to update activity", data.updateActivity.errors);
      }
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Activity edit form here</Text>
        <TextInput
          style={styles.input}
          placeholder="Start Time"
          placeholderTextColor="gray"
          value={formData.startTime.slice(11, 16)} // Display only HH:MM
          onChangeText={(value) => handleChange('startTime', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Duration"
          placeholderTextColor="gray"
          value={formData.duration}
          onChangeText={(value) => handleChange('duration', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="gray"
          value={formData.description}
          onChangeText={(value) => handleChange('description', value)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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