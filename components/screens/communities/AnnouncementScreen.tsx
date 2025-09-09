import React, { useState } from 'react';
import { 
  View, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Alert,
} from 'react-native';
import { AnnouncementMessageList } from '@/components/features/communities';
import Header from '@/components/ui/common/headers/Header';
import { router } from 'expo-router';

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
          <Header 
            title={communityName}
            onBackPress={() => router.back()}
          />

          {/* Announcement Message List */}
          <AnnouncementMessageList 
            announcements={announcements}
            currentUserId={currentUserId}
          />

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
