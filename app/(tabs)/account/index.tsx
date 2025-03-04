import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useGetUserCommunities } from '@/hooks/graphql/communities/queries';
import { useGetFriends } from '@/hooks/graphql/friends/queries';
// Components
import AccountScreenOld from '@/components/old/account/AccountScreen';
import AccountProfile from '@/components/screens/tabs/AccountScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';

const AccountPage = () => {
  const { userId, authToken } = useUserInfo();
  const [renderCounter, setRenderCounter] = useState(0);

  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number, !hasFetchedUser.current);

  const communitiesRef = useRef<any[] | null>(null);
  const hasFetchedCommunities = useRef(false);
  const { communityMembers, fetched: hasNewCommunitiesData } = useGetUserCommunities(userId as number, !hasFetchedCommunities.current);

  const friendsRef = useRef<any[] | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriends(userId as number, !hasFetchedFriends.current);

  useEffect(() => {
    if (!hasNewUserData && !hasNewCommunitiesData && !hasNewFriendsData) {
      return;
    }
    if (hasNewUserData) {
      userRef.current = user;
      hasFetchedUser.current = true;
    }
    if (hasNewCommunitiesData) {
      communitiesRef.current = communityMembers;
      hasFetchedCommunities.current = true;
    }
    if (hasNewFriendsData) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
    }
    if (hasFetchedUser.current && hasFetchedCommunities.current && hasFetchedFriends.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewUserData, hasNewCommunitiesData, hasNewFriendsData]); 

  const loading = !hasFetchedUser.current || !hasFetchedCommunities.current || !hasFetchedFriends.current;
  if (debugRenders && !loading) {
    console.log("Rendering AccountPage. Counter: ", renderCounter,
      "\nUser:", userRef.current, 
      "\nCommunities:", communitiesRef.current, 
      "\nFriends:", friendsRef.current,
    );
  }

  if (pageDisplay) {
    return <AccountProfile
      user={userRef.current} 
      isLoading={loading} 
      numCommunities={communitiesRef.current?.length || 0}
      numFriends={friendsRef.current?.length || 0}
    />;
  } else {
    return <AccountScreenOld
      user={userRef.current} 
      isUserLoading={!hasFetchedUser.current} 
    />;
  }
}

export default AuthWrapper(AccountPage);