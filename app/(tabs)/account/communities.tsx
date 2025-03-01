import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriends } from '@/hooks/graphql/friends/queries';
// Components
import CommunityScreen from '@/components/screens/profile/FriendsCommunityList/CommunityScreen';
// Debug
import { debugRenders, pageDisplay } from '@/utils/debug';

const CommunitiesPage = (props: any) => {
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
    <CommunityScreen />
  );
}

export default AuthWrapper(CommunitiesPage);