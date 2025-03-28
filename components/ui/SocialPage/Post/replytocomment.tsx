import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getTimeAgo } from '@/utils/timezoneProcessing';

interface ReplyToCommentProps {
  username: string;
  profileImage: string;
  content: string;
  timestamp: string;
}

const ReplyToComment: React.FC<ReplyToCommentProps> = ({
  username,
  profileImage,
  content,
  timestamp
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.commentHeader}>
        <View style={styles.userInfo}>
          <Image
            source={profileImage}
            style={styles.profilePicture}
          />
          <View style={styles.textContainer}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.commentText}>{content}</Text>
          </View>
        </View>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 40, // This creates the indent for replies
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
});

export default ReplyToComment;
