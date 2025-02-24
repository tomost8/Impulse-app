import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image, Touchable } from 'react-native';
import { router } from 'expo-router';
import styles from '@/constants/testStyles';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUserCommunities } from '@/hooks/graphql/communities/queries';
import { useGetFeedCommunities, useGetFeedFriends } from '@/hooks/graphql/posts/queries';
import { useLikePost, useUnlikePost } from '@/hooks/graphql/posts/mutations';
// Components
import PostCard from '@/components/PostCard';
import FeedScreen from '@/components/screens/SocialPage/FeedScreen';
// Debug
import { debugRenders } from '@/constants/debug';

function SocialScreen({
  communityMembers,
  isCommunityMembersLoading,
  friendsFeed,
  isFriendsFeedLoading,
  communityFeed,
  isCommunityFeedLoading,
  handleLikePost,
  handleUnlikePost,
  isHandlingLike,
  isHandlingUnlike,
  updatePostLikeState,
}: {
  communityMembers: any,
  isCommunityMembersLoading: boolean,
  friendsFeed: any,
  isFriendsFeedLoading: boolean,
  communityFeed: any,
  isCommunityFeedLoading: boolean,
  handleLikePost: (postId: number) => Promise<void>,
  handleUnlikePost: (postId: number) => Promise<void>,
  isHandlingLike: boolean,
  isHandlingUnlike: boolean,
  updatePostLikeState: (postId: number, liked: boolean) => void,
}) {
  if (isCommunityMembersLoading || isFriendsFeedLoading || isCommunityFeedLoading || isHandlingLike || isHandlingUnlike) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/social/explore')}>
        <Text style={styles.text}>Explore</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.text}>Friends Feed (Posts)</Text>
        {friendsFeed.map((post: any) => (
          <PostCard
            key={post.id}
            post={post}
            handleLikePost={handleLikePost}
            handleUnlikePost={handleUnlikePost}
            updatePostLikeState={updatePostLikeState}
          />
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Communities List</Text>
        {(
          communityMembers.map((communityMember: any) => (
            <TouchableOpacity
              style={styles.button}
              key={communityMember.community.id}
              onPress={() => router.push(`/community/${communityMember.community.id}`)}
            >
              <Text style={styles.text}>
                {communityMember.community.name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
      <View>
        <Text style={styles.text}>Community Feed (Posts)</Text>
        {communityFeed.map((post: any) => (
          <PostCard
            key={post.id}
            post={post}
            handleLikePost={handleLikePost}
            handleUnlikePost={handleUnlikePost}
            updatePostLikeState={updatePostLikeState}
            showCommunityButton={true}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const SocialPage = (props: any) => {
  const { userId, authToken } = props;
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
    );
  }
  
  return (
    <FeedScreen //SocialScreen
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

export default AuthWrapper(SocialPage);