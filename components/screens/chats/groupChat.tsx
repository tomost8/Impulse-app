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

const GroupChat = () => {
  const { chatId } = useLocalSearchParams();
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
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
            <TouchableOpacity 
              style={styles.groupButton}
              onPress={() => router.push(`/chats/${chatId}/groupInfo`)}
            >
              <Image
                source={require("@/assets/images/andrew.png")}
                style={styles.groupImage}
              />
              <Text style={styles.name}>Running Club</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    backgroundColor: '#E0EDFD',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(16),
    paddingTop: s(8),
    paddingBottom: s(12),
    gap: 12,
  },
  backButton: {
    marginRight: 8,
  },
  backIcon: {
    width: 11,
    height: 15,
  },
  groupButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  inputContainer: {
    padding: 10,
    marginBottom: 26, 
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
