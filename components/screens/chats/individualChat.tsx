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
  StatusBar,
} from 'react-native';
import { s } from "react-native-size-matters";
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

interface IndividualChatProps {
  partner: any;
}

const IndividualChat = (props: IndividualChatProps) => {
  const { partner } = props;
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
              style={styles.profileButton}
              onPress={() => router.push(`/user/${partner.id}`)}
            >
              <Image
                source={partner.profile_picture}
                style={styles.profileImage}
              />
              <Text style={styles.headerTitle}>{partner.first_name} {partner.last_name}</Text>
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
        keyboardVerticalOffset={0}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerBackground: {
    backgroundColor: '#E0EDFD',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
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
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
  chatContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  messageInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 4,
    margin: 16,
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

export default IndividualChat;
