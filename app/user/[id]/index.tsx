import { router, useLocalSearchParams } from 'expo-router';
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

const UserPage = () => {
  const { id } = useLocalSearchParams();
  const { fetching, user } = useUserData();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user: profileUser, fetched: hasNewUserData } = useGetUser(Number(id), !hasFetchedUser.current);

  const friendRef = useRef<any[] | null>(null);
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
      friendRef.current = friends;
      hasFetchedFriends.current = true;
    }
    if (hasFetchedUser.current && hasFetchedFriends.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewUserData, hasNewFriendsData]);

  // Check if the profile user is an accepted friend
  const isAcceptedFriend = friendRef.current?.some(
    friendship => friendship.friend.id === Number(id) && friendship.status === 'ACCEPTED'
  ) ?? false;

  // Debug
  const loading = !hasFetchedUser.current;
  if (debugRenders && !loading) {
    console.log("Rendering UserPage for user:", id, "\n",
      "User Profile:", userRef.current, "\n",
      "Friend Profile:", friendRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
      "Is Accepted Friend:", isAcceptedFriend, "\n",
    );
  }

  if (isAcceptedFriend) {
    return (
      <FriendViewScreen 
        loading={loading} 
        friend={userRef.current}
      />
    );
  } else {
    return (
      <NonFriendViewScreen
        loading={loading}
        nonFriend={userRef.current}
      />
    );
  }
}

export default UserPage; // not sure if need authwrapper