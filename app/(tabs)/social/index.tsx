import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useLikePost, useUnlikePost } from '@/hooks/graphql/posts/mutations';
// Components
import SocialScreen from '@/components/screens/tabs/SocialScreen';
// Debug
import { debugSocialPage } from '@/debug/utils';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useDataRefetch } from '@/contexts/DataFetcher';


const SocialPage = () => {
  const { 
    communities: communitiesFromContext,
    friendsFeed: friendsFeedFromContext, 
    communityFeed: communityFeedFromContext
  } = useDataProvider();
  const { refetchData, isRefetching } = useDataRefetch();

  // Fetch data when navigating to this page
  useFocusEffect(
    React.useCallback(() => {
      console.log("🔄 Fetching data - SocialPage navigated to");
      // Small delay to prevent GraphQL race conditions
      setTimeout(() => {
        refetchData({ communities: true, communityFeed: true, friendsFeed: true });
      }, 100);
    }, [])
  );

  // Get data from global context
  const communityMembers = communitiesFromContext || [];
  const friendsFeed = friendsFeedFromContext || [];
  const communityFeed = communityFeedFromContext || [];
  


  // Mutations
  const { likePost } = useLikePost();
  const { unlikePost } = useUnlikePost();
  const [isHandlingLike, setIsHandlingLike] = useState(false);
  const [isHandlingUnlike, setIsHandlingUnlike] = useState(false);

  // Handle post like/unlike actions
  const handleLikePost = async (postId: number) => {
    console.log("handleLikePost", postId);
    setIsHandlingLike(true);
    try {
      await likePost(postId);
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

  // Handle pull-to-refresh
  const handleRefresh = () => {
    console.log("🔄 Refetching data - Social page manual refresh");
    setTimeout(() => {
      refetchData({
        communities: true,
        friendsFeed: true,
        communityFeed: true,
      });
    }, 100);
  };

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
      onRefresh={handleRefresh}
      isRefetching={isRefetching}
    />
  );
}

export default AuthWrapper(SocialPage);