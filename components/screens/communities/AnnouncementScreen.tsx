import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { formatDate } from '@/utils/timezoneProcessing';

interface AnnouncementScreenProps {
  communityName?: string;
  announcements?: any[];
  isAdmin?: boolean;
  communityId?: number;
  currentUserId?: number;
  onSendAnnouncement?: (content: string) => Promise<{ success: boolean; error?: any }>;
}

const AnnouncementScreen: React.FC<AnnouncementScreenProps> = ({
  communityName = "Community Name",
  announcements = [],
  isAdmin = false,
  communityId = 1,
  currentUserId = 0,
  onSendAnnouncement
}) => {
  const [announcement, setAnnouncement] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSend = async () => {
    if (!announcement.trim()) {
      Alert.alert('Error', 'Please enter an announcement message');
      return;
    }

    if (!onSendAnnouncement) {
      Alert.alert('Error', 'Send function not available');
      return;
    }

    setIsLoading(true);
    try {
      const result = await onSendAnnouncement(announcement);
      
      if (result.success) {
        Alert.alert('Success', 'Announcement sent successfully! All community members will receive push notifications immediately.');
        setAnnouncement('');
      } else {
        Alert.alert('Error', 'Failed to send announcement. Please try again.');
      }
    } catch (error) {
      console.error('Failed to send announcement:', error);
      Alert.alert('Error', 'Failed to send announcement. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <SafeAreaView>
              <View style={styles.headerContent}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={handleBack}
                >
                  <Image 
                    source={require("@/assets/icons/backArrow.png")}
                    style={styles.backIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.title}>{communityName}</Text>
              </View>
            </SafeAreaView>
          </View>

          {/* Messages Container */}
          <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
            {announcements.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No announcements yet</Text>
                <Text style={styles.emptyStateSubtext}>
                  {isAdmin ? 'Create the first announcement for your community' : 'Check back later for community updates'}
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

          {/* Input Container with KeyboardAvoidingView */}
          {isAdmin && (
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
              style={styles.keyboardAvoidView}
            >
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={announcement}
                  onChangeText={setAnnouncement}
                  placeholder="Make announcement..."
                  placeholderTextColor="#979797"
                  multiline
                />
                <TouchableOpacity 
                  style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
                  onPress={handleSend}
                  disabled={isLoading}
                >
                  <Image 
                    source={require("@/assets/icons/Sent.png")}
                    style={[styles.sendIcon, isLoading && styles.sendIconDisabled]}
                  />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
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
    padding: 8,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#242020',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#242020',
    marginLeft: 6,
    fontWeight: '600',
  },
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
  keyboardAvoidView: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    backgroundColor: '#FFFFFF',
    marginBottom: 15, 
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
  },
  sendButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#DE728D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  sendIconDisabled: {
    tintColor: '#999999',
  },
});

export default AnnouncementScreen;
