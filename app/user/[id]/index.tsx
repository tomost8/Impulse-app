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
import { useUserAuth } from '@/services/AuthContext';
import { useUserData } from '@/services/UserPreferencesContext';
import { getLocalDay } from '@/utils/timezoneProcessing';
import { useAcceptFriendRequest, useSendFriendRequest } from '@/hooks/graphql/friends/mutations';

const UserPage = () => {
  const { id } = useLocalSearchParams();
  const { authToken } = useUserAuth();
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

  // Mutation
  const { sendFriendRequest } = useSendFriendRequest();
  const [isSendingFriendRequest, setIsSendingFriendRequest] = useState(false);
  const handleSendFriendRequest = async (friendId: number) => {
    setIsSendingFriendRequest(true);
    try {
      const input = {
        sender_id: user.id,
        receiver_id: friendId,
      }
      const response = await sendFriendRequest(input, authToken as string);
      if (response.success) {
        console.log("Friend request sent successfully", response);
      } else {
        console.error("Error sending friend request:", response.errors);
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    } finally {
      setIsSendingFriendRequest(false);
    }
  }

  const { acceptFriendRequest } = useAcceptFriendRequest();
  const [isAcceptingFriendRequest, setIsAcceptingFriendRequest] = useState(false);
  const handleAcceptFriendRequest = async (friendId: number) => {
    setIsAcceptingFriendRequest(true);
    try {
      const input = {
        status: 'ACCEPTED',
      }
      const response = await acceptFriendRequest(user.id, friendId, input, authToken as string);
      if (response.success) {
        console.log("Friend request accepted successfully", response);
      } else {
        console.error("Error accepting friend request:", response.errors);
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    } finally {
      setIsAcceptingFriendRequest(false);
    }
  }

  // Check if the profile user is an accepted friend
  const isAcceptedFriend = friendRef.current?.some(
    friendship => friendship.friend.id === Number(id) && friendship.status === 'ACCEPTED'
  ) ?? false;

  const isPendingRequest = friendRef.current?.some(
    friendship => friendship.friend.id === Number(id) && friendship.status === 'PENDING'
  ) ?? false;

  const acceptedCommunityCount = communitiesRef.current?.filter(
    community => community.status === 'ACCEPTED'
  ).length ?? 0;

  // Debug
  const loading = !hasFetchedUser.current || !hasFetchedFriends.current || !hasFetchedCommunities.current || !hasFetchedActivities.current || isAcceptingFriendRequest || isSendingFriendRequest;
  if (debugRenders && !loading) {
    console.log("Rendering UserPage for user:", id, "\n",
      "User Profile:", userRef.current, "\n",
      "isAcceptedFriend:", isAcceptedFriend, "\n",
      "isPendingRequest:", isPendingRequest, "\n",
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
        isPendingRequest={isPendingRequest}
        onAcceptRequest={handleAcceptFriendRequest}
        onSendRequest={handleSendFriendRequest}
      />
    );
  }
}

export default UserPage; // not sure if need authwrapper