import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { List, Menu, Checkbox } from 'react-native-paper';
import useUserInfo from '@/hooks/useUserInfo';
import { useMutation } from '@apollo/client';
import { CREATE_ACTIVITY } from '@/hooks/graphql/constants/activities';

export default function ActivityAddScreen() {
  const { authToken, userId } = useUserInfo();
  const [createActivityMutation] = useMutation(CREATE_ACTIVITY);
  const [visible, setVisible] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleActivityCreation = async (category: string, date?: string) => {
    const activityDate = date || new Date().toISOString(); 
    const input = {
      category: category,
      scheduledDatetime: activityDate, // Make sure to handle time zone, server stores data in UTC
      // Add other necessary fields here: description, duration, datetime are forms
    };

    try {
      const { data } = await createActivityMutation({
        variables: { input },
        context: { 
          headers: { Authorization: `Bearer ${authToken}` } // Pass the authToken in headers
        },
      });
      if (data.createActivity.success) {
        console.log("Activity created successfully", data);
      } else {
        console.error("Error creating activity:", data);
      }
    } catch (error) {
      console.error("Error creating activity:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleSelectActivity = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) ? prev.filter(a => a !== activity) : [...prev, activity]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Activities:</Text>
      <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {['Food', 'Wellness', 'Working Out', 'Studying / Working', 'Rise and Shine', 'My Passion / Hobby'].map(activity => (
          <TouchableOpacity
            key={activity}
            style={{ flexDirection: 'row', alignItems: 'center', margin: 5, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
            onPress={() => handleSelectActivity(activity)}
          >
            <Checkbox
              status={selectedActivities.includes(activity) ? 'checked' : 'unchecked'}
              onPress={() => handleSelectActivity(activity)}
            />
            <Text style={styles.text}>{activity}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => {
          selectedActivities.forEach(activity => handleActivityCreation(activity)); // Call handleActivityCreation for each selected activity
        }}
      >
        <Text style={styles.text}>Create Activities</Text>
      </TouchableOpacity>
    </View>
  );
}