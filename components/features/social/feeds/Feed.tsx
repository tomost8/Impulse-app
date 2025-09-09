//import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import PostCard from "./PostCard";

interface FeedProps {
  currentTab: 'friends' | 'communities';
  posts: any[];
  handleLikePost: (postId: number) => Promise<void>;
  handleUnlikePost: (postId: number) => Promise<void>;
}

const Feed: React.FC<FeedProps> = ({ currentTab, posts, handleLikePost, handleUnlikePost }) => {
  const renderItem = ({ item }: { item: typeof posts[0] }) => (
    <View style={styles.postContainer}>
      <PostCard 
        post={item}
        showCommunityTag={currentTab === 'communities'}
        handleLikePost={() => handleLikePost(item.id)}
        handleUnlikePost={() => handleUnlikePost(item.id)}
      />
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.feedContainer}
      columnWrapperStyle={styles.columnWrapper}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    paddingHorizontal: 7,
    paddingTop: 10,
    paddingBottom: 120,
  },
  columnWrapper: {
    justifyContent: "space-between",
    gap: 5,
    paddingHorizontal: 5,
  },
  postContainer: {
    marginBottom: 16,
  },
  fullPostContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default Feed;
