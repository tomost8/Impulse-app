import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useLikePost, useUnlikePost } from '@/hooks/graphql/posts/mutations';
// Components
import SocialScreen from '@/components/screens/tabs/SocialScreen';
// Debug
import { debugRenders } from '@/utils/debug';
import { useDataProvider } from '@/contexts/DataProviderContext';
// Services
import { useUserAuth } from '@/services/AuthContext';
import { useDataRefetch } from '@/contexts/DataFetcher';


const SocialPage = () => {
  const { userId, authToken} = useUserAuth();
  const { 
    timezone, 
    communities: communitiesFromContext,
    friendsFeed: friendsFeedFromContext, 
    communityFeed: communityFeedFromContext
  } = useDataProvider();
  const { refetchData, isRefetching } = useDataRefetch();
  const [renderCounter, setRenderCounter] = useState(0);

  // Pull-to-refresh functionality: refetchData will refresh feeds
  // Auth-related refreshes (login/signup) are handled automatically by DataFetcher
  
  // Use data from global context instead of local queries
  const communityMembers = communitiesFromContext || [];
  const friendsFeed = friendsFeedFromContext || [];
  const communityFeed = communityFeedFromContext || [];
  
  // Update render counter when data changes
  useEffect(() => {
    if (communityMembers.length > 0 || friendsFeed.length > 0 || communityFeed.length > 0) {
      setRenderCounter(prev => prev + 1);
    }
  }, [communityMembers.length, friendsFeed.length, communityFeed.length]);

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
      await likePost(postId, authToken as string);
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
      await unlikePost(postId, authToken as string);
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
  if (debugRenders && !loading) {
    console.log("Rendering SocialPage", {
      communities: communityMembers.length,
      friendsFeed: friendsFeed.length,
      communityFeed: communityFeed.length,
      renderCounter,
      timezone
    });
  }

    return (
      <SocialScreen 
      loading={loading}
      communityMembers={communityMembers}
      friendsFeed={friendsFeed}
      communityFeed={communityFeed}
      handleLikePost={handleLikePost}
      handleUnlikePost={handleUnlikePost}
      onRefresh={() => refetchData({
        friendsFeed: true,
        communityFeed: true,
      })}
      isRefreshing={isRefetching}
      //updatePostLikeState={updatePostLikeState}
    />
  );
}

//export default AuthWrapper(SocialPage);
export default SocialPage;