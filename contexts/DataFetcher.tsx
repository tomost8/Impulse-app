import * as React from 'react';
import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';
import { useApolloClient } from '@apollo/client';
// GraphQL Hooks
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useGetActivitiesByDate } from '@/hooks/graphql/activities/queries';
import { useGetUserCommunities } from '@/hooks/graphql/communities/queries';
import { useGetUserChats } from '@/hooks/graphql/chats/queries';
import { useGetFriends } from '@/hooks/graphql/friends/queries';
import mixpanel from '@/config/mixpanelConfig';

import { getLocalDay } from '@/utils/timezoneProcessing';
import { useGetFeedCommunities } from '@/hooks/graphql/posts/queries';
import { useGetFeedFriends } from '@/hooks/graphql/posts/queries';
import { useGetPost, useGetPostComments, useGetPostsByUserId } from '@/hooks/graphql/posts/queries';
import { useGetMyChallenges } from '@/hooks/graphql/challenges/queries';

// Context for global data refetch
interface DataRefetchContextType {
  refetchData: (options: RefetchOptions) => Promise<void>;
  setCurrentPostId: (postId: number | null) => void;
  isRefetching: boolean;
}

interface RefetchOptions {
  user?: boolean;
  activities?: boolean;
  communities?: boolean;
  chats?: boolean;
  friends?: boolean;
  friendsFeed?: boolean;
  communityFeed?: boolean;
  challenges?: boolean;

  currentCommunity?: boolean;
  currentCommunityMembers?: boolean;
  currentCommunityAnnouncements?: boolean;
  currentPost?: boolean;
  currentPostComments?: boolean;
  clearCache?: boolean; // Defaults to true for fresh data after mutations
}

const DataRefetchContext = createContext<DataRefetchContextType | null>(null);

export const useDataRefetch = () => {
  const context = useContext(DataRefetchContext);
  if (!context) {
    throw new Error('useDataRefetch must be used within DataFetcher');
  }
  return context;
};

export const DataFetcher: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId, authToken, loading, authInitialized } = useAuth();
  const { setFetching, debugLog,
    setCommunities, setChats, setFriends, setUser, setActivities, 
    setTimezone, setCameraClickable, setLoginStreak,
    setCommunityFeed, setFriendsFeed, setChallenges,
    setCurrentCommunity, setCurrentCommunityMembers, setCurrentCommunityAnnouncements,
    setCurrentPost, setCurrentPostComments
  } = useDataProvider();
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
  const [actionRefetchTrigger, setActionRefetchTrigger] = useState(0);
  const currentRefetchOptions = useRef<RefetchOptions>({});
  const lastActionRefetchTrigger = useRef(0);

  // User Query
  // Refs
  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  
  // Conditions
  const shouldFetchUserInitially = !hasFetchedUser.current && hasValidAuth && authInitialized;
  const shouldRefetchUser = Boolean(actionRefetchTrigger > 0 && 
    actionRefetchTrigger !== lastActionRefetchTrigger.current && 
    currentRefetchOptions.current.user);
  const shouldFetchUser = shouldFetchUserInitially || shouldRefetchUser;
  
  const { user, fetched: hasNewUserData, refetch: refetchUser } = useGetUser(
    userId as number, 
    shouldFetchUser
  );

  // Activities Query
  // Refs
  const activitiesRef = useRef<any[] | null>(null);
  const hasFetchedActivities = useRef(false);
  const currentDate = useRef('');  // Current date for activities query
  
  // Conditions
  const hasValidAuthAndDate = hasValidAuth && currentDate.current !== '';
  const shouldFetchActivitiesInitially = !hasFetchedActivities.current && hasValidAuthAndDate;
  const shouldRefetchActivities = Boolean(actionRefetchTrigger > 0 && 
    actionRefetchTrigger !== lastActionRefetchTrigger.current && 
    currentRefetchOptions.current.activities);
  const shouldFetchActivities = shouldFetchActivitiesInitially || shouldRefetchActivities;
  
  const { activities, fetched: hasNewActivitiesData } = useGetActivitiesByDate(
    userId as number, 
    currentDate.current, 
    authToken as string, 
    shouldFetchActivities
  );

  // Communities Query
  // Refs
  const communitiesRef = useRef<any[] | null>(null);
  const hasFetchedCommunities = useRef(false);
  
  // Conditions
  const shouldFetchCommunitiesInitially = !hasFetchedCommunities.current && hasValidAuth && authInitialized;
  const shouldRefetchCommunities = Boolean(actionRefetchTrigger > 0 && 
    actionRefetchTrigger !== lastActionRefetchTrigger.current && 
    currentRefetchOptions.current.communities);
  const shouldFetchCommunities = shouldFetchCommunitiesInitially || shouldRefetchCommunities;
  
  const { communityMembers, fetched: hasNewCommunitiesData } = useGetUserCommunities(
    userId as number, 
    shouldFetchCommunities
  );

  // Chats Query
  // Refs
  const chatsRef = useRef<any[] | null>(null);
  const hasFetchedChats = useRef(false);
  
  // Conditions
  const shouldFetchChatsInitially = !hasFetchedChats.current && hasValidAuth && authInitialized;
  const shouldRefetchChats = Boolean(actionRefetchTrigger > 0 && 
    actionRefetchTrigger !== lastActionRefetchTrigger.current && 
    currentRefetchOptions.current.chats);
  const shouldFetchChats = shouldFetchChatsInitially || shouldRefetchChats;
  
  const { chats, fetched: hasNewChatsData } = useGetUserChats(
    userId as number, 
    shouldFetchChats
  );

  // Friends Query
  // Refs
  const friendsRef = useRef<any[] | null>(null);
  const hasFetchedFriends = useRef(false);
  
  // Conditions
  const shouldFetchFriendsInitially = !hasFetchedFriends.current && hasValidAuth && authInitialized;
  const shouldRefetchFriends = Boolean(actionRefetchTrigger > 0 && 
    actionRefetchTrigger !== lastActionRefetchTrigger.current && 
    currentRefetchOptions.current.friends);
  const shouldFetchFriends = shouldFetchFriendsInitially || shouldRefetchFriends;
  
  const { friends, fetched: hasNewFriendsData } = useGetFriends(
    userId as number, 
    shouldFetchFriends
  );

  // Challenges Query
  // Refs
  const challengesRef = useRef<any | null>(null);
  const hasFetchedChallenges = useRef(false);
  
  // Conditions
  const shouldFetchChallengesInitially = !hasFetchedChallenges.current && hasValidAuth && authInitialized;
  const shouldRefetchChallenges = Boolean(actionRefetchTrigger > 0 && 
    actionRefetchTrigger !== lastActionRefetchTrigger.current && 
    currentRefetchOptions.current.challenges);
  const shouldFetchChallenges = shouldFetchChallengesInitially || shouldRefetchChallenges;
  
  const { activeChallenges, completedChallenges, failedChallenges, fetched: hasNewChallengesData } = useGetMyChallenges(
    authToken as string,
    shouldFetchChallenges
  );

  // Friends Feed Query
  // Refs
  const friendsFeedRef = useRef<any[] | null>(null);
  const hasFetchedFriendsFeed = useRef(false);
  
  // Conditions
  const hasValidUserAndAuth = Boolean(userId && authToken);
  const shouldFetchFriendsFeedInitially = !hasFetchedFriendsFeed.current && hasValidUserAndAuth;
  const shouldRefetchFriendsFeed = Boolean(actionRefetchTrigger > 0 && 
    actionRefetchTrigger !== lastActionRefetchTrigger.current && 
    currentRefetchOptions.current.friendsFeed);
  const shouldFetchFriendsFeed = shouldFetchFriendsFeedInitially || shouldRefetchFriendsFeed;
  
  const { posts: friendsFeed, fetched: hasNewFriendsFeedData } = useGetFeedFriends(
    userId || 0, 
    authToken || '', 
    shouldFetchFriendsFeed
  );

  // Community Feed Query
  // Refs
  const communityFeedRef = useRef<any[] | null>(null);
  const hasFetchedCommunityFeed = useRef(false);
  
  // Conditions
  const hasValidUserAndAuthForCommunity = Boolean(userId && authToken);
  const shouldFetchCommunityFeedInitially = !hasFetchedCommunityFeed.current && hasValidUserAndAuthForCommunity;
  const shouldRefetchCommunityFeed = Boolean(actionRefetchTrigger > 0 && 
    actionRefetchTrigger !== lastActionRefetchTrigger.current && 
    currentRefetchOptions.current.communityFeed);
  const shouldFetchCommunityFeed = shouldFetchCommunityFeedInitially || shouldRefetchCommunityFeed;
  
  const { posts: communityFeed, fetched: hasNewCommunityFeedData } = useGetFeedCommunities(
    userId || 0, 
    authToken || '', 
    shouldFetchCommunityFeed
  );



  // Current Post Query
  // Refs
  const currentPostRef = useRef<any | null>(null);
  const hasFetchedCurrentPost = useRef(false);
  const currentPostId = useRef<number | null>(null);
  
  // Conditions
  const shouldFetchCurrentPostInitially = !hasFetchedCurrentPost.current && currentPostId.current !== null;
  const shouldRefetchCurrentPost = Boolean(actionRefetchTrigger > 0 && 
    actionRefetchTrigger !== lastActionRefetchTrigger.current && 
    currentRefetchOptions.current.currentPost);
  const shouldFetchCurrentPost = shouldFetchCurrentPostInitially || shouldRefetchCurrentPost;
  
  const { post: currentPost, fetched: hasNewCurrentPostData } = useGetPost(
    currentPostId.current || 0, 
    shouldFetchCurrentPost
  );

  // Current Post Comments Query
  // Refs
  const currentPostCommentsRef = useRef<any[] | null>(null);
  const hasFetchedCurrentPostComments = useRef(false);
  
  // Conditions
  const shouldFetchCurrentPostCommentsInitially = !hasFetchedCurrentPostComments.current && currentPostId.current !== null;
  const shouldRefetchCurrentPostComments = Boolean(actionRefetchTrigger > 0 && 
    actionRefetchTrigger !== lastActionRefetchTrigger.current && 
    currentRefetchOptions.current.currentPostComments);
  const shouldFetchCurrentPostComments = shouldFetchCurrentPostCommentsInitially || shouldRefetchCurrentPostComments;
  
  const { comments: currentPostComments, fetched: hasNewCurrentPostCommentsData } = useGetPostComments(
    currentPostId.current || 0, 
    shouldFetchCurrentPostComments
  );

  // Mutations
  const { updateUser } = useUpdateUser();
  const [isUpdating, setIsUpdating] = useState(false);

  // Helper function to check if user data is complete
  const checkUserDataCompleteness = (userData: any): boolean => {
    if (!userData) return false;
    
    // Check for essential user fields
    const hasEssentialFields = !!(
      userData.first_name &&
      userData.last_name &&
      userData.username &&
      userData.primary_goal &&
      userData.profile_picture
    );
    
    return hasEssentialFields;
  };

  // Reset all fetch flags
  const resetFetchFlags = () => {
    hasFetchedUser.current = false;
    hasFetchedActivities.current = false;
    hasFetchedCommunities.current = false;
    hasFetchedChats.current = false;
    hasFetchedFriends.current = false;
    hasFetchedChallenges.current = false;
    hasFetchedFriendsFeed.current = false;
    hasFetchedCommunityFeed.current = false;

    hasFetchedCurrentPost.current = false;
    hasFetchedCurrentPostComments.current = false;
    lastActionRefetchTrigger.current = 0;
    setFetching(true);
    setCurrentCommunity(null);
    setCurrentCommunityMembers([]);
    setCurrentCommunityAnnouncements([]);
    setCurrentPost(null);
    setCurrentPostComments([]);
  };



  // Flexible refetch function
  const refetchData = async (options: RefetchOptions) => {
    setIsRefetching(true);
    
    // Set refetch options with default clearCache: true
    const optionsWithDefaults = { clearCache: true, ...options };
    currentRefetchOptions.current = optionsWithDefaults;
    
    // Reset trigger tracking
    lastActionRefetchTrigger.current = 0;
    
    // Small delay for backend transactions
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Clear cache if requested (defaults to true)
    if (optionsWithDefaults.clearCache) {
      await client.clearStore();
    }
    
    // Reset specified fetch flags
    if (options.user) hasFetchedUser.current = false;
    if (options.activities) hasFetchedActivities.current = false;
    if (options.communities) hasFetchedCommunities.current = false;
    if (options.chats) hasFetchedChats.current = false;
    if (options.friends) hasFetchedFriends.current = false;
    if (options.challenges) hasFetchedChallenges.current = false;
    if (options.friendsFeed) hasFetchedFriendsFeed.current = false;
    if (options.communityFeed) hasFetchedCommunityFeed.current = false;

    if (options.currentCommunity) setCurrentCommunity(null);
    if (options.currentCommunityMembers) setCurrentCommunityMembers([]);
    if (options.currentCommunityAnnouncements) setCurrentCommunityAnnouncements([]);
    if (options.currentPost) setCurrentPost(null);
    if (options.currentPostComments) setCurrentPostComments([]);
    
    // Set currentDate for activities if needed
    if (options.activities && !currentDate.current) {
      const userTimezone = userRef.current?.timezone || 'America/New_York';
      currentDate.current = getLocalDay(new Date().toISOString(), userTimezone);
    }
    
    // Trigger refetch
    const newTriggerValue = actionRefetchTrigger + 1;
    setActionRefetchTrigger(newTriggerValue);
  };

  // Set current post ID function
  const setCurrentPostId = (postId: number | null) => {
    currentPostId.current = postId;
    if (postId !== null) {
      hasFetchedCurrentPost.current = false;
      hasFetchedCurrentPostComments.current = false;
    }
  };


  // Handle auth data
  useEffect(() => {
    if (userId && authToken) {
      // Check if this is a new login (user was previously logged out OR different user logged in)
      const isNewLogin = (wasLoggedOut.current && hasEstablishedAuth.current) || 
                        (previousUserId.current !== null && previousUserId.current !== userId);
      
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
      challengesRef.current = null;
      friendsFeedRef.current = null;
      communityFeedRef.current = null;
  
      resetFetchFlags();
      setUserDataComplete(false);
      lastUserDataCheck.current = null;
    } else if (userId && authToken && !hasValidAuth) {
      // If we have valid auth data but hasValidAuth is false, fix it
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
    if (!hasNewUserData && !hasNewActivitiesData && !hasNewCommunitiesData && !hasNewChatsData && !hasNewFriendsData && !hasNewChallengesData && !hasNewFriendsFeedData && !hasNewCommunityFeedData) {
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
      
      // Set Mixpanel user data
      const mixpanelProps = {
        '$email': user.email,
        'uid_backend': user?.id?.toString(),
        'first_name': user.first_name,
        'last_name': user.last_name,
        'username': user.username,
        'timezone_backend': user.timezone,
        'age': user.age,
        'gender': user.gender,
        'primary_goal': user.primary_goal,
        'secondary_goal': user.secondary_goal,
        'last_seen': new Date().toISOString(),
      };
      mixpanel.getPeopleSet(mixpanelProps);
      
      // Set login streak data
      if (user.login_streak) {
        setLoginStreak(user.login_streak);
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
              throw new Error(`updateUser response.success is false: ${JSON.stringify(response.errors, null, 2)}`);
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
      chatsRef.current = chats;
      hasFetchedChats.current = true;
      setChats(chats);
    }
    if (hasNewFriendsData) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
      setFriends(friends);
    }
    if (hasNewChallengesData) {
      const challengesData = {
        activeChallenges,
        completedChallenges,
        failedChallenges,
      };
      challengesRef.current = challengesData;
      hasFetchedChallenges.current = true;
      setChallenges(challengesData);
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

    if (hasNewCurrentPostData) {
      currentPostRef.current = currentPost;
      hasFetchedCurrentPost.current = true;
      setCurrentPost(currentPost);
    }
    if (hasNewCurrentPostCommentsData) {
      currentPostCommentsRef.current = currentPostComments;
      hasFetchedCurrentPostComments.current = true;
      setCurrentPostComments(currentPostComments);
    }
    if (hasFetchedUser.current && hasFetchedActivities.current && hasFetchedCommunities.current && hasFetchedChats.current && hasFetchedFriends.current && hasFetchedChallenges.current && hasFetchedFriendsFeed.current && hasFetchedCommunityFeed.current) {
      setFetching(false);
      setIsRefetching(false); // Reset refetching state when complete
      
      console.log("✅ User Data Loaded Successfully");
    } else {
    }
  }, [hasValidAuth, hasNewUserData, hasNewActivitiesData, hasNewCommunitiesData, hasNewChatsData, hasNewFriendsData, hasNewChallengesData, hasNewFriendsFeedData, hasNewCommunityFeedData, loginEventTrigger, actionRefetchTrigger]);

  // Track when queries are executed to prevent multiple executions
  useEffect(() => {
    if (hasNewUserData && actionRefetchTrigger > 0) {
      lastActionRefetchTrigger.current = actionRefetchTrigger;
    }
  }, [hasNewUserData, actionRefetchTrigger]);

  useEffect(() => {
    if (hasNewActivitiesData && actionRefetchTrigger > 0) {
      lastActionRefetchTrigger.current = actionRefetchTrigger;
    }
  }, [hasNewActivitiesData, actionRefetchTrigger]);

  useEffect(() => {
    if (hasNewCommunitiesData && actionRefetchTrigger > 0) {
      lastActionRefetchTrigger.current = actionRefetchTrigger;
    }
  }, [hasNewCommunitiesData, actionRefetchTrigger]);

  useEffect(() => {
    if (hasNewChatsData && actionRefetchTrigger > 0) {
      lastActionRefetchTrigger.current = actionRefetchTrigger;
    }
  }, [hasNewChatsData, actionRefetchTrigger]);

  useEffect(() => {
    if (hasNewFriendsData && actionRefetchTrigger > 0) {
      lastActionRefetchTrigger.current = actionRefetchTrigger;
    }
  }, [hasNewFriendsData, actionRefetchTrigger]);

  useEffect(() => {
    if (hasNewChallengesData && actionRefetchTrigger > 0) {
      lastActionRefetchTrigger.current = actionRefetchTrigger;
    }
  }, [hasNewChallengesData, actionRefetchTrigger]);

  useEffect(() => {
    if (hasNewFriendsFeedData && actionRefetchTrigger > 0) {
      lastActionRefetchTrigger.current = actionRefetchTrigger;
    }
  }, [hasNewFriendsFeedData, actionRefetchTrigger]);

  useEffect(() => {
    if (hasNewCommunityFeedData && actionRefetchTrigger > 0) {
      lastActionRefetchTrigger.current = actionRefetchTrigger;
    }
  }, [hasNewCommunityFeedData, actionRefetchTrigger]);




  // Cleanup effect to clear intervals when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  // Could add loading states here if needed
  return (
    <DataRefetchContext.Provider value={{ 
      refetchData,
      setCurrentPostId,
      isRefetching 
    }}>
      {children}
    </DataRefetchContext.Provider>
  );
};
