import { router } from 'expo-router';
import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { useGetPoints, useGetUser } from '@/hooks/api/useUsers';
import PointsModal from '@/components/modals/PointsModal';

import { useRef,useState } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';

const AccountScreen = (props: any) => {
  const { userId, authToken } = props;
  const hasFetched = useRef(false);
  console.log("userId", userId, "authToken", authToken);
  const { user } = useGetUser(userId as number);
  const { points } = useGetPoints(userId as number, hasFetched.current);
  if (!hasFetched.current && user && points) {
    console.log("AccountData fetched", user, points);
    hasFetched.current = true;
  }

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/account/settings')}>
        <Text style={styles.text}>
          Settings
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Profile Picture: {user.profile_picture}
      </Text>
      <Text style={styles.text}>
        First Name: {user.first_name}
      </Text>
      <Text style={styles.text}>
        Username: {user.username}
      </Text>
      <Text style={styles.text}>
        Points: {user.point?.points}
      </Text>
      <TouchableOpacity style={styles.button} onPress={showModal}>
        <Text style={styles.text}>
          Open Modal for Points
        </Text>
      </TouchableOpacity>
      <PointsModal visible={visible} hideModal={hideModal} />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/account/redeems')}>
        <Text style={styles.text}>
          Redeem
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/account/friends')}>
        <Text style={styles.text}>
          Friends
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Bio: {user.bio}
      </Text>
      <Text style={styles.text}>
        Gender: {user.gender}
      </Text>
      <Text style={styles.text}>
        Timezone: {user.timezone}
      </Text>
      <Text style={styles.text}>
        Primary Goal: {user.primary_goal}
      </Text>
      <Text style={styles.text}>
        Secondary Goal: {user.secondary_goal}
      </Text>
    </View>
  );
}

export default AuthWrapper(AccountScreen);