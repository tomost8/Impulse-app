import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/constants/testStyles';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/users/queries';
// Components
// Debug
import { debugRenders } from '@/constants/debug';

function PartnerScreen({
  user,
  isUserLoading,
}: {
  user: any;
  isUserLoading: boolean;
}) {
  if (isUserLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
          Partner Insights
      </Text>
      <Text style={styles.text}>
          Profile Picture: {user.profile_picture}
      </Text>
      <Text style={styles.text}>
          First Name: {user.first_name}
      </Text>
      <Text style={styles.text}>
          Username: {user.username}
      </Text>
      <Text style={styles.todoText}>
          Todo: Daily Goals + Joined communities + Nudge
      </Text>
      <Text style={styles.text}>
          Points: {user.point.points}
      </Text>
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

const PartnerPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(Number(userId), !hasFetchedUser.current);

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
    console.log("Rendering PartnerPage\n",
      "User:", userRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return (
    <PartnerScreen
      user={userRef.current}
      isUserLoading={!hasFetchedUser.current}
    />
  );
}

export default AuthWrapper(PartnerPage);