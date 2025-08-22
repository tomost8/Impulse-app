//import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import { router } from "expo-router";

import { getTimeAgo } from "@/utils/timezoneProcessing";

interface PostCardProps {
  post: {
    id: string;
    mediaUrls?: string[];
    caption?: string;
    author?: {
      profile_picture?: string;
      username?: string;
    };
    created_at?: string;
    commentCount?: number;
    likeCount?: number;
    liked?: boolean;
    community?: {
      id: number;
      name: string;
    };
  };
  showCommunityTag?: boolean;
  handleLikePost: () => Promise<void>;
  handleUnlikePost: () => Promise<void>;
}

const PostCard: React.FC<PostCardProps> = ({ post, showCommunityTag, handleLikePost, handleUnlikePost }) => {
  // Clean log without long URLs (commented out to reduce console clutter)
  // const cleanPost = {
  //   ...post,
  //   author: post.author ? {
  //     ...post.author,
  //     profile_picture: '[PROFILE_PICTURE_URL]'
  //   } : post.author,
  //   community: post.community ? {
  //     ...post.community,
  //     thumbnail: '[THUMBNAIL_URL]'
  //   } : post.community,
  //   mediaUrls: post.mediaUrls ? `[${post.mediaUrls.length} MEDIA_URLS]` : post.mediaUrls
  // };
  // console.log("post:", cleanPost, "showCommunityTag:", showCommunityTag);

  const handlePostPress = () => {
    router.push(`/post/${post.id}?isLiked=${post?.liked ?? false}`);
  };

  const hasCaption = post?.caption && post.caption.trim().length > 0;

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        !hasCaption && styles.containerNoCaption,
        { paddingBottom: showCommunityTag ? 3 : 0 }
      ]}
      onPress={handlePostPress}
      activeOpacity={0.7}
    >
      <PostContent
        imageUrls={post?.mediaUrls}
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
        liked={post?.liked ?? false}
        handleLikePost={handleLikePost}
        handleUnlikePost={handleUnlikePost}
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
    gap: 4,
    display: "flex",
    flexDirection: "column",
  },
  containerNoCaption: {
    gap: 0,
  },
  communityTag: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DE728D',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 0,
    marginBottom: 0,
  },
  communityTagNoCaption: {
    marginTop: 4,
    marginBottom: 0,
  },
  communityTagText: {
    color: '#DE728D',
    fontSize: 10,
    fontFamily: 'Poppins',
  },
});

export default PostCard;
