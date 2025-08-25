import React, {useState, useEffect, useRef} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useLikePost, useUnlikePost } from '@/hooks/graphql/posts/mutations';
// Components
import SocialScreen from '@/components/screens/tabs/SocialScreen';
// Debug
import { debugSocialPage } from '@/debug/utils';
import { useDataProvider } from '@/contexts/DataProviderContext';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataRefetch } from '@/contexts/DataFetcher';


const SocialPage = () => {
  const { userId, authToken} = useAuth();
  const { 
    timezone, 
    communities: communitiesFromContext,
    friendsFeed: friendsFeedFromContext, 
    communityFeed: communityFeedFromContext
  } = useDataProvider();
  const { refetchData, isRefetching } = useDataRefetch();

  // Track if we've refreshed on this focus to prevent infinite loops
  const hasRefreshedOnFocus = useRef(false);
  const lastFocusTime = useRef(0);
  const isManualRefreshing = useRef(false);

  // Refresh communities data when navigating to this page
  useFocusEffect(
    React.useCallback(() => {
      const now = Date.now();
      // Only refresh if we haven't already on this focus or if it's been more than 5 seconds
      if (!hasRefreshedOnFocus.current || (now - lastFocusTime.current > 5000)) {
        hasRefreshedOnFocus.current = true;
        lastFocusTime.current = now;
        console.log("🔄 Refreshing data - Social page focused");
        refetchData({ communities: true, communityFeed: true, friendsFeed: true });
      }
    }, []) // Remove refetchData from dependencies
  );

  // Reset the flag when the component unmounts or loses focus
  useEffect(() => {
    return () => {
      hasRefreshedOnFocus.current = false;
    };
  }, []);

  // Pull-to-refresh functionality: refetchData will refresh feeds
  // Auth-related refreshes (login/signup) are handled automatically by DataFetcher
  
  // Use data from global context instead of local queries
  const communityMembers = communitiesFromContext || [];
  const friendsFeed = friendsFeedFromContext || [];
  const communityFeed = communityFeedFromContext || [];

  // Mutations
  const { likePost } = useLikePost();
  const { unlikePost } = useUnlikePost();
  const [isHandlingLike, setIsHandlingLike] = useState(false);
  const [isHandlingUnlike, setIsHandlingUnlike] = useState(false);

  // Update the handlers to use optimistic updates
  const handleLikePost = async (postId: number) => {
    console.log("handleLikePost", postId);
    setIsHandlingLike(true);
    try {
      await likePost(postId);
      // Refetch data to get updated like state
      await refetchData({
        friendsFeed: true,
        communityFeed: true,
      });
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsHandlingLike(false);
    }
  }

  const handleUnlikePost = async (postId: number) => {
    console.log("handleUnlikePost", postId);
    setIsHandlingUnlike(true);
    try {
      await unlikePost(postId);
      // Refetch data to get updated like state
      await refetchData({
        friendsFeed: true,
        communityFeed: true,
      });
    } catch (error) {
      console.error("Error unliking post:", error);
    } finally {
      setIsHandlingUnlike(false);
    }
  }

  // Debug
  const handlingLike = isHandlingLike || isHandlingUnlike;
  const loading = handlingLike || isRefetching;
  if (debugSocialPage && !loading) {
    console.log(`📱 Rendering SocialPage - Communities: ${communityMembers.length}, Friends Feed: ${friendsFeed.length}, Community Feed: ${communityFeed.length}`);
  }

    return (
      <SocialScreen 
      loading={loading}
      communityMembers={communityMembers}
      friendsFeed={friendsFeed}
      communityFeed={communityFeed}
      handleLikePost={handleLikePost}
      handleUnlikePost={handleUnlikePost}
      onRefresh={() => {
        console.log("🔄 Refreshing data - Social page manual refresh");
        // Add a small delay to prevent race conditions
        setTimeout(() => {
          refetchData({
            communities: true,
            friendsFeed: true,
            communityFeed: true,
          });
        }, 100);
      }}
      isRefreshing={isRefetching}
      //updatePostLikeState={updatePostLikeState}
    />
  );
}

//export default AuthWrapper(SocialPage);
export default SocialPage;