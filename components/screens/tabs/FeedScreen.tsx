import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Feed from "@/components/ui/SocialPage/FriendFeedComponents/Feed";
import TabSelector from "@/components/ui/SocialPage/FriendFeedComponents/TabSelector";

// Import local assets
const exploreIcon = require("@/assets/icons/explore.png");
const postImage = require("@/assets/images/feedpost.png"); // ✅ Post image
const profileImage = require("@/assets/images/andrew.png"); // ✅ Profile image

const FeedScreen: React.FC = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Feed</Text>
        <TouchableOpacity>
          <Image 
            source={require("@/assets/icons/explore.png")} 
            style={styles.exploreIcon} 
          />
        </TouchableOpacity>
      </View>
      
      <TabSelector />
      <Feed />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
});

export default FeedScreen;
