import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import FullPostCard from '@/components/ui/SocialPage/Post/fullpostcard';
import CommentInput from '@/components/ui/SocialPage/Post/CommentInput';
import CommentSection from '@/components/ui/SocialPage/Post/CommentSection';
import Reply from '@/components/ui/SocialPage/Post/reply';
import { getTimeAgo } from '@/utils/timezoneProcessing';

interface PostScreenProps {
  post: any;
  comments: any[];
  loading: boolean;
  createComment: (comment: string, parentCommentId?: number) => void;
}

const PostScreen = ({ post, comments, loading, createComment }: PostScreenProps) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const params = useLocalSearchParams();
  const [showReply, setShowReply] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);

  const handleReply = (commentId: string) => {
    const comment = comments.find(c => c.id.toString() === commentId);
    setSelectedComment(comment);
    setShowReply(true);
  };

  const handleCommentSubmit = (comment: string) => {
    if (showReply) {
      console.log('Replying to:', selectedComment?.username);
      setShowReply(false);
      setSelectedComment(null);
    }
    createComment(comment, selectedComment?.id);
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
        {/* Full Post Card */}
        <FullPostCard post={{
          username: post.author.username,
          timeAgo: getTimeAgo(post.created_at),
          profileImage: post.author.profile_picture,
          caption: post.caption,
          image: post.mediaUrl,
          likes: 67, // Hardcoded for now
          comments: 10 // Hardcoded for now
        }} />

        {/* Comments Section */}
        <CommentSection
          comments={comments}
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
            profileImage={selectedComment.user.profile_picture}
            username={selectedComment.user.username}
            timestamp={getTimeAgo(selectedComment.created_at)}
            comment={selectedComment.content}
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
