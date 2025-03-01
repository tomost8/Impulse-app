import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import styles from '@/utils/testStyles';
import { Button, RadioButton } from 'react-native-paper';
import PostCard from '@/components/PostCard';
import { useState } from 'react';


export default function SocialScreenOld({
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
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  
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
          
          {communityMembers.map((communityMember: any) => (
            <TouchableOpacity
              style={styles.button}
              key={communityMember.community.id}
              onPress={() => router.push(`/community/${communityMember.community.id}`)}
            >
              <Text style={styles.text}>
                {communityMember.community.name}
              </Text>
            </TouchableOpacity>
          ))}
  
          <Button 
            mode="contained" 
            onPress={() => setShowFilter(!showFilter)}
            style={{ marginTop: 10 }}
          >
            {showFilter ? 'Hide Filters' : 'Show Filters'}
          </Button>
  
          {showFilter && (
            <View style={[styles.section, { marginTop: 10 }]}>
              <Text style={styles.text}>Filter by Community:</Text>
              <RadioButton.Group 
                onValueChange={value => setSelectedCommunity(value === selectedCommunity ? null : value)} 
                value={selectedCommunity || ''}
              >
                {communityMembers.map((communityMember: any) => (
                  <View style={styles.checkbox}
                    key={`filter-${communityMember.community.id}`}
                  >
                    <RadioButton value={communityMember.community.id.toString()} />
                    <Text style={styles.text}>{communityMember.community.name}</Text>
                  </View>
                ))}
              </RadioButton.Group>
            </View>
          )}
        </View>
        <View>
          <Text style={styles.text}>Community Feed (Posts)</Text>
          {communityFeed.map((post: any) => {
            const communityId = post.post_targets[0].target_id;
            const communityName = communityMembers.find(
              (cm: any) => cm.community.id === communityId
            )?.community.name;
            // Only show if filtered or no filter selected
            if (communityId === Number(selectedCommunity) || selectedCommunity === null) {
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  handleLikePost={handleLikePost}
                  handleUnlikePost={handleUnlikePost}
                  updatePostLikeState={updatePostLikeState}
                  communityId={communityId}
                  communityName={communityName}
                />
              );
            }
            return null; 
          })}
        </View>
      </ScrollView>
    );
  }