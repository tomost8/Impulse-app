import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import MyComponent from '@/components/TwoTab';
import styles from '@/constants/testStyles';
import SocialModal from '@/components/modals/SocialModal';

import AuthWrapper from '@/components/auth/AuthWrapper';
import { useState, useRef } from 'react';

import { useGetUserChats } from '../../../hooks/api/useChats';
import { useGetFriendRequests } from '../../../hooks/api/useFriends';
import { useMutation } from '@apollo/client';
import { ACCEPT_FRIEND_REQUEST } from '../../../services/api/friends';

const ChatScreen = (props: any) => {
  console.log("ChatScreen rendered");

  const { userId, authToken } = props;
  const hasFetched = useRef(false);
  const { chatMembers } = useGetUserChats(userId as number, hasFetched.current);
  const { friendRequests: receivedRequests } = useGetFriendRequests(userId as number, 'receiver', hasFetched.current);
  const { friendRequests: sentRequests } = useGetFriendRequests(userId as number, 'sender', hasFetched.current);
  if (!hasFetched.current && chatMembers && receivedRequests && sentRequests) {
    console.log("ChatData fetched", chatMembers, receivedRequests, sentRequests);
    hasFetched.current = true;
  }

  const [acceptFriendRequest, { loading, error }] = useMutation(ACCEPT_FRIEND_REQUEST);
  const handleAcceptFriendRequest = async (friendId: number) => {
    console.log('Accepting friend request for user ID:', friendId);
    try {
      const response = await acceptFriendRequest({
        variables: {
          userId: userId as number,
          friendId: friendId,
          input: {
            status: 'ACCEPTED',
          },
        },
      });
      console.log('Friend request accepted:', response);
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };


  //modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [activeView, setActiveView] = useState<'chats' | 'requests'>('chats');
  const onChatsPress = () => { setActiveView('chats');};
  const onRequestsPress = () => { setActiveView('requests');};


  const handleChatPress = (chatId: number) => {
    console.log('Chat ID:', chatId);
    router.push(`/chats/${chatId}`);
  };

  return (
    <ScrollView>
      <TouchableOpacity style={styles.button} onPress={showModal}>
        <Text style={styles.text}>
          Button for add friends
        </Text>
      </TouchableOpacity>
      <SocialModal 
        visible={visible} 
        hideModal={hideModal}
      />
      
      <MyComponent onLeftPress={onChatsPress} onRightPress={onRequestsPress} value={activeView} />
      
      {activeView === 'chats' && (
        <View style={styles.section}>
          {/* make chat component + add here */}
          <View style={styles.section}>
            <Text style={styles.text}>Chats</Text>
            {chatMembers.map((chatMember: any) => (
              <TouchableOpacity
                style={styles.button}
                key={`chat-${chatMember.chat.id}-member-${chatMember.id}`}
                onPress={() => handleChatPress(chatMember.chat.id)}
              >
                <Text style={styles.text}>
                  {chatMember.chat.type}, {chatMember.chat.id}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {activeView === 'requests' && (
        <View style={styles.section}>
          {/* make requests component + add here */}
          <View style={styles.section}>
            <Text style={styles.text}>Received Requests</Text>
            {receivedRequests.map((friendRequest: any) => (
              <View key={`request-${friendRequest.friend.id}`} style={{ marginBottom: 10 }}>
                <Text style={styles.text}>
                  {friendRequest.friend.first_name} {friendRequest.friend.last_name}
                </Text>
                <TouchableOpacity onPress={() => handleAcceptFriendRequest(friendRequest.friend.id)} style={styles.button}>
                  <Text style={styles.text}>Accept Friend Request</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Sent Requests</Text>
            {sentRequests.map((friendRequest: any) => (
              <View key={`request-${friendRequest.friend.id}`} style={{ marginBottom: 10 }}>
                <Text style={styles.text}>{friendRequest.friend.first_name} {friendRequest.friend.last_name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

export default AuthWrapper(ChatScreen);