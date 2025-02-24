import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import PostCard from "./PostCard";

// Dummy data for posts
const posts = [
  {
    id: "1",
    profileImage: require("../assets/images/andrew.png"),
    username: "User K",
    timeAgo: "3 mins ago",
    imageUrl: require("../assets/images/feedpost.png"),
    caption: "Lorem ipsum dolor sit amet consectetur. Mollis.",
    initialLikes: 67,
    initialComments: 12,
  },
  {
    id: "2",
    profileImage: require("../assets/images/andrew.png"),
    username: "User K",
    timeAgo: "3 mins ago",
    imageUrl: require("../assets/images/feedpost.png"),
    caption: "Lorem ipsum dolor sit amet consectetur. Mollis.",
    initialLikes: 67,
    initialComments: 12,
  },
  {
    id: "3",
    profileImage: require("../assets/images/andrew.png"),
    username: "User K",
    timeAgo: "3 mins ago",
    imageUrl: require("../assets/images/feedpost.png"),
    caption: "Lorem ipsum dolor sit amet consectetur. Mollis.",
    initialLikes: 67,
    initialComments: 12,
  },
  {
    id: "4",
    profileImage: require("../assets/images/andrew.png"),
    username: "User K",
    timeAgo: "3 mins ago",
    imageUrl: require("../assets/images/feedpost.png"),
    caption: "Lorem ipsum dolor sit amet consectetur. Mollis.",
    initialLikes: 67,
    initialComments: 12,
  },
];

const Feed = () => {
  const renderItem = ({ item }: { item: typeof posts[0] }) => (
    <View style={styles.postContainer}>
      <PostCard {...item} />
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2} // Two-column grid layout
      contentContainerStyle={styles.feedContainer}
      columnWrapperStyle={styles.columnWrapper}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  postContainer: {
    flex: 1,
    marginBottom: 15,
  },
});

export default Feed;
