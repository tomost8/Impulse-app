import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import ActivitiesModal from '@/components/modals/ActivitiesModal';
import { useActivities } from '@/hooks/api/useActivites';
import useUserInfo from '@/hooks/useUserInfo';


export default function ActivityViewScreen() {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { userId, authToken} = useUserInfo();
  const { activities, isLoading, error } = useActivities(userId as number, authToken as string);
  console.log("activities page:", activities);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showModal}>
        <Text style={styles.text}>
          Open Modal for Activities
        </Text>
      </TouchableOpacity>
      <ActivitiesModal 
        visible={visible} 
        hideModal={hideModal}
      />
      <View style={styles.section}>
        <Text style={styles.text}>Goals for the Day</Text>
      </View>
      {activities.map((activity: any) => (
        <View key={activity.id}>
          <Text style={styles.text}>{activity.category}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/home/activityAdd')}>
        <Text style={styles.text}>
          Add new daily goal
        </Text>
      </TouchableOpacity>
    </View>
  );
}