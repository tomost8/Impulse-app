import React from "react";
import { View, StyleSheet } from "react-native";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";

// Import placeholder images
const defaultPostImage = require("@/assets/images/feedpost.png");
const defaultProfileImage = require("@/assets/images/andrew.png");

interface PostCardProps {
    post?: {
      caption?: string;
      author?: {
        profileImage?: string; // ✅ Ensure it matches `PostFooter.tsx`
      };
      username?: string;
      timeAgo?: string;
      initialLikes?: number;
      initialComments?: number;
    };
  }
  
  // ✅ Ensure `post` always has default values
  const PostCard: React.FC<PostCardProps> = ({ post = {} }) => {
    console.log("🛠️ PostCard received post:", post); // ✅ Debugging output
  
    return (
      <View style={styles.container}>
        <PostContent
          caption={post?.caption || "Lorem ipsum dolor sit amet consectetur. Mollis."}
        />
        <PostFooter
          profileImage={post?.author?.profileImage || defaultProfileImage}
          username={post?.username || "Andrew"}
          timeAgo={post?.timeAgo || "2 mins ago"}
          initialLikes={post?.initialLikes ?? 67}
          initialComments={post?.initialComments ?? 12}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 324,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 7,
    gap: 5,
    display: "flex",
    flexDirection: "column",
  },
});

export default PostCard;
