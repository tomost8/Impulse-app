import { router } from 'expo-router';
import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import PointsModal from '@/components/modals/PointsModal';

import { useState } from 'react';

// Account Screen Component for rendering the UI
function AccountScreen({ 
    user, 
    isUserLoading 
  }: { 
    user: any; 
    isUserLoading: boolean; 
  }) {
    // Move modal state here
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    if (isUserLoading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/account/settings')}>
          <Text style={styles.text}>Settings</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Profile Picture: {user.profile_picture}</Text>
        <Text style={styles.text}>First Name: {user.first_name}</Text>
        <Text style={styles.text}>Username: {user.username}</Text>
        <Text style={styles.text}>Points: {user.point?.points}</Text>
        <TouchableOpacity style={styles.button} onPress={showModal}>
          <Text style={styles.text}>Open Modal for Points</Text>
        </TouchableOpacity>
        <PointsModal visible={modalVisible} hideModal={hideModal} />
        <TouchableOpacity style={styles.button} onPress={() => router.push('/account/redeems')}>
          <Text style={styles.text}>Redeem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/account/friends')}>
          <Text style={styles.text}>Friends</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Bio: {user.bio}</Text>
        <Text style={styles.text}>Gender: {user.gender}</Text>
        <Text style={styles.text}>Timezone: {user.timezone}</Text>
        <Text style={styles.text}>Primary Goal: {user.primary_goal}</Text>
        <Text style={styles.text}>Secondary Goal: {user.secondary_goal}</Text>
      </View>
    );
  }

  export default AccountScreen;