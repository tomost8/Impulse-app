import React from "react";
import { View, StyleSheet } from "react-native";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";

interface PostCardProps {
  imageUrl?: string;
  caption: string;
  profileImage: string;
  username: string;
  timeAgo: string;
  initialLikes?: number;
  initialComments?: number;
}

const PostCard: React.FC<PostCardProps> = ({
  imageUrl = require("../assets/images/feedpost.png"), // Default image
  caption,
  profileImage = require("../assets/images/andrew.png"), // Default profile image
  username,
  timeAgo,
  initialLikes = 67,
  initialComments = 12,
}) => {
  return (
    <View style={styles.container}>
      <PostContent imageUrl={imageUrl} caption={caption} />
      <PostFooter
        profileImage={profileImage}
        username={username}
        timeAgo={timeAgo}
        initialLikes={initialLikes}
        initialComments={initialComments}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    width: "48%", // Adjusted for grid layout
  },
});

export default PostCard;
