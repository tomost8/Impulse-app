import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriends } from '@/hooks/graphql/friends/queries';
// Components: export FriendScreen to a different file
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/utils/testStyles';
import FriendsList from '@/components/screens/profile/FriendsCommunityList/FriendsList';
// Debug
import { debugRenders, pageDisplay } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';
import { useUserData } from '@/services/UserPreferencesContext';

function FriendScreen({ 
  friends, 
  isFriendsLoading 
}: { 
  friends: any[]; 
  isFriendsLoading: boolean 
}) {
  if (isFriendsLoading) {
    return <Text>Loading...</Text>;
  }
  
  return (
    <View style={styles.section}>
      <Text style={styles.text}>Friends</Text>
      {friends.filter((friend: any) => friend.status === 'ACCEPTED').map((friend: any) => (
        <TouchableOpacity style={styles.button}
          key={friend.friend.id}
          onPress={() => router.push(`/user/${friend.friend.id}`)}
        >
          <Text style={styles.text}>
            {friend.friend.first_name} {friend.friend.last_name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const FriendsPage = () => {
  const { fetching, friends } = useUserData();

  return (
    <FriendsList 
      friends={friends} 
      isLoading={fetching} 
    />
  );
}

export default AuthWrapper(FriendsPage);