import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { router } from 'expo-router';

interface ChatMessage {
  id: string;
  name: string;
  message: string;
  time: string;
  profileImage: any;
}

const ChatScreen = () => {
  // Sample chat data
  const messages: ChatMessage[] = [
    { 
      id: '1', 
      name: 'Alicia Torreaux', 
      message: 'message', 
      time: '13:02',
      profileImage: require('@/assets/images/andrew.png')
    },
    { 
      id: '2', 
      name: 'Alicia Torreaux', 
      message: 'message', 
      time: '13:02',
      profileImage: require('@/assets/images/andrew.png')
    },
    { 
      id: '3', 
      name: 'Alicia Torreaux', 
      message: 'message', 
      time: '13:02',
      profileImage: require('@/assets/images/andrew.png')
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleAddFriend = () => {
    router.push('/chats/addFriends');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Image 
              source={require("@/assets/icons/backArrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Chats</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddFriend}
        >
          <Image 
            source={require("@/assets/icons/addFriend.png")}
            style={styles.addIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Requests Count */}
      <Text style={styles.requestsText}>Requests (2)</Text>

      {/* Messages List */}
      <ScrollView style={styles.messagesList}>
        {messages.map((message) => (
          <View key={message.id} style={styles.messageCard}>
            <View style={styles.messageInfo}>
              <Image 
                source={message.profileImage}
                style={styles.profileImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{message.name}</Text>
                <Text style={styles.message}>{message.message}</Text>
              </View>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{message.time}</Text>
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>02</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 65,
    backgroundColor: '#E0EDFD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '600',
    marginLeft: 6,
  },
  addButton: {
    padding: 8,
  },
  addIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#DE728D',
  },
  requestsText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#DE728D',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  messageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  message: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  timeContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  time: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DE728D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ChatScreen;
