import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetChat, useGetChatMembers } from '@/hooks/graphql/chats/queries';
import { useDeleteFriendship } from '@/hooks/graphql/friends/mutations';
// Components
import ChatIdScreenOld from '@/components/old/chats/chatId/ChatIdScreen';
// Debug
import { debugRenders } from '@/utils/debug';


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
    <ChatIdScreenOld 
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