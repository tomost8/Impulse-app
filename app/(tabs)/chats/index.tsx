import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useGetUserChats } from '../../../hooks/api/useChats';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useAcceptFriendRequest, useGetFriendRequests } from '../../../hooks/api/useFriends';
import { useMutation } from '@apollo/client';
import { ACCEPT_FRIEND_REQUEST } from '../../../services/api/friends';
import MyComponent from '@/components/Test';
import styles from '@/constants/testStyles';
import SocialModal from '@/components/modals/SocialModal';

export default function ChatScreen() {
  //modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [activeView, setActiveView] = useState<'chats' | 'requests'>('chats');

  const [userId, setUserId] = useState<number | null>(null);
  const [acceptFriendRequest, { loading: mutationLoading, error: mutationError }] = useMutation(ACCEPT_FRIEND_REQUEST);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('idUser');
        if (storedUserId) {
          setUserId(parseInt(storedUserId));
        }
      } catch (error) {
        console.error('Error fetching userId from AsyncStorage:', error);
      }
    };

    getUserId();
  }, []);
  
  const { chatMembers, isLoading: chatsLoading, error: chatsError } = useGetUserChats(userId as number);
  const { friendRequests: receivedRequests, isLoading: requestsLoading, error: requestsError } = useGetFriendRequests(userId as number, 'receiver');
  const { friendRequests: sentRequests, isLoading: sentRequestsLoading, error: sentRequestsError } = useGetFriendRequests(userId as number, 'sender');
  if (userId !== null) {
    console.log('Chats data:', chatMembers);
    console.log('Friend Requests data:', receivedRequests);
    console.log('Friend Requests Sender data:', sentRequests);
  }

  const handleChatPress = (id: string | number) => {
    router.push(`/chat/${id}`);
  };

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

  const onChatsPress = () => {
    setActiveView('chats'); // Set active view to 'walk'
  };

  const onRequestsPress = () => {
    setActiveView('requests'); // Set active view to 'transit'
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
            {chatsLoading ? (
              <ActivityIndicator color="white" />
            ) : chatsError ? (
              <Text style={styles.error}>{chatsError}</Text>
            ) : (
              chatMembers.map((chatMember: any) => (
                <TouchableOpacity
                  style={styles.button}
                  key={`chat-${chatMember.chat.id}-member-${chatMember.id}`}
                  onPress={() => handleChatPress(chatMember.chat.id)}
                >
                  <Text style={styles.text}>
                    {chatMember.chat.type}, {chatMember.chat.id}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      )}

      {activeView === 'requests' && (
        <View style={styles.section}>
          {/* make requests component + add here */}
          <View style={styles.section}>
            <Text style={styles.text}>Received Requests</Text>
            {requestsLoading ? (
              <ActivityIndicator color="white" />
            ) : requestsError ? (
              <Text style={styles.text}>{requestsError}</Text>
            ) : (
              receivedRequests.map((friendRequest: any) => (
                <View key={`request-${friendRequest.friend.id}`} style={{ marginBottom: 10 }}>
                  <Text style={styles.text}>
                    {friendRequest.friend.first_name} {friendRequest.friend.last_name}
                  </Text>
                  <TouchableOpacity onPress={() => handleAcceptFriendRequest(friendRequest.friend.id)} style={styles.button}>
                    <Text style={styles.text}>Accept Friend Request</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Sent Requests</Text>
            {sentRequestsLoading ? (
              <ActivityIndicator color="white" />
            ) : sentRequestsError ? (
              <Text style={styles.text}>{sentRequestsError}</Text>
            ) : (
              sentRequests.map((friendRequest: any) => (
                <View key={`request-${friendRequest.friend.id}`} style={{ marginBottom: 10 }}>
                  <Text style={styles.text}>{friendRequest.friend.first_name} {friendRequest.friend.last_name}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}