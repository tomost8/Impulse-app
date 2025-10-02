import { router, useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetFriends } from '@/hooks/graphql/friends/queries';
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useGetUserCommunities } from '@/hooks/graphql/communities/queries';
import { useGetActivitiesByDate } from '@/hooks/graphql/activities/queries';
// Components
import FriendViewScreen from '@/components/screens/profiles/FriendScreen';
import NonFriendViewScreen from '@/components/screens/profiles/NonFriendScreen';
// Debug
import { debugRenders } from '@/debug/utils';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useDataRefetch } from '@/contexts/DataFetcher';
import { getLocalDay } from '@/utils/timezoneProcessing';
import { useAcceptFriendRequest, useSendFriendRequest } from '@/hooks/graphql/friends/mutations';

const UserPage = () => {
  const { id } = useLocalSearchParams();
  const { authToken } = useAuth();
  const { fetching, user, friends } = useDataProvider();
  const { refetchData } = useDataRefetch();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries
  // Check if the profile user is an accepted friend
  /*
  const friendRef = useRef<any[] | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriends(user.id, !hasFetchedFriends.current && !fetching);
  */

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
  const shouldFetchActivities = !hasFetchedActivities.current && currentDate.current !== '';
  const { activities, fetched: hasNewActivitiesData } = useGetActivitiesByDate(Number(id), currentDate.current, authToken as string, shouldFetchActivities);

  useEffect(() => {
    if (!hasNewUserData && !hasNewCommunitiesData && !hasNewActivitiesData) {
      return;
    }
    if (hasNewUserData) {
      userRef.current = profileUser;
      hasFetchedUser.current = true;
      const userLocalDate = getLocalDay(new Date().toISOString(), profileUser.timezone);
      currentDate.current = userLocalDate;
      // Reset activities fetch flag so it can fetch with the new date
      hasFetchedActivities.current = false;
    }
    if (hasNewCommunitiesData) {
      communitiesRef.current = communityMembers;
      hasFetchedCommunities.current = true; 
    }
    if (hasNewActivitiesData) {
      activitiesRef.current = activities;
      hasFetchedActivities.current = true;
    }
    if (hasFetchedUser.current && hasFetchedCommunities.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewUserData, hasNewCommunitiesData, hasNewActivitiesData]);

  // Mutation
  const { sendFriendRequest } = useSendFriendRequest();
  const [isSendingFriendRequest, setIsSendingFriendRequest] = useState(false);
  const handleSendFriendRequest = async (friendId: number) => {
    setIsSendingFriendRequest(true);
    try {
      console.log("Input: user id of", user.id, "is sending friend request to", friendId);
      const input = {
        sender_id: user.id,
        receiver_id: friendId,
      }
      const response = await sendFriendRequest(input, authToken as string);
      if (response.success) {
        console.log("Friend request sent successfully", response);
        await refetchData({ friends: true });
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
        await refetchData({ friends: true, chats: true });
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
  const isAcceptedFriend = friends.some(
    friendship => friendship.friend.id === Number(id) && friendship.status === 'ACCEPTED'
  ) ?? false;

  const isPendingRequest = friends.some(
    friendship => friendship.friend.id === Number(id) && friendship.status === 'PENDING'
  ) ?? false;



  const pendingRole = friends.find(
    friendship => friendship.friend.id === Number(id) && friendship.status === 'PENDING'
  )?.role ?? 'PENDING';

  const acceptedCommunityCount = communitiesRef.current?.filter(
    community => community.status === 'ACCEPTED'
  ).length ?? 0;

  // Check if user is viewing their own profile
  const isOwnProfile = user?.id === Number(id);

  // Debug
  const loading = !hasFetchedUser.current || !hasFetchedCommunities.current || isAcceptingFriendRequest || isSendingFriendRequest;
  if (debugRenders && !loading) {
    console.log("Rendering UserPage for user:", id, "\n",
      "Friends:", friends.map((friend: any) => ({
        id: friend.friend.id,
        username: friend.friend.username,
        role: friend.role,
        status: friend.status
      })), "\n",
      "isAcceptedFriend:", isAcceptedFriend, "\n",
      "isPendingRequest:", isPendingRequest, "\n",
      "communityCount:", acceptedCommunityCount, "\n",
      "activities:", activitiesRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  if (isOwnProfile) {
    return (
      <FriendViewScreen 
        loading={loading} 
        friend={userRef.current}
        communityCount={acceptedCommunityCount}
        activities={activitiesRef.current ?? []}
      />
    );
  } else if (isAcceptedFriend) {
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
        pendingRole={pendingRole}
        onAcceptRequest={handleAcceptFriendRequest}
        onSendRequest={handleSendFriendRequest}
      />
    );
  }
}

export default UserPage; // not sure if need authwrapper