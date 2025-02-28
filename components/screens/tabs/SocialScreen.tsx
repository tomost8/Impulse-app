import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Feed from "@/components/ui/SocialPage/FriendFeedComponents/Feed";
import TabSelector from "@/components/ui/SocialPage/FriendFeedComponents/TabSelector";
import ListWithProfiles from "@/components/ui/SocialPage/CommunityFeedComponents/ListWithProfiles";
import Filter from "@/components/ui/SocialPage/CommunityFeedComponents/Filter";

// Import local assets
const exploreIcon = require("@/assets/icons/explore.png");
const filterIcon = require("@/assets/icons/filter.png");
const postImage = require("@/assets/images/feedpost.png"); // ✅ Post image
const profileImage = require("@/assets/images/andrew.png"); // ✅ Profile image

interface SocialScreenProps {}

const SocialScreen: React.FC<SocialScreenProps> = () => {
  console.log("✅ FeedScreen Loaded!");

  // ✅ Single post for testing
  const testPost = {
    author: { 
      profileImage: profileImage,
    },
    username: "Andrew",
    timeAgo: "2 mins ago",
    initialLikes: 67,
    initialComments: 12,
  };

  console.log("📌 Post Data: ", testPost); // ✅ Debugging to confirm data

  const [selectedTab, setSelectedTab] = useState<'friends' | 'communities'>('friends');
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);

  const handleTabChange = (tab: 'friends' | 'communities') => {
    setSelectedTab(tab);
  };

  const handleFilterChange = (communities: string[]) => {
    setSelectedCommunities(communities);
    // Add your filter logic here
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header and Tab Selector */}
      <View style={styles.fixedContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Feed</Text>
          <TouchableOpacity>
            <Image source={exploreIcon} style={styles.exploreIcon} />
          </TouchableOpacity>
        </View>
        
        <TabSelector 
          onTabChange={handleTabChange}
          selectedTab={selectedTab}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.scrollContent}>
          {selectedTab === 'communities' && (
            <>
              <View style={styles.communityListSection}>
                <ListWithProfiles 
                  onCommunityPress={(id) => console.log('Community pressed:', id)} 
                />
              </View>
              
              <View style={styles.filterSection}>
                <Filter onFilterChange={handleFilterChange} />
              </View>
            </>
          )}
          
          <View style={styles.feedSection}>
            <Feed currentTab={selectedTab} />
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
