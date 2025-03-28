import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getTimeAgo } from '@/utils/timezoneProcessing';
import ReplyToComment from './replytocomment';

interface Comment {
  id: number;
  user: {
    username: string;
    profile_picture: string;
  };
  content: string;
  created_at: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  comments: Comment[];
  onReply?: (commentId: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  comments = [],
  onReply 
}) => {

  return (
    <ScrollView style={styles.container}>
      {comments.map((comment) => (
        <View key={comment.id}>
          {/* Main comment */}
          <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
              <View style={styles.userInfo}>
                <Image
                  source={{ uri: comment.user.profile_picture }}
                  style={styles.profilePicture}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.username}>{comment.user.username}</Text>
                  <Text style={styles.commentText}>{comment.content}</Text>
                </View>
              </View>
              <Text style={styles.timestamp}>{getTimeAgo(comment.created_at)}</Text>
            </View>
            <TouchableOpacity 
              style={styles.replyButton}
              onPress={() => onReply?.(comment.id.toString())}
            >
              <Text style={styles.replyText}>Reply</Text>
            </TouchableOpacity>
          </View>

          {/* Replies */}
          {comment.replies?.map((reply) => (
            <ReplyToComment
              key={reply.id}
              username={reply.user.username}
              profileImage={reply.user.profile_picture}
              content={reply.content}
              timestamp={getTimeAgo(reply.created_at)}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  commentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
  },
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#242020',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#242020',
    lineHeight: 17,
  },
  timestamp: {
    fontSize: 10,
    fontFamily: 'Open Sans',
    color: '#979797',
    marginLeft: 8,
  },
  replyButton: {
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  replyText: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
});

export default CommentSection;
