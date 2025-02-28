import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";

// Import placeholder images
const defaultPostImage = require("@/assets/images/feedpost.png");
const defaultProfileImage = require("@/assets/images/andrew.png");

interface PostCardProps {
  post: {
    caption?: string;
    author?: {
      profileImage?: string;
    };
    username?: string;
    timeAgo?: string;
    initialLikes?: number;
    initialComments?: number;
    community?: {
      name: string;
    };
  };
  showCommunityTag?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post = {}, showCommunityTag }) => {
  return (
    <View style={styles.container}>
      <PostContent
        caption={post?.caption || "Lorem ipsum dolor sit amet consectetur. Mollis."}
      />
      
      {showCommunityTag && post.community && (
        <TouchableOpacity style={styles.communityTag}>
          <Text style={styles.communityTagText}>{post.community.name}</Text>
        </TouchableOpacity>
      )}

      <PostFooter
        profileImage={post?.author?.profileImage}
        username={post?.username || "User K"}
        timeAgo={post?.timeAgo || "3 mins ago"}
        initialLikes={post?.initialLikes ?? 67}
        initialComments={post?.initialComments ?? 12}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 182,
    minHeight: 324,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 7,
    paddingBottom: 3,
    gap: 5,
    display: "flex",
    flexDirection: "column",
  },
  communityTag: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DE728D',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  communityTagText: {
    color: '#DE728D',
    fontSize: 10,
    fontFamily: 'Poppins',
  },
});

export default PostCard;
