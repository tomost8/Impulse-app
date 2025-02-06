import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import ActivitiesModal from '@/components/modals/ActivitiesModal';
import { useGetActivities } from '@/hooks/graphql/activities/queries';
import useUserInfo from '@/hooks/useUserInfo';


export default function ActivityViewScreen() {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { userId, authToken} = useUserInfo();
  const { activities } = useGetActivities(userId as number, authToken as string);
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
      {activities
        .filter((activity: any) => activity.status !== 'expired')
        .map((activity: any) => (
          <View key={activity.id}>
            <Text style={styles.text}>{activity.category}</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push(`/home/activityView/${activity.id}`)}>
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
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