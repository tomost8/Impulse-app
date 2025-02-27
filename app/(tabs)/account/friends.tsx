import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriends } from '@/hooks/graphql/friends/queries';
// Components: export FriendScreen to a different file
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/utils/testStyles';
// Debug
import { debugRenders } from '@/utils/debug';

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

const FriendsPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  const friendsRef = useRef<any | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriends(userId as number, !hasFetchedFriends.current);

  useEffect(() => {
    if (!hasNewFriendsData) {
      return;
    }
    if (hasNewFriendsData) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
    }
    if (hasFetchedFriends.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewFriendsData]); 

  const loading = !hasFetchedFriends.current;
  if (debugRenders && !loading) {
    console.log("Rendering FriendsPage\n",
      "Friends:", friendsRef.current, "\n",
      "Render Counter:", renderCounter
    );
  }
  
  return (
    <FriendScreen 
      friends={friendsRef.current} 
      isFriendsLoading={!hasFetchedFriends.current} 
    />
  );
}

export default AuthWrapper(FriendsPage);