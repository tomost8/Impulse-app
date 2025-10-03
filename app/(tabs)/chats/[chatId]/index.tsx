import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { GiftedChat, Bubble, Day, InputToolbar, Composer, Send, IMessage, BubbleProps, DayProps, InputToolbarProps, SendProps, ComposerProps } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetChat, useGetChatMembers, useGetMessages } from '@/hooks/graphql/chats/queries';
import { useSendMessage } from '@/hooks/graphql/chats/mutations';
import { useWebSocket } from '@/hooks/useWebSocket';
import mixpanel from '@/config/mixpanelConfig';

// ChatScreen props type definition
interface ChatScreenProps {
  userId: number;
  chatId: number;
  chat: {
    type: 'direct' | 'group';
    title?: string;
  };
  partner?: {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture: string;
  };
  chatMessages: IMessage[];
  isConnected: boolean;
  wsError: string | null;
  onSend: (messages: IMessage[]) => void;
  isSendingMessage: boolean;
}

function ChatScreen({
  userId,
  chatId,
  chat,
  partner,
  chatMessages,
  isConnected,
  wsError,
  onSend,
  isSendingMessage,
}: ChatScreenProps) {
  // Custom bubble styles
  const renderBubble = (props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#FFE5E5',
            borderRadius: 16,
            marginBottom: 5,
          },
          right: {
            backgroundColor: '#E0EDFD',
            borderRadius: 16,
            marginBottom: 5,
          },
        }}
        textStyle={{
          left: {
            color: '#000',
          },
          right: {
            color: '#000',
          },
        }}
      />
    );
  };

  // Custom date separator
  const renderDay = (props: /*DayProps<IMessage>*/ any) => {
    return (
      <Day
        {...props}
        textStyle={{
          color: '#888',
          fontSize: 14,
        }}
        dateFormat={'MMM D, YYYY'}
      />
    );
  };

  // Custom input toolbar
  const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
        primaryStyle={{
          alignItems: 'center',
          //backgroundColor: '#f0f6ff'
          //borderColor: 'red',
          //borderWidth: 1,
        }}
        /*
        containerStyle={{
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E8E8E8',
          padding: 4,
          flexDirection: 'column',
          alignItems: 'center',
        }}
        */
      />
    );
  };

  // Custom send button
  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <Send
        {...props}
        containerStyle={styles.sendButton}
      >
        <Ionicons name="send" size={28} color="#DE728D" />
      </Send>
    );
  };

  // Custom input box left button
  const renderActions = () => {
    return (
      <TouchableOpacity 
        style={styles.cameraButton}
        onPress={() => router.push('/camera')}
      >
        <Ionicons name="camera" size={28} color="#DE728D" />
      </TouchableOpacity>
    );
  };

  // Custom input box
  const renderComposer = (props: ComposerProps) => {
    return (
      <Composer
        {...props}
        textInputStyle={{
          backgroundColor: '#F5F5F5',
          borderRadius: 20,
          paddingHorizontal: 12,
          marginHorizontal: 10,
          minHeight: 40,
          paddingTop: 6,
          paddingBottom: 0,
          //borderColor: 'blue',
          //borderWidth: 1,
        }}
        placeholder="Type a message..."
      />
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Chat header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        
        {chat?.type === 'direct' && partner && (
          <TouchableOpacity 
            onPress={() => router.push(`/user/${partner.id}`)}
            style={styles.avatarContainer}
          >
            <Image source={{ uri: partner.profile_picture }} style={styles.avatar} />
          </TouchableOpacity>
        )}
        
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>
            {chat?.type === 'direct' 
              ? partner ? `${partner.first_name} ${partner.last_name}` : 'Chat'
              : chat?.title || 'Chat'}
          </Text>
          {wsError ? (
            <Text style={styles.errorText}>Connection Error</Text>
          ) : isConnected ? (
            <Text style={styles.connectedText}>Connected</Text>
          ) : (
            <Text style={styles.disconnectedText}>Disconnected</Text>
          )}
        </View>
        
        <TouchableOpacity onPress={() => {
          if (chat?.type === 'direct' && partner) {
            router.push(`/user/${partner.id}`)
          } else {
            router.push(`/chats/${chatId}/groupInfo`)
          }
        }} style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Chat content */}
      <GiftedChat
        messages={chatMessages}
        onSend={onSend}
        user={{
          _id: userId,
        }}
        renderBubble={renderBubble}
        renderDay={renderDay}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderActions={renderActions}
        renderComposer={renderComposer}
        alwaysShowSend
        //scrollToBottom
        inverted={true}
        renderAvatar={null}
        timeTextStyle={{
          left: { color: '#888' },
          right: { color: '#888' },
        }}
      />
    </SafeAreaView>
  );
}

const ChatPage = (props: any) => {
  const { chatId } = useLocalSearchParams();
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Modify reference types
  const chatRef = useRef<any | null>(null);
  const chatMembersRef = useRef<any[] | null>(null);
  const messagesRef = useRef<any[] | null>(null);
  
  const hasFetchedChat = useRef(false);
  const hasFetchedChatMembers = useRef(false);
  const hasFetchedMessages = useRef(false);

  // Query chat data
  const { chat, fetched: hasNewChatData } = useGetChat(Number(chatId), !hasFetchedChat.current);
  const { chatMembers, fetched: hasNewChatMembersData } = useGetChatMembers(Number(chatId), !hasFetchedChatMembers.current);
  const { messages, fetched: hasNewMessagesData } = useGetMessages(Number(chatId), !hasFetchedMessages.current);

  // Use send message hook
  const { sendMessage } = useSendMessage();

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
      // Sort messages by creation date (newest first) for proper display in GiftedChat with inverted={true}
      const sortedMessages = [...messagesRef.current].sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA; // Descending order (newest first)
      });

      const formattedMessages = sortedMessages.map((msg: any) => ({
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
    
    try {
      setIsSendingMessage(true);
      const messageToSend = newMessages[0];
      
      const input = {
        chat_id: Number(chatId),
        sender_id: userId,
        content: messageToSend.text,
      };
      
      const response = await sendMessage(input);
      if (!response.success) {
        console.error("Failed to send message:", response.errors);
      } else {
        // Track successful message send
        mixpanel.trackEvent('Message Sent', {
          timestamp: new Date().toISOString(),
          chat_id: Number(chatId),
          sender_id: userId,
          message_length: messageToSend.text.length,
        });
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

  // Debug
  const loading = !hasFetchedChat.current || !hasFetchedChatMembers.current || !hasFetchedMessages.current;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6ff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 10 : (StatusBar.currentHeight ?? 0) + 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f6ff',
  },
  backButton: {
    padding: 5,
  },
  avatarContainer: {
    marginLeft: 5,
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  connectedText: {
    fontSize: 12,
    color: 'green',
  },
  disconnectedText: {
    fontSize: 12,
    color: 'orange',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  menuButton: {
    padding: 5,
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    //borderColor: 'blue',
    //borderWidth: 1,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    //borderColor: 'blue',
    //borderWidth: 1,
  },
});

export default AuthWrapper(ChatPage);