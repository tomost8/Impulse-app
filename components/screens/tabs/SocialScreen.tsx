import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import TabSelector from "@/components/ui/SocialPage/FriendFeedComponents/TabSelector";
import ListWithProfiles from "@/components/ui/SocialPage/CommunityFeedComponents/ListWithProfiles";
import Filter from "@/components/ui/SocialPage/CommunityFeedComponents/Filter";
import Feed from "@/components/ui/SocialPage/FriendFeedComponents/Feed";

const exploreIcon = require("@/assets/icons/explore.png");

interface SocialScreenProps {
  communityMembers: any[];
  isCommunityMembersLoading: boolean;
  friendsFeed: any[];
  isFriendsFeedLoading: boolean;
  communityFeed: any[];
  isCommunityFeedLoading: boolean;
  handleLikePost: (postId: number) => Promise<void>;
  handleUnlikePost: (postId: number) => Promise<void>;
  isHandlingLike: boolean;
  isHandlingUnlike: boolean;
  updatePostLikeState: (postId: number, liked: boolean) => void;
}

const SocialScreen: React.FC<SocialScreenProps> = ({
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
}) => {
  const [selectedTab, setSelectedTab] = useState<'friends' | 'communities'>('friends');
  const handleTabChange = (tab: 'friends' | 'communities') => {
    setSelectedTab(tab);
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

  console.log("tab:", selectedTab,
    "\njoinedCommunities:", joinedCommunities,
    "\ncommunityFeed:", communityFeed,
    "\nfilter:", selectedCommunities,
    "\nfilteredCommunityFeed:", filteredCommunityFeed
  );

  return (
    <View style={styles.container}>
      <View style={styles.fixedContent}>
        {/* Header + Explore Button */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Feed</Text>
          <TouchableOpacity onPress={() => console.log('Explore pressed')}>
            <Image source={exploreIcon} style={styles.exploreIcon} />
          </TouchableOpacity>
        </View>
        {/* Tab Selector */}
        <TabSelector 
          onTabChange={handleTabChange}
          selectedTab={selectedTab}
        />
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.scrollContent}>
          {selectedTab === 'communities' && (
            <>
              {/* Community List Section */}
              <View style={styles.communityListSection}>
                <ListWithProfiles 
                  communities={joinedCommunities} 
                />
              </View>
              {/* Community Filter Section */}
              <View style={styles.filterSection}>
                <Filter 
                  communities={joinedCommunities} 
                  handleFilterChange={handleFilterChange} 
                />
              </View>
            </>
          )}
          {/* Feed */}
          <View style={styles.feedSection}>
            <Feed 
              currentTab={selectedTab}
              posts_data={selectedTab === 'friends' ? friendsFeed : filteredCommunityFeed}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
  },
  communityListSection: {
    paddingTop: 12,
  },
  filterSection: {
    marginTop: -20,
    marginBottom: -12,
  },
  feedSection: {
    flex: 1,
  },
});

export default SocialScreen;
