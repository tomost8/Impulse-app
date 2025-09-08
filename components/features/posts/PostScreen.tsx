import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, StatusBar, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import FullPostCard from '@/components/features/posts/FullPostCard';
import CommentInput from '@/components/features/posts/CommentInput';
import CommentSection from '@/components/features/posts/CommentSection';
import ReplyContext from '@/components/features/posts/ReplyContext';
import { getTimeAgo } from '@/utils/timezoneProcessing';
import LoadingScreen from '@/components/ui/common/loading';
import { useMemoriesNav } from '@/contexts/MemoriesContext';
import { saveImageToCameraRoll, formatMonthDayYear } from '@/utils/memories';

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
  if (loading) return <LoadingScreen />;

  const insets = useSafeAreaInsets();
  const { getPrevId, getNextId } = useMemoriesNav();
  const prevId = getPrevId();
  const nextId = getNextId();

  // Track which side (0/1) is visible for double-sided picture
  const [side, setSide] = useState(0);
  const images: string[] = post?.mediaUrls || [];
  const visibleUrl = images[side] ?? images[0];

  // Missing state added back
  const [showReply, setShowReply] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);

  // Missing handlers added back
  const handleReply = (commentId: string) => {
    const comment = comments.find((c) => c.id.toString() === commentId);
    if (comment) {
      setSelectedComment(comment);
      setShowReply(true);
    }
  };

  const handleCommentSubmit = (comment: string) => {
    createComment(comment, selectedComment?.id);
    // Reset reply UI
    setShowReply(false);
    setSelectedComment(null);
  };

  const onSave = async () => {
    try {
      await saveImageToCameraRoll(visibleUrl);
      Alert.alert('Saved', 'Image saved to camera roll');
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Could not save image');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topSafeArea, { height: insets.top }]} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.headerExtension}>
              <View style={styles.headerContent}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                  <Image source={require("@/assets/icons/backArrow.png")} style={styles.backIcon} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Post</Text>

                <TouchableOpacity onPress={onSave} style={{ marginLeft: 'auto' }}>
                  <Text style={{ color: '#DE728D', fontWeight: '700' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Double sided toggle (simple) */}
            {images.length > 1 && (
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 6 }}>
                <TouchableOpacity onPress={() => setSide(0)}>
                  <View style={{ width: 10, height: 10, borderRadius: 5, margin: 4, backgroundColor: side === 0 ? '#DE728D' : '#ccc' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSide(1)}>
                  <View style={{ width: 10, height: 10, borderRadius: 5, margin: 4, backgroundColor: side === 1 ? '#DE728D' : '#ccc' }} />
                </TouchableOpacity>
              </View>
            )}

            <FullPostCard
              post={{
                username: post.author.username,
                timeAgo: getTimeAgo(post.created_at),
                profileImage: post.author.profile_picture,
                caption: post.caption,
                images: [visibleUrl], // ensure the shown image matches the toggle
                liked: post.liked,
                likeCount: post.likeCount,
                commentCount: comments.reduce((t, c) => t + 1 + (c.replies?.length || 0), 0),
                category: post.category
              }}
              onLike={onLike}
              onUnlike={onUnlike}
              formattedDate={formattedDate}
            />

            <CommentSection comments={comments} onReply={handleReply} />
          </ScrollView>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            style={styles.bottomContainer}
          >
            {/* Reply Section (if active) */}
            {showReply && selectedComment && (
              <ReplyContext
                profileImage={selectedComment.user?.profile_picture}
                username={selectedComment.user?.username}
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
              placeholder={showReply ? `Reply to @${selectedComment?.user?.username}...` : "Type comment..."}
            />

            {/* Bottom Safe Area - White (inside KeyboardAvoidingView) */}
            <View style={[styles.bottomSafeArea, { height: insets.bottom }]} />
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  topSafeArea: { backgroundColor: '#E0EDFD', width: '100%' },
  bottomSafeArea: { backgroundColor: '#FFFFFF', width: '100%' },
  safeArea: { flex: 1 },
  contentContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollView: { flex: 1 },
  headerExtension: { backgroundColor: '#E0EDFD', width: '100%' },
  bottomContainer: { backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#FFFFFF', paddingBottom: 8 },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 16 },
  backButton: { marginRight: 8 },
  backIcon: { width: 10, height: 15, tintColor: '#242020', marginLeft: 6, marginRight: 6 },
  headerTitle: { color: '#242020', fontSize: 16, fontFamily: 'Poppins', fontWeight: '600' },
});

export default PostScreen;