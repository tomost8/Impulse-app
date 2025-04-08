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
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

interface IndividualChatProps {
  partner: any;
}

const IndividualChat = (props: IndividualChatProps) => {
  const { partner } = props;
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        {/* Crescent Background */}
        <View style={styles.crescentContainer}>
          <View style={styles.crescent} />
        </View>

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

          {/* Profile Section - Clickable */}
          <TouchableOpacity 
            style={styles.profileSection}
            onPress={() => router.push(`/user/${partner.id}`)}
          >
            <Image
              source={partner.profile_picture}
              style={styles.profileImage}
            />
            <Text style={styles.headerTitle}>{partner.first_name} {partner.last_name}</Text>
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
            {/*
            <Image
              source={require("@/assets/icons/sent.png")}
              style={styles.sendIcon}
            />  
            */}
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
    position: 'relative',
    paddingBottom: 16,
  },
  crescentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 350,
    overflow: 'hidden',
  },
  crescent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    borderBottomLeftRadius: 800,
    borderBottomRightRadius: 800,
    backgroundColor: '#E0EDFD',
    transform: [
      { scaleX: 1.3 },
      { translateY: -350 },
    ],
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    zIndex: 1,
  },
  backButton: {
    marginRight: 8,
  },
  backIcon: {
    width: 11,
    height: 15,
    marginLeft: 8,
  },
  profileSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  arrowIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
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
    paddingVertical: 8,
  },
  messageInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#242020',
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
});

export default IndividualChat;
