import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

interface PostFooterProps {
  profileImage?: any;
  username: string;
  timeAgo: string;
  initialLikes: number;
  initialComments: number;
}

const PostFooter: React.FC<PostFooterProps> = ({
  profileImage,
  username,
  timeAgo,
  initialLikes = 0,
  initialComments = 0,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.timeAgo}>{timeAgo}</Text>
        </View>
      </View>

      <View style={styles.interactions}>
        <CommentButton initialComments={initialComments} />
        <LikeButton initialLikes={initialLikes} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 0,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 12,
  },
  textContainer: {
    gap: 4,
  },
  username: {
    fontSize: 11,
    fontFamily: "Lato",
    color: "#000000",
  },
  timeAgo: {
    fontSize: 9,
    fontFamily: "Lato",
    color: "#5E6676",
  },
  interactions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default PostFooter;