import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import PostCard from "./PostCard";
import FullPostCard from "../Post/fullpostcard";

interface FeedProps {
  currentTab: 'friends' | 'communities';
  posts_data: any[];
}

const Feed: React.FC<FeedProps> = ({ currentTab, posts_data }) => {
  // Sample post data with community info
  const posts = Array(6).fill(null).map((_, index) => ({
    id: index.toString(),
    caption: "Lorem ipsum dolor sit amet consectetur. Mollis.",
    author: {
      profileImage: require("@/assets/images/andrew.png"),
    },
    username: "User K",
    timeAgo: "3 mins ago",
    initialLikes: 67,
    initialComments: 12,
    community: {
      name: "Gabe's Running Club"
    }
  }));

  console.log("posts_data:", posts_data,
    "\nposts:", posts
  );

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
