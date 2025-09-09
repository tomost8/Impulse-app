import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { formatDate } from '@/utils/timezoneProcessing';

interface Announcement {
  id: number;
  content: string;
  created_at: string;
  sender?: {
    id: number;
    username?: string;
    profile_picture?: string;
  };
}

interface AnnouncementMessageListProps {
  announcements: Announcement[];
  currentUserId: number;
}

const AnnouncementMessageList: React.FC<AnnouncementMessageListProps> = ({
  announcements,
  currentUserId
}) => {
  return (
    <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
      {announcements.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No announcements yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Check back later for community updates
          </Text>
        </View>
      ) : (
        announcements.map((announcement) => {
          const isCurrentUser = announcement.sender?.id === currentUserId;
          return (
            <View key={announcement.id} style={[
              styles.messageBubble,
              isCurrentUser ? styles.messageBubbleRight : styles.messageBubbleLeft
            ]}>
              {!isCurrentUser && (
                <Image 
                  source={
                    announcement.sender?.profile_picture 
                      ? { uri: announcement.sender.profile_picture }
                      : require("@/assets/images/profilepicturecircle.png")
                  }
                  style={styles.profilePicture}
                />
              )}
              <View style={[
                styles.messageContainer,
                isCurrentUser ? styles.messageContainerRight : styles.messageContainerLeft
              ]}>
                {!isCurrentUser && (
                  <Text style={styles.senderName}>
                    {announcement.sender?.username || 'Unknown User'}
                  </Text>
                )}
                <View style={[
                  styles.messageContent,
                  isCurrentUser ? styles.messageContentRight : styles.messageContentLeft
                ]}>
                  <Text style={[
                    styles.messageText,
                    isCurrentUser ? styles.messageTextRight : styles.messageTextLeft
                  ]}>{announcement.content}</Text>
                  <Text style={[
                    styles.messageTime,
                    isCurrentUser ? styles.messageTimeRight : styles.messageTimeLeft
                  ]}>{formatDate(announcement.created_at)}</Text>
                </View>
              </View>
              {isCurrentUser && (
                <Image 
                  source={
                    announcement.sender?.profile_picture 
                      ? { uri: announcement.sender.profile_picture }
                      : require("@/assets/images/profilepicturecircle.png")
                  }
                  style={styles.profilePicture}
                />
              )}
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#666666',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#999999',
    textAlign: 'center',
    lineHeight: 20,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  messageBubbleLeft: {
    justifyContent: 'flex-start',
  },
  messageBubbleRight: {
    justifyContent: 'flex-end',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0EDFD',
  },
  messageContainer: {
    flex: 1,
  },
  messageContainerLeft: {
    marginLeft: 12,
  },
  messageContainerRight: {
    marginRight: 12,
    alignItems: 'flex-end',
  },
  senderName: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#242020',
    fontWeight: '600',
    marginBottom: 4,
  },
  messageContent: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '85%',
    position: 'relative',
  },
  messageContentLeft: {
    backgroundColor: '#E0EDFD',
    borderTopLeftRadius: 4,
  },
  messageContentRight: {
    backgroundColor: '#E0EDFD',
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTextLeft: {
    color: '#333333',
  },
  messageTextRight: {
    color: '#333333',
  },
  messageTime: {
    fontSize: 11,
    fontFamily: 'Open Sans',
    textAlign: 'right',
  },
  messageTimeLeft: {
    color: '#999999',
  },
  messageTimeRight: {
    color: '#999999',
  },
});

export default AnnouncementMessageList;
