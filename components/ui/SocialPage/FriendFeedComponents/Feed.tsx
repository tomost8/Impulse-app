import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import PostCard from "./PostCard";
import FullPostCard from "../Post/fullpostcard";

interface FeedProps {
  currentTab: 'friends' | 'communities';
  posts: any[];
}

const Feed: React.FC<FeedProps> = ({ currentTab, posts }) => {
  const renderItem = ({ item }: { item: typeof posts[0] }) => (
    <View style={styles.postContainer}>
      <PostCard 
        post={item}
        showCommunityTag={currentTab === 'communities'}
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
