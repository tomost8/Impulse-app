import * as React from 'react';
import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { useUserAuth } from '@/services/AuthContext';
import { useUserData } from '@/services/UserPreferencesContext';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';
import { useApolloClient } from '@apollo/client';
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

/*
 * USAGE EXAMPLES:
 * 
 * 1. In any component within InitialDataLoader:
 * 
 * import { useDataRefetch } from '@/components/InitialDataLoader';
 * 
 * const MyComponent = () => {
 *   const { refetchAllData, isRefetching } = useDataRefetch();
 *   
 *   const handleRefreshButton = () => {
 *     refetchAllData(); // This will refresh all user data
 *   };
 *   
 *   return (
 *     <TouchableOpacity onPress={handleRefreshButton} disabled={isRefetching}>
 *       <Text>{isRefetching ? 'Refreshing...' : 'Refresh Data'}</Text>
 *     </TouchableOpacity>
 *   );
 * };
 * 
 * 2. After completing an action that changes user data:
 * 
 * const handleCompleteAction = async () => {
 *   await someMutation();
 *   refetchAllData(); // Refresh all data to show updates
 * };
 */

// Context for global data refetch
interface DataRefetchContextType {
  refetchAllData: () => Promise<void>;
  isRefetching: boolean;
}

const DataRefetchContext = createContext<DataRefetchContextType | null>(null);

export const useDataRefetch = () => {
  const context = useContext(DataRefetchContext);
  if (!context) {
    throw new Error('useDataRefetch must be used within InitialDataLoader');
  }
  return context;
};

export const InitialDataLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId, authToken } = useUserAuth();
  const { setFetching, debugLog,
    setCommunities, setChats, setFriends, setUser, setActivities, 
    setTimezone, setCameraClickable, setLoginStreak,
    setCommunityFeed, setFriendsFeed, refetchFriendsFeed, refetchCommunityFeed,
    refetchFriendsFeedTrigger, refetchCommunityFeedTrigger
  } = useUserData();
  const client = useApolloClient();

  const [hasValidAuth, setHasValidAuth] = useState(false);
  const lastFetchedUserId = useRef<number | null>(null);
  const lastFetchedAuthToken = useRef<string | null>(null);
  const hasEstablishedAuth = useRef(false);
  
  // Track login events to detect when a user logs in (not just signs up)
  const [loginEventTrigger, setLoginEventTrigger] = useState(0);
  const wasLoggedOut = useRef(false);
  const previousUserId = useRef<number | null>(null);
  
  // Track if user data is incomplete (during signup)
  const [userDataComplete, setUserDataComplete] = useState(false);
  const lastUserDataCheck = useRef<any | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);
  const [manualRefetchTrigger, setManualRefetchTrigger] = useState(0);

  // Fetching Data
  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData, refetch: refetchUser } = useGetUser(userId as number, !hasFetchedUser.current && hasValidAuth);

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
    Boolean(userId && authToken && (!hasFetchedFriendsFeed.current || refetchFriendsFeedTrigger > 0 || manualRefetchTrigger > 0))
  );

  const communityFeedRef = useRef<any[] | null>(null);
  const hasFetchedCommunityFeed = useRef(false);
  const { posts: communityFeed, fetched: hasNewCommunityFeedData } = useGetFeedCommunities(
    userId || 0, 
    authToken || '', 
    Boolean(userId && authToken && (!hasFetchedCommunityFeed.current || refetchCommunityFeedTrigger > 0 || manualRefetchTrigger > 0))
  );

  // Debug community feed query
  useEffect(() => {
    if (hasNewCommunityFeedData && communityFeed) {
      console.log("InitialDataLoader: Community feed query returned", {
        queryUserId: userId,
        queryAuthToken: authToken ? "present" : "null",
        feedLength: communityFeed.length,
        postIds: communityFeed.map((post: any) => post.id),
        postCaptions: communityFeed.map((post: any) => post.caption)
      });
      
      // Check if we're missing the 6th post (ID 134)
      const hasPost134 = communityFeed.some((post: any) => post.id === 134);
      console.log("InitialDataLoader: Checking for post 134:", {
        hasPost134,
        allPostIds: communityFeed.map((post: any) => post.id).sort((a: number, b: number) => a - b)
      });
    }
  }, [hasNewCommunityFeedData, communityFeed, userId, authToken]);

  // Debug when community feed query is triggered
  useEffect(() => {
    if (userId && authToken && (!hasFetchedCommunityFeed.current || refetchCommunityFeedTrigger > 0 || manualRefetchTrigger > 0)) {
      console.log("InitialDataLoader: Triggering community feed query", {
        userId,
        authToken: authToken ? "present" : "null",
        hasFetchedCommunityFeed: hasFetchedCommunityFeed.current,
        refetchCommunityFeedTrigger,
        manualRefetchTrigger,
        shouldFetch: Boolean(userId && authToken && (!hasFetchedCommunityFeed.current || refetchCommunityFeedTrigger > 0 || manualRefetchTrigger > 0))
      });
    }
  }, [userId, authToken, hasFetchedCommunityFeed.current, refetchCommunityFeedTrigger, manualRefetchTrigger]);

  // Debug community feed query execution
  useEffect(() => {
    console.log("InitialDataLoader: Community feed query state changed", {
      hasNewCommunityFeedData,
      communityFeedLength: communityFeed?.length || 0,
      manualRefetchTrigger,
      refetchCommunityFeedTrigger
    });
  }, [hasNewCommunityFeedData, communityFeed, manualRefetchTrigger, refetchCommunityFeedTrigger]);

  // Debug when friends feed query is triggered
  useEffect(() => {
    if (userId && authToken && (!hasFetchedFriendsFeed.current || refetchFriendsFeedTrigger > 0 || manualRefetchTrigger > 0)) {
      console.log("InitialDataLoader: Triggering friends feed query", {
        userId,
        authToken: authToken ? "present" : "null",
        hasFetchedFriendsFeed: hasFetchedFriendsFeed.current,
        refetchFriendsFeedTrigger,
        manualRefetchTrigger,
        shouldFetch: Boolean(userId && authToken && (!hasFetchedFriendsFeed.current || refetchFriendsFeedTrigger > 0 || manualRefetchTrigger > 0))
      });
    }
  }, [userId, authToken, hasFetchedFriendsFeed.current, refetchFriendsFeedTrigger, manualRefetchTrigger]);

  // Mutations (only for setting default profile picture)
  const { updateUser } = useUpdateUser();
  const [isUpdating, setIsUpdating] = useState(false);

  // Helper function to check if user data is complete
  const checkUserDataCompleteness = (userData: any): boolean => {
    if (!userData) return false;
    
    // Check for essential user fields that indicate complete data
    const hasEssentialFields = !!(
      userData.first_name &&
      userData.last_name &&
      userData.username &&
      userData.primary_goal &&
      userData.profile_picture
    );
    
    return hasEssentialFields;
  };

  // Helper function to reset all fetch flags
  const resetFetchFlags = () => {
    hasFetchedUser.current = false;
    hasFetchedActivities.current = false;
    hasFetchedCommunities.current = false;
    hasFetchedChats.current = false;
    hasFetchedFriends.current = false;
    hasFetchedFriendsFeed.current = false;
    hasFetchedCommunityFeed.current = false;
    setFetching(true);
  };

  // Global refetch function that can be called from anywhere
  const refetchAllData = async () => {
    console.log("Manual refetch triggered - refreshing all user data");
    console.log("Current manualRefetchTrigger before increment:", manualRefetchTrigger);
    setIsRefetching(true);
    
    // Add a small delay to ensure backend transactions are committed
    console.log("Waiting 100ms for backend transactions to commit...");
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Force clear Apollo cache for this user's data
    console.log("Clearing Apollo cache and resetting fetch flags");
    await client.clearStore();
    console.log("Apollo cache cleared successfully");
    
    resetFetchFlags();
    console.log("Fetch flags reset");
    
    const newTriggerValue = manualRefetchTrigger + 1;
    setManualRefetchTrigger(newTriggerValue);
    console.log("manualRefetchTrigger incremented to:", newTriggerValue);
    
    console.log("Manual refetch completed");
  };

  // Handle auth data
  useEffect(() => {
    console.log("InitialDataLoader: Auth state changed", {
      userId,
      authToken: authToken ? "present" : "null",
      hasEstablishedAuth: hasEstablishedAuth.current,
      wasLoggedOut: wasLoggedOut.current,
      hasValidAuth,
      previousUserId: previousUserId.current
    });

    if (userId && authToken) {
      // Check if this is a new login (user was previously logged out OR different user logged in)
      const isNewLogin = (wasLoggedOut.current && hasEstablishedAuth.current) || 
                        (previousUserId.current !== null && previousUserId.current !== userId);
      
      console.log("InitialDataLoader: Checking for new login", {
        isNewLogin,
        wasLoggedOut: wasLoggedOut.current,
        hasEstablishedAuth: hasEstablishedAuth.current,
        previousUserId: previousUserId.current,
        currentUserId: userId,
        isDifferentUser: previousUserId.current !== null && previousUserId.current !== userId
      });
      
      if (isNewLogin) {
        console.log("New login detected, resetting fetch flags");
        resetFetchFlags();
        setLoginEventTrigger(prev => prev + 1);
        setUserDataComplete(false);
        lastUserDataCheck.current = null;
      }
      
      setHasValidAuth(true);
      hasEstablishedAuth.current = true;
      wasLoggedOut.current = false;
      previousUserId.current = userId;
    } else if (userId === null && authToken === null && hasEstablishedAuth.current) {
      // User logged out
      console.log("User logged out, clearing auth state");
      setHasValidAuth(false);
      hasEstablishedAuth.current = false;
      wasLoggedOut.current = true;
      previousUserId.current = null;
      
      // Clear all data
      userRef.current = null;
      activitiesRef.current = null;
      communitiesRef.current = null;
      chatsRef.current = null;
      friendsRef.current = null;
      friendsFeedRef.current = null;
      communityFeedRef.current = null;
      resetFetchFlags();
      setUserDataComplete(false);
      lastUserDataCheck.current = null;
    } else if (userId && authToken && !hasValidAuth) {
      // If we have valid auth data but hasValidAuth is false, fix it
      console.log("Fixing auth state - user has valid credentials");
      setHasValidAuth(true);
      hasEstablishedAuth.current = true;
      previousUserId.current = userId;
    }
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
      // Check if user data is more complete than before
      const isUserDataMoreComplete = checkUserDataCompleteness(user);
      const hasUserDataChanged = lastUserDataCheck.current && (
        lastUserDataCheck.current.first_name !== user.first_name ||
        lastUserDataCheck.current.last_name !== user.last_name ||
        lastUserDataCheck.current.username !== user.username ||
        lastUserDataCheck.current.primary_goal !== user.primary_goal ||
        lastUserDataCheck.current.profile_picture !== user.profile_picture
      );
      const shouldRefetch = !userDataComplete && isUserDataMoreComplete && lastUserDataCheck.current !== null;
      
      console.log("InitialDataLoader: User data received", {
        isUserDataMoreComplete,
        hasUserDataChanged,
        userDataComplete,
        shouldRefetch,
        hasFirstName: !!user.first_name,
        hasLastName: !!user.last_name,
        hasUsername: !!user.username,
        hasPrimaryGoal: !!user.primary_goal,
        hasSecondaryGoal: !!user.secondary_goal,
        hasProfilePicture: !!user.profile_picture,
        previousFirstName: lastUserDataCheck.current?.first_name,
        currentFirstName: user.first_name
      });
      
      if (shouldRefetch) {
        console.log("User data became more complete, triggering refetch");
        refetchUser();
        return; // Don't process this data, wait for the refetch
      }
      
      userRef.current = user;
      hasFetchedUser.current = true;
      setUser(user);
      setUserDataComplete(isUserDataMoreComplete);
      lastUserDataCheck.current = user;
      
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
      console.log("InitialDataLoader: Setting community feed in context", {
        feedLength: communityFeed.length,
        feedData: communityFeed.map((post: any) => ({ id: post.id, caption: post.caption }))
      });
      
      // Debug: Check if post 134 is in the data being stored
      const hasPost134InContext = communityFeed.some((post: any) => post.id === 134);
      console.log("InitialDataLoader: Post 134 in context data:", {
        hasPost134InContext,
        contextPostIds: communityFeed.map((post: any) => post.id).sort((a: number, b: number) => a - b)
      });
    }
    if (hasFetchedUser.current && hasFetchedActivities.current && hasFetchedCommunities.current && hasFetchedChats.current && hasFetchedFriends.current && hasFetchedFriendsFeed.current && hasFetchedCommunityFeed.current) {
      setFetching(false);
      setIsRefetching(false); // Reset refetching state when complete
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
  }, [hasValidAuth, hasNewUserData, hasNewActivitiesData, hasNewCommunitiesData, hasNewChatsData, hasNewFriendsData, hasNewFriendsFeedData, hasNewCommunityFeedData, loginEventTrigger, manualRefetchTrigger]);

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

  // Cleanup effect to clear intervals when component unmounts
  useEffect(() => {
    return () => {
      // if (incompleteDataCheckInterval.current) { // This line is removed
      //   clearInterval(incompleteDataCheckInterval.current); // This line is removed
      //   incompleteDataCheckInterval.current = null; // This line is removed
      // } // This block is removed
    };
  }, []);

  // Could add loading states here if needed
  return (
    <DataRefetchContext.Provider value={{ refetchAllData, isRefetching }}>
      {children}
    </DataRefetchContext.Provider>
  );
}; 