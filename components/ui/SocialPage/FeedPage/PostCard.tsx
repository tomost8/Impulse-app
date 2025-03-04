import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import { router } from "expo-router";

import { getTimeAgo } from "@/utils/timezoneProcessing";

interface PostCardProps {
  post: {
    id: string;
    mediaUrl?: string;
    caption?: string;
    author?: {
      profile_picture?: string;
      username?: string;
    };
    created_at?: string;
    commentCount?: number;
    likeCount?: number;
    community?: {
      id: number;
      name: string;
    };
  };
  showCommunityTag?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showCommunityTag }) => {
  console.log("post:", post, "showCommunityTag:", showCommunityTag);

  const handlePostPress = () => {
    router.push(`/post/${post.id}`);
  };

  const hasCaption = post?.caption && post.caption.trim().length > 0;

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        !hasCaption && styles.containerNoCaption
      ]}
      onPress={handlePostPress}
      activeOpacity={0.7}
    >
      <PostContent
        imageUrl={post?.mediaUrl}
        caption={post?.caption || ""}
      />
      
      {showCommunityTag && post.community && (
        <TouchableOpacity 
          onPress={() => router.push(`/community/${post.community?.id}`)}
          style={[
            styles.communityTag,
            !hasCaption && styles.communityTagNoCaption
          ]}
        >
          <Text style={styles.communityTagText}>{post.community.name}</Text>
        </TouchableOpacity>
      )}

      <PostFooter
        profileImage={post?.author?.profile_picture}
        username={post?.author?.username || ""}
        timeAgo={getTimeAgo(post?.created_at || "")}
        initialLikes={post?.likeCount ?? 0}
        initialComments={post?.commentCount ?? 0}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 182,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 7,
    paddingBottom: 3,
    gap: 8,
    display: "flex",
    flexDirection: "column",
  },
  containerNoCaption: {
    gap: 0,
    paddingBottom: 0,
  },
  communityTag: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DE728D',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 6,
  },
  communityTagNoCaption: {
    marginTop: 8,
    marginBottom: 1,
  },
  communityTagText: {
    color: '#DE728D',
    fontSize: 10,
    fontFamily: 'Poppins',
  },
});

export default PostCard;
