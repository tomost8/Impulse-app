import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useLikePost, useUnlikePost } from '@/hooks/graphql/posts/mutations';
// Components
import SocialScreen from '@/components/screens/tabs/SocialScreen';
// Debug
import { debugRenders } from '@/utils/debug';
import { useUserData } from '@/services/UserPreferencesContext';
// Services
import { useUserAuth } from '@/services/AuthContext';
import { useDataRefetch } from '@/components/InitialDataLoader';


const SocialPage = () => {
  const { userId, authToken} = useUserAuth();
  const { 
    timezone, 
    communities: communitiesFromContext,
    friendsFeed: friendsFeedFromContext, 
    communityFeed: communityFeedFromContext, 
    refetchFriendsFeed, 
    refetchCommunityFeed 
  } = useUserData();
  const { refetchAllData, isRefetching } = useDataRefetch();
  const [renderCounter, setRenderCounter] = useState(0);

  // Pull-to-refresh functionality: refetchAllData will refresh all user data
  // including communities, friends feed, community feed, and other user data
  
  // Use data from global context instead of local queries
  const communityMembers = communitiesFromContext || [];
  const friendsFeed = friendsFeedFromContext || [];
  const communityFeed = communityFeedFromContext || [];
  
  console.log("SocialPage: Using data from context", {
    communities: communityMembers.length,
    friendsFeed: friendsFeed.length,
    communityFeed: communityFeed.length,
    isRefetching
  });

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
      await refetchAllData();
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
      await refetchAllData();
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
    console.log("Rendering SocialPage\n",
      "Communities:", communityMembers, "\n",
      "Friends Feed:", friendsFeed, "\n",
      "Community Feed:", communityFeed, "\n",
      "Render Counter:", renderCounter, "\n",
      "Timezone:", timezone
    );
  }

    return (
      <SocialScreen 
      loading={loading}
      communityMembers={communityMembers}
      friendsFeed={friendsFeed}
      communityFeed={communityFeed}
      handleLikePost={handleLikePost}
      handleUnlikePost={handleUnlikePost}
      onRefresh={refetchAllData}
      isRefreshing={isRefetching}
      //updatePostLikeState={updatePostLikeState}
    />
  );
}

//export default AuthWrapper(SocialPage);
export default SocialPage;