import { router, useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriends } from '@/hooks/graphql/friends/queries';
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useGetUserCommunities } from '@/hooks/graphql/communities/queries';
import { useGetActivitiesByDate } from '@/hooks/graphql/activities/queries';
// Components
import FriendViewScreen from '@/components/screens/connect/profiles/friendview';
import NonFriendViewScreen from '@/components/screens/connect/profiles/nonfriendview';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';
import { useUserData } from '@/services/UserPreferencesContext';
import { getLocalDay } from '@/utils/timezoneProcessing';

const UserPage = () => {
  const { id } = useLocalSearchParams();
  const { authToken } = useUserInfo();
  const { fetching, user } = useUserData();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries
  // Check if the profile user is an accepted friend
  const friendRef = useRef<any[] | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriends(user.id, !hasFetchedFriends.current && !fetching);

  // Profile for User we are viewing
  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user: profileUser, fetched: hasNewUserData } = useGetUser(Number(id), !hasFetchedUser.current);

  const communitiesRef = useRef<any[] | null>(null);
  const hasFetchedCommunities = useRef(false);
  const { communityMembers, fetched: hasNewCommunitiesData } = useGetUserCommunities(Number(id), !hasFetchedCommunities.current);

  const activitiesRef = useRef<any[] | null>(null);
  const hasFetchedActivities = useRef(false);
  const currentDate = useRef('');
  const shouldFetchActivities = !hasFetchedActivities.current; // && currentDate.current !== '';
  const { activities, fetched: hasNewActivitiesData } = useGetActivitiesByDate(Number(id), currentDate.current, authToken as string, shouldFetchActivities);

  useEffect(() => {
    if (!hasNewUserData && !hasNewFriendsData && !hasNewCommunitiesData && !hasNewActivitiesData) {
      return;
    }
    if (hasNewUserData) {
      userRef.current = profileUser;
      hasFetchedUser.current = true;
      const userLocalDate = getLocalDay(new Date().toISOString(), profileUser.timezone);
      currentDate.current = userLocalDate;
    }
    if (hasNewFriendsData) {
      friendRef.current = friends;
      hasFetchedFriends.current = true;
    }
    if (hasNewCommunitiesData) {
      communitiesRef.current = communityMembers;
      hasFetchedCommunities.current = true; 
    }
    if (hasNewActivitiesData) {
      activitiesRef.current = activities;
      hasFetchedActivities.current = true;
    }
    if (hasFetchedUser.current && hasFetchedFriends.current && hasFetchedCommunities.current && hasFetchedActivities.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewFriendsData, hasNewUserData, hasNewCommunitiesData, hasNewActivitiesData]);

  // Check if the profile user is an accepted friend
  const isAcceptedFriend = friendRef.current?.some(
    friendship => friendship.friend.id === Number(id) && friendship.status === 'ACCEPTED'
  ) ?? false;

  const acceptedCommunityCount = communitiesRef.current?.filter(
    community => community.status === 'ACCEPTED'
  ).length ?? 0;

  // Debug
  const loading = !hasFetchedUser.current || !hasFetchedFriends.current || !hasFetchedCommunities.current || !hasFetchedActivities.current;
  if (debugRenders && !loading) {
    console.log("Rendering UserPage for user:", id, "\n",
      "User Profile:", userRef.current, "\n",
      "isAcceptedFriend:", isAcceptedFriend, "\n",
      "communityCount:", acceptedCommunityCount, "\n",
      "activities:", activitiesRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  if (isAcceptedFriend) {
    return (
      <FriendViewScreen 
        loading={loading} 
        friend={userRef.current}
        communityCount={acceptedCommunityCount}
        activities={activitiesRef.current ?? []}
      />
    );
  } else {
    return (
      <NonFriendViewScreen
        loading={loading}
        nonFriend={userRef.current}
        communityCount={acceptedCommunityCount}
      />
    );
  }
}

export default UserPage; // not sure if need authwrapper