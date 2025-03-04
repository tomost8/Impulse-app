import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUserCommunities } from '@/hooks/graphql/communities/queries';
import { useGetFeedCommunities, useGetFeedFriends } from '@/hooks/graphql/posts/queries';
import { useLikePost, useUnlikePost } from '@/hooks/graphql/posts/mutations';
// Components
import SocialScreen from '@/components/screens/tabs/SocialScreen';
import SocialScreenOld from '@/components/old/social/SocialScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';
import { useUserData } from '@/services/UserPreferencesContext';


const SocialPage = (props: any) => {
  const { userId, authToken} = props;
  const { timezone } = useUserData();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const communitiesRef = useRef<any[] | null>(null);
  const hasFetchedCommunities = useRef(false);
  const { communityMembers, fetched: hasNewCommunitiesData } = useGetUserCommunities(userId as number, !hasFetchedCommunities.current);

  const friendsFeedRef = useRef<any[] | null>(null);
  const hasFetchedFriendsFeed = useRef(false);
  const { posts: friendsFeed, fetched: hasNewFriendsFeedData } = useGetFeedFriends(userId as number, authToken, !hasFetchedFriendsFeed.current);

  const communityFeedRef = useRef<any[] | null>(null);
  const hasFetchedCommunityFeed = useRef(false);
  const { posts: communityFeed, fetched: hasNewCommunityFeedData } = useGetFeedCommunities(userId as number, authToken, !hasFetchedCommunityFeed.current);

  useEffect(() => {
    if (!hasNewCommunitiesData && !hasNewFriendsFeedData && !hasNewCommunityFeedData) {
      return;
    }
    if (hasNewCommunitiesData) {
      communitiesRef.current = communityMembers;
      hasFetchedCommunities.current = true;
    }
    if (hasNewFriendsFeedData) {
      friendsFeedRef.current = friendsFeed;
      hasFetchedFriendsFeed.current = true;
    }
    if (hasNewCommunityFeedData) {
      communityFeedRef.current = communityFeed;
      hasFetchedCommunityFeed.current = true;
    }
    if (hasFetchedCommunities.current && hasFetchedFriendsFeed.current && hasFetchedCommunityFeed.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunitiesData, hasNewFriendsFeedData, hasNewCommunityFeedData]);

  // Mutations
  const { likePost } = useLikePost();
  const { unlikePost } = useUnlikePost();
  const [isHandlingLike, setIsHandlingLike] = useState(false);
  const [isHandlingUnlike, setIsHandlingUnlike] = useState(false);

  // Add function to update local post state
  const updatePostLikeState = (postId: number, liked: boolean) => {
    if (communityFeedRef.current) {
      communityFeedRef.current = communityFeedRef.current.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            liked: liked,
            likeCount: liked ? post.likeCount + 1 : post.likeCount - 1
          };
        }
        return post;
      });
      setRenderCounter(prev => prev + 1);
    }
  };

  // Update the handlers to use optimistic updates
  const handleLikePost = async (postId: number) => {
    setIsHandlingLike(true);
    try {
      await likePost(postId, authToken);
      // No need to refetch - state already updated optimistically
    } catch (error) {
      console.error("Error liking post:", error);
      // Revert optimistic update on error
      updatePostLikeState(postId, false);
    } finally {
      setIsHandlingLike(false);
    }
  }

  const handleUnlikePost = async (postId: number) => {
    setIsHandlingUnlike(true);
    try {
      await unlikePost(postId, authToken);
      // No need to refetch - state already updated optimistically
    } catch (error) {
      console.error("Error unliking post:", error);
      // Revert optimistic update on error
      updatePostLikeState(postId, true);
    } finally {
      setIsHandlingUnlike(false);
    }
  }

  // Debug
  const loading = !hasFetchedCommunities.current || !hasFetchedFriendsFeed.current || !hasFetchedCommunityFeed.current;
  if (debugRenders && !loading) {
    console.log("Rendering SocialPage\n",
      "Communities:", communitiesRef.current, "\n",
      "Friends Feed:", friendsFeedRef.current, "\n",
      "Community Feed:", communityFeedRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
      "Timezone:", timezone
    );
  }

  if (pageDisplay) {
    return (
      <SocialScreen 
      communityMembers={communitiesRef.current || []}
      isCommunityMembersLoading={!hasFetchedCommunities.current}
      friendsFeed={friendsFeedRef.current || []}
      isFriendsFeedLoading={!hasFetchedFriendsFeed.current}
      communityFeed={communityFeedRef.current || []}
      isCommunityFeedLoading={!hasFetchedCommunityFeed.current}
      handleLikePost={handleLikePost}
      handleUnlikePost={handleUnlikePost}
      isHandlingLike={isHandlingLike}
      isHandlingUnlike={isHandlingUnlike}
      updatePostLikeState={updatePostLikeState}
    />
  );
  } else {
    return (
      <SocialScreenOld 
      communityMembers={communitiesRef.current || []}
      isCommunityMembersLoading={!hasFetchedCommunities.current}
      friendsFeed={friendsFeedRef.current || []}
      isFriendsFeedLoading={!hasFetchedFriendsFeed.current}
      communityFeed={communityFeedRef.current || []}
      isCommunityFeedLoading={!hasFetchedCommunityFeed.current}
      handleLikePost={handleLikePost}
      handleUnlikePost={handleUnlikePost}
      isHandlingLike={isHandlingLike}
      isHandlingUnlike={isHandlingUnlike}
      updatePostLikeState={updatePostLikeState}
      />
    );
  }
}

export default AuthWrapper(SocialPage);