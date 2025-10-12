import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import ProfilePictureWithLoading from '@/components/ui/common/ProfilePictureWithLoading';
import LoadingOverlay from '@/components/ui/common/LoadingOverlay';
import { router } from 'expo-router';
import { ConnectPopup } from '@/components/features/chats';

interface ChatMessage {
  id: string;
  title: string;
  profile_pic: any;
  message: string;
  time: string;
}

interface ChatsListScreenProps {
  loading: boolean;
  chats: ChatMessage[];
  requestCount: number;
}

const ChatsListScreen = (props: ChatsListScreenProps) => {
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
              onPress={props.loading ? undefined : showModal}
              disabled={props.loading}
            >
              <Image 
                source={require("@/assets/icons/addFriend.png")}
                style={styles.addIcon}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Requests Count */}
        <TouchableOpacity 
          onPress={() => router.push('/chats/requests')}
          style={props.loading ? styles.disabledTouchable : undefined}
          disabled={props.loading}
        >
          <Text style={[styles.requestsText, props.loading && styles.disabledText]}>
            Requests ({props.requestCount})
          </Text>
        </TouchableOpacity>

        {/* Chats List */}
        <View style={styles.messagesContainer}>
          <ScrollView 
            style={[styles.messagesList, props.loading && styles.disabledScrollView]}
            scrollEnabled={!props.loading}
          >
            {props.chats.map((chat) => (
              <TouchableOpacity 
                key={chat.id} 
                style={[styles.messageCard, props.loading && styles.disabledMessageCard]} 
                onPress={() => !props.loading && router.push(`/chats/${chat.id}`)}
                disabled={props.loading}
              >
                <View style={styles.messageInfo}>
                  <ProfilePictureWithLoading 
                    source={{uri: chat.profile_pic}}
                    size={48}
                    style={[styles.profileImage, props.loading && styles.disabledImage]}
                  />
                  <View style={styles.textContainer}>
                    <Text style={[styles.name, props.loading && styles.disabledText]}>{chat.title}</Text>
                    <Text style={[styles.message, props.loading && styles.disabledText]}>{chat.message}</Text>
                  </View>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={[styles.time, props.loading && styles.disabledText]}>{chat.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Loading Overlay */}
          <LoadingOverlay 
            visible={props.loading} 
          />
        </View>
      </View>

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
  /* Request Section */
  contentContainer: {
    flex: 1,
    position: 'relative',
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
  messagesContainer: {
    flex: 1,
    position: 'relative',
    paddingBottom: 100,
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
  /* Loading States */
  disabledTouchable: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
  disabledScrollView: {
    opacity: 0.5,
  },
  disabledMessageCard: {
    opacity: 0.5,
  },
  disabledImage: {
    opacity: 0.5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledIcon: {
    opacity: 0.5,
  },
});

export default ChatsListScreen;
