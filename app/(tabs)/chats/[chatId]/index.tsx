import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useGetChat, useGetChatMembers, useGetMessages } from '@/hooks/graphql/chats/queries';
import { useSendMessage, useMarkChatRead } from '@/hooks/graphql/chats/mutations';
import { useWebSocket } from '@/hooks/useWebSocket';
import mixpanel from '@/config/mixpanelConfig';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import ChatScreen from '@/components/screens/chats/ChatPageScreen';
import AuthWrapper from '@/contexts/AuthWrapper';
import LoadingScreen from '@/components/ui/common/loading';
import { useDataProvider } from '@/contexts/DataProviderContext';

const ChatPage = (props: any) => {
  const { setChats } = useDataProvider();
  const { chatId } = useLocalSearchParams();
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Modify reference types
  const chatRef = useRef<any | null>(null);
  const chatMembersRef = useRef<any[] | null>(null);
  const messagesRef = useRef<any[] | null>(null);
  const lastReadMessageId = useRef<number | null>(null);
  
  const hasFetchedChat = useRef(false);
  const hasFetchedChatMembers = useRef(false);
  const hasFetchedMessages = useRef(false);

  // Query chat data
  const { chat, fetched: hasNewChatData } = useGetChat(Number(chatId), !hasFetchedChat.current);
  const { chatMembers, fetched: hasNewChatMembersData } = useGetChatMembers(Number(chatId), !hasFetchedChatMembers.current);
  const { messages, fetched: hasNewMessagesData } = useGetMessages(Number(chatId), !hasFetchedMessages.current);

  // Use send message hook
  const { sendMessage } = useSendMessage();
  const { markChatRead } = useMarkChatRead();

  // Use WebSocket hook
  const { 
    isConnected, 
    error: wsError, 
    connect, 
    disconnect, 
    subscribeToMessages 
  } = useWebSocket(userId);

  // Get chat partner information
  const partner = useMemo(() => {
    if (chatRef.current?.type === 'direct' && chatMembersRef.current) {
      const foundPartner = chatMembersRef.current.find((member: any) => member.user.id !== userId);
      return foundPartner?.user || null;
    }
    return null;
  }, [chatMembersRef.current, userId]);

  // Process message data
  useEffect(() => {
    if (messagesRef.current && messagesRef.current.length > 0) {
      const formattedMessages = messagesRef.current.map((msg: any) => ({
        _id: msg.id,
        text: msg.content,
        createdAt: new Date(msg.created_at),
        user: {
          _id: msg.sender.id,
          name: `${msg.sender.first_name} ${msg.sender.last_name}`,
          avatar: msg.sender.id !== userId ? partner?.profile_picture : undefined,
        },
        // If message contains post, add image
        ...(msg.post?.mediaUrls?.[0] ? { image: msg.post.mediaUrls[0] } : {}),
      }));
      
      setChatMessages(formattedMessages);
    }
  }, [messagesRef.current, userId, partner]);

  // Connect WebSocket and subscribe to messages
  useEffect(() => {
    if (!hasFetchedChat.current || !hasFetchedChatMembers.current || !hasFetchedMessages.current) {
      return;
    }
    
    // Connect WebSocket
    connect();
    
    return () => {
      // Disconnect when component unmounts
      disconnect();
    };
  }, [hasFetchedChat.current, hasFetchedChatMembers.current, hasFetchedMessages.current, connect, disconnect]);

  // Subscribe to message updates
  useEffect(() => {
    if (isConnected && chatMembersRef.current) {
      // Handle new messages
      const handleNewMessage = (newMessage: any) => {
        console.log('Received new message:', newMessage);
        
        // Only process messages for current chat
        if (newMessage.chat_id === Number(chatId)) {
          // Find sender information
          let sender: any = null;
          if (newMessage.sender_id === userId) {
            // Message sent by self, no need to process
            return;
          } else {
            // Find sender among chat members
            chatMembersRef.current?.forEach((member: any) => {
              if (member.user.id === newMessage.sender_id) {
                sender = member.user;
              }
            });
          }
          
          // Format message and add to chat
          const formattedMessage = {
            _id: newMessage.id,
            text: newMessage.content,
            createdAt: new Date(newMessage.created_at),
            user: {
              _id: newMessage.sender_id,
              name: sender ? `${sender.first_name} ${sender.last_name}` : `User ${newMessage.sender_id}`,
              avatar: sender?.profile_picture,
            },
          };
          
          setChatMessages(previousMessages => 
            GiftedChat.append(previousMessages, [formattedMessage])
          );
        }
      };
      
      subscribeToMessages(handleNewMessage);
    }
  }, [isConnected, subscribeToMessages, chatId, userId]);

  // Send message handler function
  const handleSend = useCallback(async (newMessages: IMessage[] = []) => {
    setChatMessages(previousMessages => 
      GiftedChat.append(previousMessages, newMessages)
    );

    console.log("ChatPage handleSend", newMessages);
    
    try {
      setIsSendingMessage(true);
      const messageToSend = newMessages[0];
      
      const input = {
        chat_id: Number(chatId),
        sender_id: userId,
        content: messageToSend.text,
      };

      mixpanel.trackEvent('Message Sent', {
        timestamp: new Date().toISOString(),
        // sender_id, chat_id, message_length, etc.
      });

      const response = await sendMessage(input);
      if (!response.success) {
        console.error("Failed to send message:", response.errors);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSendingMessage(false);
    }
  }, [chatId, userId, sendMessage]);

  useEffect(() => {
    if (!hasNewChatData && !hasNewChatMembersData && !hasNewMessagesData) {
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
    if (hasNewMessagesData) {
      messagesRef.current = messages;
      hasFetchedMessages.current = true;
    }
    if (hasFetchedChat.current && hasFetchedChatMembers.current && hasFetchedMessages.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewChatData, hasNewChatMembersData, hasNewMessagesData]);

  useEffect(() => {
    if (chatMessages.length > 0) {
      const latestMessageId = Number(chatMessages[chatMessages.length - 1]._id);
      if (latestMessageId !== lastReadMessageId.current) {
        lastReadMessageId.current = latestMessageId;
        markChatRead(Number(chatId), Number(latestMessageId));
        setChats(prevChats =>
          prevChats.map(chat =>
            chat.chat.id === Number(chatId)
              ? { ...chat, unreadCount: 0 }
              : chat
          )
        );
      }
    }
  }, [chatMessages]);

  // Debug
  const loading = !hasFetchedChat.current || !hasFetchedChatMembers.current || !hasFetchedMessages.current;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ChatScreen 
      userId={userId}
      chatId={Number(chatId)}
      chat={chatRef.current!}
      partner={partner}
      chatMessages={chatMessages}
      isConnected={isConnected}
      wsError={wsError}
      onSend={handleSend}
      isSendingMessage={isSendingMessage}
    />
  );
}

export default AuthWrapper(ChatPage);