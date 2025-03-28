import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from '@/utils/testStyles';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useGetFriends } from '@/hooks/graphql/friends/queries';
// Components
import FriendViewScreen from '@/components/screens/connect/profiles/friendview';
import NonFriendViewScreen from '@/components/screens/connect/profiles/nonfriendview';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserData } from '@/services/UserPreferencesContext';

function UserScreen({
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
      <Image source={{ uri: user.profile_picture }} style={styles.smallImage} />
      <Text style={styles.text}>
          First Name: {user.first_name}
      </Text>
      <Text style={styles.text}>
          Username: {user.username}
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
      <Text style={styles.todoText}>
          Todo: fetch data for "friends since"
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

const UserPage = () => {
  const { id } = useLocalSearchParams();
  const { fetching, user } = useUserData();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user: profileUser, fetched: hasNewUserData } = useGetUser(Number(id), !hasFetchedUser.current);

  const friendsRef = useRef<any[] | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriends(user.id, !hasFetchedFriends.current && !fetching);

  useEffect(() => {
    if (!hasNewUserData && !hasNewFriendsData) {
      return;
    }
    if (hasNewUserData) {
      userRef.current = profileUser;
      hasFetchedUser.current = true;
    }
    if (hasNewFriendsData) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
    }
    if (hasFetchedUser.current && hasFetchedFriends.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewUserData, hasNewFriendsData]);

  // Check if the profile user is an accepted friend
  const isAcceptedFriend = friendsRef.current?.some(
    friendship => friendship.friend.id === Number(id) && friendship.status === 'ACCEPTED'
  ) ?? false;

  // Debug
  const loading = !hasFetchedUser.current;
  if (debugRenders && !loading) {
    console.log("Rendering UserPage for user:", id, "\n",
      "ProfileUser:", userRef.current, "\n",
      "Friends:", friendsRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
      "Is Accepted Friend:", isAcceptedFriend, "\n",
    );
  }

  if (isAcceptedFriend) {
    return (
      <FriendViewScreen/>
    );
  } else {
    return (
      <NonFriendViewScreen/>
    );
  }
}

export default UserPage; // not sure if need authwrapper