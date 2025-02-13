import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetActivities } from '@/hooks/graphql/activities/queries';
// Components
import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import ActivitiesModal from '@/components/modals/ActivitiesModal';
// Debug
import { debugRenders } from '@/constants/debug';

function ViewActivityScreen({
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

const ViewActivityPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const activitiesRef = useRef<any[] | null>(null);
  const hasFetchedActivities = useRef(false);
  const { activities, fetched: hasNewActivitiesData } = useGetActivities(userId as number, authToken as string, !hasFetchedActivities.current);

  useEffect(() => {
    if (!hasNewActivitiesData) {
      return;
    }
    if (hasNewActivitiesData) {
      activitiesRef.current = activities;
      hasFetchedActivities.current = true;
    }
    if (hasFetchedActivities.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewActivitiesData]);

  // Debug
  const loading = !hasFetchedActivities.current;
  if (debugRenders && !loading) {
    console.log('Rendering ViewActivityPage\n',
      'Activities:', activitiesRef.current, '\n',
      'Render Counter:', renderCounter, '\n',
    );
  }

  return (
    <ViewActivityScreen 
      activities={activitiesRef.current}
      isActivitiesLoading={!hasFetchedActivities.current}
    />
  );
}

export default AuthWrapper(ViewActivityPage);