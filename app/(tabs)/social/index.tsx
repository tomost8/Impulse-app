import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import styles from '@/constants/testStyles';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUserCommunities } from '@/hooks/graphql/communities/queries';
import { useGetPosts, useGetPostsByUserId } from '@/hooks/graphql/posts/queries';
// Components
// Debug
import { debugRenders } from '@/constants/debug';

function SocialScreen({
  communityMembers,
  isCommunityMembersLoading,
  posts,
  isPostsLoading,
}: {
  communityMembers: any,
  isCommunityMembersLoading: boolean,
  posts: any,
  isPostsLoading: boolean,
}) {
  if (isCommunityMembersLoading || isPostsLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/social/explore')}>
        <Text style={styles.text}>Explore</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <Text style={styles.text}>Friends Feed</Text>
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
        {posts.map((post: any) => (
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

  const postsRef = useRef<any[] | null>(null);
  const hasFetchedPosts = useRef(false);
  const { posts, fetched: hasNewPostsData } = useGetPosts(userId as number, authToken, "community", true, 0, 10, !hasFetchedPosts.current);

  useEffect(() => {
    if (!hasNewCommunitiesData && !hasNewPostsData) {
      return;
    }
    if (hasNewCommunitiesData) {
      communitiesRef.current = communityMembers;
      hasFetchedCommunities.current = true;
    }
    if (hasNewPostsData) {
      postsRef.current = posts;
      hasFetchedPosts.current = true;
    }
    if (hasFetchedCommunities.current && hasFetchedPosts.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunitiesData, hasNewPostsData]);

  // Debug
  const loading = !hasFetchedCommunities.current || !hasFetchedPosts.current;
  if (debugRenders && !loading) {
    console.log("Rendering SocialPage\n",
      "Communities:", communitiesRef.current, "\n",
      "Posts:", postsRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }
  
  return (
    <SocialScreen 
      communityMembers={communitiesRef.current}
      isCommunityMembersLoading={!hasFetchedCommunities.current}
      posts={postsRef.current}
      isPostsLoading={!hasFetchedPosts.current}
    />
  );
}

export default AuthWrapper(SocialPage);