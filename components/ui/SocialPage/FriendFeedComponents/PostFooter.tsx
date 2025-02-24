import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

interface PostFooterProps {
    profileImage: any;
    username: string;
    timeAgo: string;
    initialLikes: number;
    initialComments: number;
  }

const PostFooter: React.FC<PostFooterProps> = ({
    profileImage,
    username,
    timeAgo,
    initialLikes,
    initialComments,
}) => {
    return (
        <View style={styles.container}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={styles.textContainer}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
          </View>
          <CommentButton initialComments={initialComments} />
          <LikeButton initialLikes={initialLikes} />
        </View>
      );
    };

    const styles = StyleSheet.create({
        container: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        },
        profileImage: {
          width: 32,
          height: 32,
          borderRadius: 16,
        },
        textContainer: {
          flex: 1,
          marginLeft: 10,
        },
        username: {
          fontSize: 14,
          fontWeight: "bold",
          color: "#242020",
        },
        timeAgo: {
          fontSize: 12,
          color: "#5E6676",
        },
      });
      
      export default PostFooter;