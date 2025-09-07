import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import FullPostCard from '@/components/features/posts/FullPostCard';
import CommentInput from '@/components/features/posts/CommentInput';
import CommentSection from '@/components/features/posts/CommentSection';
import ReplyContext from '@/components/features/posts/ReplyContext';
import { getTimeAgo } from '@/utils/timezoneProcessing';

interface PostScreenProps {
  post: any;
  comments: any[];
  loading: boolean;
  createComment: (comment: string, parentCommentId?: number) => void;
  onLike: () => void;
  onUnlike: () => void;
  formattedDate?: string | null;
}

const PostScreen = ({ post, comments, loading, createComment, onLike, onUnlike, formattedDate }: PostScreenProps) => {
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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerBackground}>
          <SafeAreaView>
            <View style={styles.headerContent}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Image 
                  source={require("@/assets/icons/backArrow.png")}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Post</Text>
            </View>
          </SafeAreaView>
        </View>

        {/* Full Post Card */}
        <FullPostCard 
          post={{
            username: post.author.username,
            timeAgo: getTimeAgo(post.created_at),
            profileImage: post.author.profile_picture,
            caption: post.caption,
            images: post.mediaUrls,
            liked: post.liked,
            likeCount: post.likeCount,
            commentCount: comments.reduce((total, comment) => 
              total + 1 + (comment.replies?.length || 0), 0),
            category: post.category
          }} 
          onLike={onLike} 
          onUnlike={onUnlike}
          formattedDate={formattedDate}
        />

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
          <ReplyContext
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF',
    marginBottom: 16,
  },
  headerBackground: {
    backgroundColor: '#E0EDFD',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 8,
  },
  backIcon: {
    width: 10,
    height: 15,
    tintColor: '#242020',
    marginLeft: 6,
    marginRight: 6,
  },
  headerTitle: {
    color: '#242020',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
});

export default PostScreen;
