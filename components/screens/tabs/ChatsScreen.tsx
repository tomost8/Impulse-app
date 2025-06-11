import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar
} from 'react-native';
import { router } from 'expo-router';
import ConnectPopup from '@/components/screens/connect/connectpopup';

interface ChatMessage {
  id: string;
  title: string;
  profile_pic: any;
  // to fetch
  message: string;
  time: string;
}

interface ChatScreenProps {
  loading: boolean;
  chats: ChatMessage[];
  requestCount: number;
}

const ChatScreen = (props: ChatScreenProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }
  
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.title}>Chats</Text>
            </View>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={showModal}
            >
              <Image 
                source={require("@/assets/icons/addFriend.png")}
                style={styles.addIcon}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Requests Count */}
      <TouchableOpacity onPress={() => router.push('/chats/requests')}>
        <Text style={styles.requestsText}>Requests ({props.requestCount})</Text>
      </TouchableOpacity>

      {/* Messages List */}
      <ScrollView style={styles.messagesList}>
        {props.chats.map((chat) => (
          
            <TouchableOpacity key={chat.id} style={styles.messageCard} onPress={() => router.push(`/chats/${chat.id}`)}>
            <View style={styles.messageInfo}>
              <Image 
                source={chat.profile_pic}
                style={styles.profileImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{chat.title}</Text>
                <Text style={styles.message}>{chat.message}</Text>
              </View>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{chat.time}</Text>
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>02</Text>
              </View>
            </View>
            </TouchableOpacity>
          
        ))}
      </ScrollView>

      {/* Connect Popup Modal */}
      <ConnectPopup
        isVisible={visible}
        onClose={hideModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#E0EDFD',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#242020',
    fontWeight: '600',
  },
  addButton: {
    padding: 8,
  },
  addIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#242020',
  },
  requestsText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#DE728D',
    fontWeight: '500',
    paddingTop: 16,
    paddingBottom: 6,
    textAlign: 'right',
    width: '100%',
    paddingRight: 16,
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
  headerExtension: {
    backgroundColor: '#E0EDFD',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
});

export default ChatScreen;
