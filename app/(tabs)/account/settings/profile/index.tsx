import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/users/queries';
// Components
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '@/constants/testStyles';
import { router } from 'expo-router';
// Debug
import { debugRenders } from '@/constants/debug';

function ProfileScreen({
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

const ProfilePage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number, !hasFetchedUser.current);

  // Queries for Loading State
  useEffect(() => {
    if (!hasNewUserData) {
      return;
    }
    if (hasNewUserData) {
      userRef.current = user;
      hasFetchedUser.current = true;
    }
    if (hasFetchedUser.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewUserData]);

  // Debug
  const loading = !hasFetchedUser.current;
  if (debugRenders && !loading) {
    console.log("Rendering ProfilePage\n",
      "User:", userRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }
  
  return (
    <ProfileScreen
      user={userRef.current}
      isUserLoading={!hasFetchedUser.current}
    />
  );
}

export default AuthWrapper(ProfilePage);