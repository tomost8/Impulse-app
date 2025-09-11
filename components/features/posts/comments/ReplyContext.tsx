import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface ReplyProps {
  profileImage: string;
  username: string;
  timestamp: string;
  comment: string;
  onClose?: () => void;
}

const ReplyContext: React.FC<ReplyProps> = ({
  profileImage,
  username,
  timestamp,
  comment,
  onClose
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.replyingText}>Replying to @{username}</Text>
        <TouchableOpacity onPress={onClose}>
          <Image 
            source={require("@/assets/icons/cancelreply.png")}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.commentContainer}>
        <View style={styles.commentHeader}>
          <View style={styles.userInfo}>
            <Image
              source={{uri: profileImage}}
              style={styles.profilePicture}
            />
            <View style={styles.textContainer}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.commentText}>{comment}</Text>
            </View>
          </View>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
  },
  replyingText: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  closeIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  commentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
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

export default ReplyContext;
