import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useUserAuth } from '@/services/AuthContext';
import { useUserData } from '@/services/UserPreferencesContext';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';
// GraphQL Hooks
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useGetActivitiesByDate } from '@/hooks/graphql/activities/queries';
import { useGetUserCommunities } from '@/hooks/graphql/communities/queries';
import { useGetUserChats } from '@/hooks/graphql/chats/queries';
import { useGetFriends } from '@/hooks/graphql/friends/queries';

import { getLocalDay } from '@/utils/timezoneProcessing';
import { useGetFeedCommunities } from '@/hooks/graphql/posts/queries';
import { useGetFeedFriends } from '@/hooks/graphql/posts/queries';

export const InitialDataLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId, authToken } = useUserAuth();
  const { setFetching, debugLog,
    setCommunities, setChats, setFriends, setUser, setActivities, 
    setTimezone, setCameraClickable, setLoginStreak,
    setCommunityFeed, setFriendsFeed, refetchFriendsFeed, refetchCommunityFeed,
    refetchFriendsFeedTrigger, refetchCommunityFeedTrigger
  } = useUserData();

  const [hasValidAuth, setHasValidAuth] = useState(false);
  const lastFetchedUserId = useRef<number | null>(null);
  const lastFetchedAuthToken = useRef<string | null>(null);

  // Fetching Data
  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number, !hasFetchedUser.current && hasValidAuth);

  const activitiesRef = useRef<any[] | null>(null);
  const hasFetchedActivities = useRef(false);
  const currentDate = useRef('');  // Initialize empty
  const { activities, fetched: hasNewActivitiesData } = useGetActivitiesByDate(userId as number, currentDate.current, authToken as string, !hasFetchedActivities.current && hasValidAuth && currentDate.current !== '');

  const communitiesRef = useRef<any[] | null>(null);
  const hasFetchedCommunities = useRef(false);
  const { communityMembers, fetched: hasNewCommunitiesData } = useGetUserCommunities(userId as number, !hasFetchedCommunities.current && hasValidAuth);

  const chatsRef = useRef<any[] | null>(null);
  const hasFetchedChats = useRef(false);
  const { chatMembers, fetched: hasNewChatsData } = useGetUserChats(userId as number, !hasFetchedChats.current && hasValidAuth);

  const friendsRef = useRef<any[] | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriends(userId as number, !hasFetchedFriends.current && hasValidAuth);

  const friendsFeedRef = useRef<any[] | null>(null);
  const hasFetchedFriendsFeed = useRef(false);
  const { posts: friendsFeed, fetched: hasNewFriendsFeedData } = useGetFeedFriends(
    userId || 0, 
    authToken || '', 
    Boolean(userId && authToken && (!hasFetchedFriendsFeed.current || refetchFriendsFeedTrigger > 0))
  );

  const communityFeedRef = useRef<any[] | null>(null);
  const hasFetchedCommunityFeed = useRef(false);
  const { posts: communityFeed, fetched: hasNewCommunityFeedData } = useGetFeedCommunities(
    userId || 0, 
    authToken || '', 
    Boolean(userId && authToken && (!hasFetchedCommunityFeed.current || refetchCommunityFeedTrigger > 0))
  );

  // Mutations (only for setting default profile picture)
  const { updateUser } = useUpdateUser();
  const [isUpdating, setIsUpdating] = useState(false);


  // Handle auth data
  useEffect(() => {
    if (userId && authToken) {
      setHasValidAuth(true);
    } else {
      setHasValidAuth(false);
      userRef.current = null;
      activitiesRef.current = null;
      communitiesRef.current = null;
      chatsRef.current = null;
      friendsRef.current = null;
      friendsFeedRef.current = null;
      communityFeedRef.current = null;
      hasFetchedUser.current = false;
      hasFetchedActivities.current = false;
      hasFetchedCommunities.current = false;
      hasFetchedChats.current = false;
      hasFetchedFriends.current = false;
      hasFetchedFriendsFeed.current = false;
      hasFetchedCommunityFeed.current = false;
    }
    const oldAuthToken = lastFetchedAuthToken.current ? lastFetchedAuthToken.current.substring(0, 20) + '...' : null;
    const newAuthToken = authToken ? authToken.substring(0, 20) + '...' : null;
    console.log("🔐 InitialDataLoader - hasValidAuth set to", hasValidAuth,
        "\n🔐 InitialDataLoader - set userId from", lastFetchedUserId.current, "to", userId,
        "\n🔐 InitialDataLoader - set authToken from", oldAuthToken, "to", newAuthToken);
    lastFetchedUserId.current = userId as number;
    lastFetchedAuthToken.current = authToken as string;
  }, [userId, authToken]);

  // Handle Data Fetching after Valid Auth
  useEffect(() => {
    if (!hasValidAuth) {
        return;
    }
    if (!hasNewUserData && !hasNewActivitiesData && !hasNewCommunitiesData && !hasNewChatsData && !hasNewFriendsData && !hasNewFriendsFeedData && !hasNewCommunityFeedData) {
      return;
    }
    if (hasNewUserData) {
      userRef.current = user;
      hasFetchedUser.current = true;
      setUser(user);
      
      // 设置登录streak数据
      if (user.login_streak) {
        setLoginStreak(user.login_streak);
        console.log("Login streak data received:", user.login_streak);
      }
      
      if (user.timezone) {
        setTimezone(user.timezone);
        currentDate.current = getLocalDay(new Date().toISOString(), user.timezone);
      } else {
        let defaultTimezone = 'America/New_York';
        console.log("No timezone found for user, setting to", defaultTimezone);
        setTimezone(defaultTimezone);
        currentDate.current = getLocalDay(new Date().toISOString(), defaultTimezone);
      }
      
      // Set default profile picture if it doesn't exist
      if (!user.profile_picture && !isUpdating) {
        setIsUpdating(true);
        const input = {
          profile_picture: DEFAULT_PROFILE_PICTURE
        };
        updateUser(input, authToken as string)
          .then(response => {
            if (response.success) {
              console.log("Profile picture set to default");
            } else {
              throw new Error("updateUser response.success is false:" + response.errors);
            }
          })
          .catch(error => {
            console.error("Error setting default profile picture:", error);
          })
          .finally(() => {
            setIsUpdating(false);
          });
      }
    }

    if (hasNewActivitiesData) {
      activitiesRef.current = activities;
      hasFetchedActivities.current = true;
      setActivities(activities);
      setCameraClickable(activities.length > 0);
    }
    if (hasNewCommunitiesData) {
      communitiesRef.current = communityMembers;
      hasFetchedCommunities.current = true;
      setCommunities(communityMembers);
    }
    if (hasNewChatsData) {
      chatsRef.current = chatMembers;
      hasFetchedChats.current = true;
      setChats(chatMembers);
    }
    if (hasNewFriendsData) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
      setFriends(friends);
    }
    if (hasNewFriendsFeedData) {
      friendsFeedRef.current = friendsFeed;
      hasFetchedFriendsFeed.current = true;
      setFriendsFeed(friendsFeed);
    }
    if (hasNewCommunityFeedData) {
      communityFeedRef.current = communityFeed;
      hasFetchedCommunityFeed.current = true;
      setCommunityFeed(communityFeed);
    }
    if (hasFetchedUser.current && hasFetchedActivities.current && hasFetchedCommunities.current && hasFetchedChats.current && hasFetchedFriends.current && hasFetchedFriendsFeed.current && hasFetchedCommunityFeed.current) {
      setFetching(false);
      console.log("Initial User Data Fetched:", 
        "\nUser:", hasFetchedUser.current, userRef.current,
        "\nLogin Streak:", userRef.current?.login_streak,
        "\nActivities:", hasFetchedActivities.current, activitiesRef.current,
        "\nCommunities:", hasFetchedCommunities.current, communitiesRef.current,
        "\nChats:", hasFetchedChats.current, chatsRef.current,
        "\nFriends:", hasFetchedFriends.current, friendsRef.current,
        "\nFriends Feed:", hasFetchedFriendsFeed.current, friendsFeedRef.current,
        "\nCommunity Feed:", hasFetchedCommunityFeed.current, communityFeedRef.current
        );
    }
  }, [hasValidAuth, hasNewUserData, hasNewActivitiesData, hasNewCommunitiesData, hasNewChatsData, hasNewFriendsData, hasNewFriendsFeedData, hasNewCommunityFeedData]);

  // Add new effect to handle refetching
  useEffect(() => {
    if (refetchFriendsFeedTrigger > 0) {
      hasFetchedFriendsFeed.current = false;
    }
  }, [refetchFriendsFeedTrigger]);

  useEffect(() => {
    if (refetchCommunityFeedTrigger > 0) {
      hasFetchedCommunityFeed.current = false;
    }
  }, [refetchCommunityFeedTrigger]);

  // Could add loading states here if needed
  return <>{children}</>;
}; 