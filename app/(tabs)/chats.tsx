import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useGetUserChats } from '../../hooks/api/useChats';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useAcceptFriendRequest, useGetFriendRequests } from '../../hooks/api/useFriends';
import { useMutation } from '@apollo/client';
import { ACCEPT_FRIEND_REQUEST } from '../../services/api/friends';
import MyComponent from '@/components/Test';

export default function ChatScreen() {
  const [activeView, setActiveView] = useState<'chats' | 'requests'>('chats'); // Explicitly define the type

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
  const { friendRequests, isLoading: requestsLoading, error: requestsError } = useGetFriendRequests(userId as number);
  if (userId !== null) {
    console.log('userId', userId);
    console.log('Chats data:', chatMembers);
    console.log('Friend Requests data:', friendRequests);
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
    <ScrollView style={styles.container}>
      <MyComponent onLeftPress={onChatsPress} onRightPress={onRequestsPress} value={activeView} />
      
      {activeView === 'chats' && (
        <View style={styles.section}>
          {/* make chat component + add here */}
          <Text style={styles.text}>You chose Chats!</Text>
          <View style={styles.section}>
            <Text style={styles.text}>Chats</Text>
            {chatsLoading ? (
              <ActivityIndicator color="white" />
            ) : chatsError ? (
              <Text style={styles.errorText}>{chatsError}</Text>
            ) : (
              chatMembers.map((chatMember: any) => (
                <TouchableOpacity
                  key={`chat-${chatMember.chat.id}-member-${chatMember.id}`}
                  onPress={() => handleChatPress(chatMember.chat.id)}
                >
                  <Text style={styles.chatName}>
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
          <Text style={styles.text}>You chose Requests!</Text>
          <View style={styles.section}>
            <Text style={styles.text}>Requests</Text>
            {requestsLoading ? (
              <ActivityIndicator color="white" />
            ) : requestsError ? (
              <Text style={styles.errorText}>{requestsError}</Text>
            ) : (
              friendRequests.map((friendRequest: any) => (
                <View key={`request-${friendRequest.friend.id}`} style={{ marginBottom: 10 }}>
                  <Text style={styles.text}>
                    {friendRequest.friend.first_name} {friendRequest.friend.last_name}
                  </Text>
                  <TouchableOpacity onPress={() => handleAcceptFriendRequest(friendRequest.friend.id)} style={styles.button}>
                    <Text style={styles.buttonText}>Accept Friend Request</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#333', // Optional: adds visual separation between sections
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatName: {
    color: 'white',
    fontSize: 16,
    marginVertical: 4,
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  }
});
