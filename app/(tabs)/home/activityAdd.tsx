import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useCreateActivity } from '@/hooks/graphql/activities/mutations';
// Components
import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
// Debug
import { debugRenders } from '@/constants/debug';
import { router } from 'expo-router';

function AddActivityScreen({
  selectedActivities,
  handleSelectActivity,
  handleCreateActivity, 
  isSubmitting,
}: {
  selectedActivities: string[],
  handleSelectActivity: any,
  handleCreateActivity: any, 
  isSubmitting: boolean,
}) {
  if (isSubmitting) {
    return <Text>Loading...</Text>;
  }
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
          selectedActivities.forEach(activity => handleCreateActivity(activity)); // Call handleActivityCreation for each selected activity
        }}
      >
        <Text style={styles.text}>Create Activities</Text>
      </TouchableOpacity>
    </View>
  );
}

const AddActivityPage = (props: any) => {
  const { userId, authToken } = props;

  // Mutations
  const { createActivity } = useCreateActivity();
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const handleCreateActivity = async (activity: string, date?: string) => {
    setIsCreatingActivity(true);
    try {
      const activityDate = date || new Date(Date.now());
      const input = {
        category: activity,
        scheduledDatetime: activityDate, // Need to handle time zone, server is UTC
        //Description, duration, datetime are form inputs
      };
      const response = await createActivity(input, authToken);
      if (response.success) {
        router.back();
        console.log("Activity created successfully", response);
        console.log("Scheduled datetime:", activityDate);
      } else {
        console.error("Error creating activity:", response);
      }
    } catch (error) {
      console.error("Error creating activity:", error);
    } finally {
      setIsCreatingActivity(false);
    }
  }

  // Form data
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleSelectActivity = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) ? prev.filter(a => a !== activity) : [...prev, activity]
    );
  };

  // Debug
  const loading = isCreatingActivity;
  if (debugRenders && !loading) {
    console.log("Rendering AddActivityPage");
  }

  return <AddActivityScreen 
    selectedActivities={selectedActivities}
    handleSelectActivity={handleSelectActivity}
    handleCreateActivity={handleCreateActivity}
    isSubmitting={isCreatingActivity}
  />
}

export default AuthWrapper(AddActivityPage);