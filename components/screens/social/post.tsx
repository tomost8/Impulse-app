import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import FullPostCard from '@/components/ui/SocialPage/Post/fullpostcard';

const PostScreen = () => {
  const params = useLocalSearchParams();
  
  // This would normally come from your data/API layer
  // Using sample data for now
  const samplePost = {
    username: "User K",
    timeAgo: "18 minutes ago",
    profileImage: require("@/assets/images/andrew.png"),
    caption: "Lorem ipsum dolor sit amet consectetur. Ultricies diam aenean vestibulum sit nam quis quis dolor eu.",
    image: require("@/assets/images/feedpost.png"),
    likes: 67,
    comments: 10,
  };

  return (
    <SafeAreaView style={styles.container}>
      <FullPostCard post={samplePost} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default PostScreen;
