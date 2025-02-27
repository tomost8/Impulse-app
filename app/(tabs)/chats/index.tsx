import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import MyComponent from '@/components/TwoTab';
import styles from '@/utils/testStyles';
import SocialModal from '@/components/modals/SocialModal';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUserChats } from '../../../hooks/graphql/chats/queries';
import { useGetFriendRequests } from '../../../hooks/graphql/friends/queries';
import { useAcceptFriendRequest } from '../../../hooks/graphql/friends/mutations';
// Components
// Debug
import { debugRenders } from '@/utils/debug';

function ChatScreen({
  chats,
  isChatsLoading,
  friendRequests,
  isFriendRequestsLoading,
  sentRequests,
  isSentRequestsLoading,
  handleAcceptFriendRequest,
  isAcceptingFriendRequest
}: {
  chats: any,
  isChatsLoading: boolean,
  friendRequests: any,
  isFriendRequestsLoading: boolean,
  sentRequests: any,
  isSentRequestsLoading: boolean,
  handleAcceptFriendRequest: (friendId: number) => void,
  isAcceptingFriendRequest: boolean,
}) {
  if (isChatsLoading || isFriendRequestsLoading || isSentRequestsLoading || isAcceptingFriendRequest) {
    return <Text>Loading...</Text>;
  }
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
          <Text style={styles.text}>Chats</Text>
          {chats.filter((chat: any) => chat.status === 'ACCEPTED').map((chat: any) => (
            <View key={`chat-${chat.chat.id}`}>
              <Image source={{ uri: chat.chat.profile_pic }} style={styles.smallImage} />
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleChatPress(chat.chat.id)}
            >
              <Text style={styles.text}>
                {chat.chat.type}, {chat.chat.id}, {chat.chat.title}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {activeView === 'requests' && (
        <View style={styles.section}>
          {/* make requests component + add here */}
          <View style={styles.section}>
            <Text style={styles.text}>Received Requests</Text>
            {friendRequests.map((friendRequest: any) => (
              <View key={`request-${friendRequest.friend.id}`} style={{ marginBottom: 10 }}>
                <Image source={{ uri: friendRequest.friend.profile_picture }} style={styles.smallImage} />
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
                <Image source={{ uri: friendRequest.friend.profile_picture }} style={styles.smallImage} />
                <Text style={styles.text}>{friendRequest.friend.first_name} {friendRequest.friend.last_name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const ChatPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const chatsRef = useRef<any[] | null>(null);
  const hasFetchedChats = useRef(false);
  const { chatMembers, fetched: hasNewChatsData } = useGetUserChats(userId as number, !hasFetchedChats.current);

  const friendRequestsRef = useRef<any[] | null>(null);
  const hasFetchedFriendRequests = useRef(false);
  const { friendRequests: receivedRequests, fetched: hasNewFriendRequestsData } = useGetFriendRequests(userId as number, 'receiver', !hasFetchedFriendRequests.current);
  
  const sentRequestsRef = useRef<any[] | null>(null);
  const hasFetchedSentRequests = useRef(false);
  const { friendRequests: sentRequests, fetched: hasNewSentRequestsData } = useGetFriendRequests(userId as number, 'sender', !hasFetchedSentRequests.current);

  useEffect(() => {
    if (!hasNewChatsData && !hasNewFriendRequestsData && !hasNewSentRequestsData) {
      return;
    }
    if (hasNewChatsData) {
      chatsRef.current = chatMembers;
      hasFetchedChats.current = true;
    }
    if (hasNewFriendRequestsData) {
      friendRequestsRef.current = receivedRequests;
      hasFetchedFriendRequests.current = true;
    }
    if (hasNewSentRequestsData) {
      sentRequestsRef.current = sentRequests;
      hasFetchedSentRequests.current = true;
    }
    if (hasFetchedChats.current && hasFetchedFriendRequests.current && hasFetchedSentRequests.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewChatsData, hasNewFriendRequestsData, hasNewSentRequestsData]);

  // Mutations
  const { acceptFriendRequest } = useAcceptFriendRequest();
  const [isAcceptingFriendRequest, setIsAcceptingFriendRequest] = useState(false);
  const handleAcceptFriendRequest = async (friendId: number) => {
    setIsAcceptingFriendRequest(true);
    try {
      const input = {
        status: 'ACCEPTED',
      }
      const response = await acceptFriendRequest(userId as number, friendId, input, authToken);
      if (response.success) {
        console.log("Friend request accepted:", response);
      } else {
        console.log("Error accepting friend request:", response.errors);
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    } finally {
      setIsAcceptingFriendRequest(false);
    }
  };

  // Debug
  const loading = !hasFetchedChats.current || !hasFetchedFriendRequests.current || !hasFetchedSentRequests.current;
  if (debugRenders && !loading) {
    console.log("Rendering ChatScreen\n",
      "Chats:", chatsRef.current, "\n",
      "Friend Requests:", friendRequestsRef.current, "\n",
      "Sent Requests:", sentRequestsRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return <ChatScreen 
    chats={chatsRef.current}
    isChatsLoading={!hasFetchedChats.current}
    friendRequests={friendRequestsRef.current}
    isFriendRequestsLoading={!hasFetchedFriendRequests.current}
    sentRequests={sentRequestsRef.current}
    isSentRequestsLoading={!hasFetchedSentRequests.current}
    handleAcceptFriendRequest={handleAcceptFriendRequest}
    isAcceptingFriendRequest={isAcceptingFriendRequest}
  />;
}

export default AuthWrapper(ChatPage);
