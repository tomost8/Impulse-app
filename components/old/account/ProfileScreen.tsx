import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '@/utils/testStyles';
import { router } from 'expo-router';

export default function ProfileScreenOld({
  user,
  isUserLoading,
}: {
  user: any,
  isUserLoading: boolean,
}) {
  if (isUserLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: user.profile_picture }}
        style={styles.smallImage}
      />
      <Text style={styles.text}>
        Email: {user.email}
      </Text>
      <Text style={styles.text}>
        First Name: {user.first_name}
      </Text>
      <Text style={styles.text}>
        Last Name: {user.last_name}
      </Text>
      <Text style={styles.text}>
        Username: {user.username}
      </Text>
      <Text style={styles.text}>
        Age: {user.dob}
      </Text>
      <Text style={styles.text}>
        Gender: {user.gender}
      </Text>
      <Text style={styles.text}>
        Timezone: {user.timezone}
      </Text>
      <Text style={styles.text}>
        Bio: {user.bio}
      </Text>
      <Text style={styles.text}>
        Primary Goal: {user.primary_goal}
      </Text>
      <Text style={styles.text}>
        Secondary Goal: {user.secondary_goal}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/account/settings/profile/editProfile')}>
        <Text style={styles.text}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}