import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Header from '@/components/ui/SocialPage/Post/header';
import Content from '@/components/ui/SocialPage/Post/content';
import CommentInput from '@/components/ui/SocialPage/Post/CommentInput';
import CommentSection from '@/components/ui/SocialPage/Post/CommentSection';
import Reply from '@/components/ui/SocialPage/Post/reply';

const PostScreen = () => {
  const params = useLocalSearchParams();
  const [showReply, setShowReply] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  
  // Sample data for testing
  const samplePost = {
    username: "User K",
    timeAgo: "18 minutes ago",
    profileImage: require("@/assets/images/andrew.png"),
    caption: "Lorem ipsum dolor sit amet consectetur. Ultricies diam aenean vestibulum sit nam quis quis dolor eu.",
    image: require("@/assets/images/feedpost.png"),
    likes: 67,
    comments: 10,
  };

  const sampleComments = [
    {
      id: '1',
      username: 'donastro',
      text: 'Wow amazing photo 😉',
      timestamp: '5:10:55 PM'
    },
    {
      id: '2',
      username: 'johndoe',
      text: 'Great shot!',
      timestamp: '5:15:20 PM'
    }
  ];

  const handleReply = (commentId: string) => {
    const comment = sampleComments.find(c => c.id === commentId);
    setSelectedComment(comment);
    setShowReply(true);
  };

  const handleCommentSubmit = (comment: string) => {
    console.log('New comment:', comment);
    if (showReply) {
      // Handle reply submission
      console.log('Replying to:', selectedComment?.username);
      setShowReply(false);
      setSelectedComment(null);
    }
    // Handle comment submission
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topSection}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image 
            source={require("@/assets/icons/backArrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.postTitle}>post/[id]</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Post Header */}
        <Header
          username={samplePost.username}
          timeAgo={samplePost.timeAgo}
          profileImage={samplePost.profileImage}
        />

        {/* Post Content */}
        <Content
          caption={samplePost.caption}
          imageUrl={samplePost.image}
        />

        {/* Comments Section */}
        <CommentSection
          comments={sampleComments}
          onReply={handleReply}
        />
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={styles.bottomContainer}
      >
        {/* Reply Section (if active) */}
        {showReply && selectedComment && (
          <Reply
            username={selectedComment.username}
            timestamp={selectedComment.timestamp}
            comment={selectedComment.text}
            onClose={() => {
              setShowReply(false);
              setSelectedComment(null);
            }}
          />
        )}

        {/* Comment Input */}
        <CommentInput 
          onSubmit={handleCommentSubmit}
          placeholder={showReply ? `Reply to @${selectedComment?.username}...` : "Type comment..."}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0066FF',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  postTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default PostScreen;
