import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from '@/constants/testStyles';
import RemoveFriendModal from '@/components/modals/RemoveFriendModal';

import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetChat, useGetChatMembers } from '@/hooks/graphql/chats/queries';
import { useDeleteFriendship } from '@/hooks/graphql/friends/mutations';
// Components
// Debug
import { debugRenders } from '@/constants/debug';

function ChatScreen({
  userId,
  chatId,
  chat,
  isChatLoading,
  chatMembers,
  isChatMembersLoading,
  handleDeleteFriendship,
  isDeletingFriendship,
}: {
  userId: number,
  chatId: number,
  chat: any,
  isChatLoading: boolean,
  chatMembers: any,
  isChatMembersLoading: boolean,
  handleDeleteFriendship: (friendId: number) => Promise<void>,
  isDeletingFriendship: boolean,
}) {
  if (isChatLoading || isChatMembersLoading) {
    return <Text>Loading...</Text>;
  }
  // Get partner info for direct chats
  let partner: any = null;
  if (chat?.type === 'direct') {
    chatMembers.forEach((member: any) => {
      if (member.user.id !== userId) {
        partner = member.user;
      }
    });
  }
  //console.log("partner debug", partner)

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  // New function to render based on chat type
  const renderChatHeader = () => {
    switch (chat?.type) {
      case 'direct':
        return (
          <View>
            <TouchableOpacity style={styles.button} onPress={() => router.push(`/chats/${chatId}/${partner?.id}`)}>
              <Text style={styles.text}>{partner?.profile_pic}, {partner?.first_name} {partner?.last_name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={showModal}>
              <Text style={styles.text}>
                Remove Friend
              </Text>
            </TouchableOpacity>
            <RemoveFriendModal 
            visible={visible} 
            hideModal={hideModal} userId={userId as number} 
            friendId={partner?.id} 
            handleDeleteFriendship={handleDeleteFriendship} 
            isDeletingFriendship={isDeletingFriendship}
            />
          </View>
        );
      case 'group':
        return (
          <View>
            <Text style={styles.todoText}>Leave Button</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push(`/chats/${chatId}/groupInfo`)}>
              <Text style={styles.text}>Member/Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push(`/chats/${chatId}/invite`)}>
              <Text style={styles.text}>Invite Friend</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return <Text style={styles.text}>Header but should never see this</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderChatHeader()}
      <Text style={styles.todoText}>Actual Chat Functionality</Text>
    </View>
  );
}

const ChatPage = (props: any) => {
  const { chatId } = useLocalSearchParams();
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const chatRef = useRef<any | null>(null);
  const hasFetchedChat = useRef(false);
  const { chat, fetched: hasNewChatData } = useGetChat(Number(chatId), !hasFetchedChat.current);

  const chatMembersRef = useRef<any[] | null>(null);
  const hasFetchedChatMembers = useRef(false);
  const { chatMembers, fetched: hasNewChatMembersData } = useGetChatMembers(Number(chatId), !hasFetchedChatMembers.current);

  useEffect(() => {
    if (!hasNewChatData && !hasNewChatMembersData) {
      return;
    }
    if (hasNewChatData) {
      chatRef.current = chat;
      hasFetchedChat.current = true;
    }
    if (hasNewChatMembersData) {
      chatMembersRef.current = chatMembers;
      hasFetchedChatMembers.current = true;
    }
    if (hasFetchedChat.current && hasFetchedChatMembers.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewChatData, hasNewChatMembersData]);

  // Mutations
  const { deleteFriendship } = useDeleteFriendship();
  const [isDeletingFriendship, setIsDeletingFriendship] = useState(false);
  const handleDeleteFriendship = async (friendId: number) => {
    try {
      setIsDeletingFriendship(true);
      const response = await deleteFriendship(userId, friendId, authToken);
      console.log("response is", response);
      if (response.success) {
        console.log("Friendship (+ chat) deleted successfully");
      } else {
        console.error("Error deleting friendship:", response.errors);
      }
    } catch (error) {
      console.error("Error deleting friendship:", error);
    } finally {
      setIsDeletingFriendship(false);
    }
  }

  // Debug
  const loading = !hasFetchedChat.current || !hasFetchedChatMembers.current;
  if (debugRenders && !loading) {
    console.log("Rendering ChatPage\n",
      "Chat:", chatRef.current, "\n",
      "Chat Members:", chatMembersRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return (
    <ChatScreen 
      userId={userId}
      chatId={Number(chatId)}
      chat={chatRef.current}
      isChatLoading={!hasFetchedChat.current}
      chatMembers={chatMembersRef.current}
      isChatMembersLoading={!hasFetchedChatMembers.current}
      handleDeleteFriendship={handleDeleteFriendship}
      isDeletingFriendship={isDeletingFriendship}
    />
  );
}

export default AuthWrapper(ChatPage);