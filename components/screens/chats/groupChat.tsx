import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { s } from "react-native-size-matters";
import { router, useLocalSearchParams } from 'expo-router';

interface GroupChatProps {
  chat: any;
}

const GroupChat = (props: GroupChatProps) => {
  const { chat } = props;
  const { chatId } = useLocalSearchParams();
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Image
              source={require("@/assets/icons/backArrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push(`/chats/${chatId}/groupInfo`)}
          >
            <Image
              source={chat?.profile_pic}
              style={styles.profileImage}
            />
            <Text style={styles.headerTitle}>{chat?.title}</Text>
            <Image
              source={require("@/assets/icons/arrow-Right.png")}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages Area */}
      <ScrollView style={styles.chatContainer}>
        {/* Chat messages will go here */}
      </ScrollView>

      {/* Message Input Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={styles.inputContainer}
      >
        <View style={styles.messageInputWrapper}>
          <TextInput
            style={styles.messageInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Send message"
            placeholderTextColor="#979797"
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={() => {
              // Handle send message
              setMessage('');
            }}
          >
            <Image
              source={require("@/assets/icons/Sent.png")}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#E0EDFD',
    paddingTop: s(15),
    paddingBottom: s(12),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(16),
    gap: 12,
  },
  backButton: {
    marginRight: 8,
  },
  backIcon: {
    width: 11,
    height: 15,
  },
  profileButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  arrowIcon: {
    width: 5,
    height: 11,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
    padding: 16,
  },
  messageInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  messageInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#242020',
    maxHeight: 40,
    minHeight: 32,
  },
  sendButton: {
    padding: 8,
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
});

export default GroupChat;
