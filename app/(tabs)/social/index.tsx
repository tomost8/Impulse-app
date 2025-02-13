import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import styles from '@/constants/testStyles';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUserCommunities } from '@/hooks/graphql/communities/queries';
import { useGetFeed, useGetPosts, useGetPostsByUserId } from '@/hooks/graphql/posts/queries';
// Components
// Debug
import { debugRenders } from '@/constants/debug';

function SocialScreen({
  communityMembers,
  isCommunityMembersLoading,
  friendsFeed,
  isFriendsFeedLoading,
  communityFeed,
  isCommunityFeedLoading,
}: {
  communityMembers: any,
  isCommunityMembersLoading: boolean,
  friendsFeed: any,
  isFriendsFeedLoading: boolean,
  communityFeed: any,
  isCommunityFeedLoading: boolean,
}) {
  if (isCommunityMembersLoading || isFriendsFeedLoading || isCommunityFeedLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/social/explore')}>
        <Text style={styles.text}>Explore</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <Text style={styles.text}>Friends Feed (Posts)</Text>
        {friendsFeed.map((post: any) => (
          <View key={post.id}>
            <Image 
              source={{ uri: post.mediaUrl }}
              style={{ 
                width: 100,
                height: 100,
                resizeMode: 'contain'
              }}
            />
            <Text style={styles.text}>{post.caption}</Text>
            <Text style={styles.text}>PFP: {post.author.profile_picture}, Name: {post.author.first_name} {post.author.last_name}</Text>
            <Text style={styles.text}>Created At: {post.created_at}, Expires At: {post.expires_at}"</Text>
            <Text style={styles.text}>Message count + Like count</Text>
          </View>
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
      <View style={styles.section}>
        <Text style={styles.text}>Community Feed (Posts)</Text>
        {communityFeed.map((post: any) => (
          <View key={post.id}>
            <Image 
              source={{ uri: post.mediaUrl }}
              style={{ 
                width: 100,
                height: 100,
                resizeMode: 'contain'
              }}
            />
            <Text style={styles.text}>Community Button</Text>
            <Text style={styles.text}>{post.caption}</Text>
            <Text style={styles.text}>PFP: {post.author.profile_picture}, Name: {post.author.first_name} {post.author.last_name}</Text>
            <Text style={styles.text}>Created At: {post.created_at}, Expires At: {post.expires_at}"</Text>
            <Text style={styles.text}>Message count + Like count</Text>
          </View>
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
  const { posts: friendsFeed, fetched: hasNewFriendsFeedData } = useGetFeed(userId as number, authToken, !hasFetchedFriendsFeed.current);

  const communityFeedRef = useRef<any[] | null>(null);
  const hasFetchedCommunityFeed = useRef(false);
  const { posts: communityFeed, fetched: hasNewCommunityFeedData } = useGetPosts(userId as number, authToken, "community", true, 0, 10, !hasFetchedCommunityFeed.current);

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
    <SocialScreen 
      communityMembers={communitiesRef.current}
      isCommunityMembersLoading={!hasFetchedCommunities.current}
      friendsFeed={friendsFeedRef.current}
      isFriendsFeedLoading={!hasFetchedFriendsFeed.current}
      communityFeed={communityFeedRef.current}
      isCommunityFeedLoading={!hasFetchedCommunityFeed.current}
    />
  );
}

export default AuthWrapper(SocialPage);