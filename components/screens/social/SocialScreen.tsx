import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Platform, FlatList, RefreshControl } from "react-native";
import { TabSelector, CommunityList, CommunityFilter, Feed } from "@/components/features/social";
import LoadingOverlay from "@/components/ui/common/LoadingOverlay";
import { router } from "expo-router";
const searchIcon = require("@/assets/icons/search.png");

// Persistent tab state across component re-mounts
const savedTabRef = { current: 'friends' as 'friends' | 'communities' };

interface SocialScreenProps {
  loading: boolean;
  communityMembers: any[];
  friendsFeed: any[];
  communityFeed: any[];
  handleLikePost: (postId: number) => Promise<void>;
  handleUnlikePost: (postId: number) => Promise<void>;
  onRefresh?: () => void;
  isRefetching?: boolean;
}

const SocialScreen: React.FC<SocialScreenProps> = ({
  loading,
  communityMembers,
  friendsFeed,
  communityFeed,
  handleLikePost,
  handleUnlikePost,
  onRefresh,
  isRefetching = false,
}) => {
  // Use persistent ref to maintain tab state across re-mounts
  const [selectedTab, setSelectedTab] = useState<'friends' | 'communities'>(savedTabRef.current);
  
  const handleTabChange = (tab: 'friends' | 'communities') => {
    setSelectedTab(tab);
    savedTabRef.current = tab; // Save to persistent ref
  };
  // selectedCommunities is a list of community IDs
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const handleFilterChange = (communities: string[]) => {
    setSelectedCommunities(communities);
  };

  const joinedCommunities = communityMembers
    .filter((member) => member.status === "ACCEPTED")
    .map((member) => member.community);

  const filteredCommunityFeed = selectedCommunities.length > 0 
    ? communityFeed.filter((post) => 
        selectedCommunities.includes(post.post_targets[0].target_id)
      ) 
    : communityFeed;

  const enrichedCommunityFeed = filteredCommunityFeed.map(post => {
    const community = joinedCommunities.find(
      comm => comm.id === post.post_targets[0].target_id
    );
    return {
      ...post,
      community: community
    };
  });

  // Sort friends feed by creation date (newest first)
  const sortedFriendsFeed = [...friendsFeed].sort((a: any, b: any) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <View style={styles.container}>
      <View style={styles.fixedContent}>
        {/* Header + Explore Button */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Feed</Text>
          <TouchableOpacity 
            onPress={loading ? undefined : () => router.push('/social/explore')}
            disabled={loading}
          >
            <Image 
              source={searchIcon} 
              style={styles.exploreIcon} 
              tintColor="#000000" 
            />
          </TouchableOpacity>
        </View>
        {/* Tab Selector */}
        <TabSelector 
          onTabChange={loading ? () => {} : handleTabChange}
          selectedTab={selectedTab}
        />
      </View>
      
      <View style={styles.contentContainer}>
        <FlatList
          style={[styles.scrollContainer, loading && styles.disabledScrollView]}
          data={[{ key: 'content' }]}
          renderItem={() => (
            <View style={styles.scrollContent}>
              {selectedTab === 'communities' && (
                <>
                  {/* Community List Section */}
                  <View style={[styles.communityListSection, loading && styles.disabledContent]}>
                    <CommunityList 
                      communities={joinedCommunities} 
                    />
                  </View>
                  {/* Community Filter Section */}
                  <View style={[styles.filterSection, loading && styles.disabledContent]}>
                    <CommunityFilter 
                      communities={joinedCommunities} 
                      handleFilterChange={handleFilterChange} 
                    />
                  </View>
                </>
              )}
              {/* Feed */}
              <View style={[styles.feedSection, loading && styles.disabledContent]}>
                <Feed 
                  currentTab={selectedTab}
                  posts={selectedTab === 'friends' ? sortedFriendsFeed : enrichedCommunityFeed}
                  handleLikePost={handleLikePost}
                  handleUnlikePost={handleUnlikePost}
                />
              </View>
            </View>
          )}
          keyExtractor={() => 'content'}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!loading}
          refreshControl={
            !loading ? (
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={onRefresh}
                colors={['#DE728D']} // Android
                tintColor="#DE728D" // iOS
              />
            ) : undefined
          }
        />
        
        {/* Loading Overlay */}
        <LoadingOverlay 
          visible={loading} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  fixedContent: {
    paddingTop: 35,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#242020",
    fontFamily: "Poppins",
  },
  exploreIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Add padding at bottom to ensure visibility above navigation bar
  },
  communityListSection: {
    paddingTop: 12,
  },
  filterSection: {
    marginTop: -20,
    marginBottom: 0,
  },
  feedSection: {
    flex: 1,
  },
  headerExtension: {
    backgroundColor: '#E0EDFD',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledIcon: {
    opacity: 0.5,
  },
  disabledScrollView: {
    opacity: 0.5,
  },
  disabledContent: {
    opacity: 0.5,
  },
});

export default SocialScreen;
