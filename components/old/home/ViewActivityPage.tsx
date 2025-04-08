import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import ActivitiesModal from '@/components/old/home/ActivitiesModal';
import { useState } from 'react';

export default function ViewActivityScreenOld({
    activities,
    isActivitiesLoading,
  }: {
    activities: any;
    isActivitiesLoading: boolean;
  }) {
    // Modal for Activities
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
  
    if (isActivitiesLoading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={showModal}>
          <Text style={styles.text}>
            Open Modal for Activities
          </Text>
        </TouchableOpacity>
        <ActivitiesModal 
          visible={modalVisible} 
          hideModal={hideModal}
        />
        <View style={styles.section}>
          <Text style={styles.text}>Goals for the Day</Text>
        </View>
        {activities
          .filter((activity: any) => activity.status !== 'expired')
          .map((activity: any) => (
            <View key={activity.id} style={styles.checkbox}>
              <Text style={styles.text}>{activity.category}</Text>
              <TouchableOpacity style={styles.button} onPress={() => router.push(`/home/viewActivity`)}>
                <Text style={styles.text}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/home/addActivity')}>
          <Text style={styles.text}>
            Add new daily goal
          </Text>
        </TouchableOpacity>
      </View>
    );
  }