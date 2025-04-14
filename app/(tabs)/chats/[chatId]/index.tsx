import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef, useCallback } from 'react';
import { GiftedChat, Bubble, Day, InputToolbar, Composer, Send, IMessage, BubbleProps, DayProps, InputToolbarProps, SendProps, ComposerProps } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetChat, useGetChatMembers, useGetMessages } from '@/hooks/graphql/chats/queries';
import { useDeleteFriendship } from '@/hooks/graphql/friends/mutations';
import RemoveFriendModal from '@/components/old/chats/RemoveFriendModal';
import { debugRenders } from '@/utils/debug';
import { useSendMessage } from '@/hooks/graphql/chats/mutations';
import { useWebSocket } from '@/hooks/useWebSocket';

// ChatScreen的props类型定义
interface ChatScreenProps {
  userId: number;
  chatId: number;
  chat: {
    type: 'direct' | 'group';
    title?: string;
  };
  isChatLoading: boolean;
  chatMembers: Array<{
    user: {
      id: number;
      first_name: string;
      last_name: string;
      profile_picture: string;
    };
  }>;
  isChatMembersLoading: boolean;
  messages: Array<{
    id: number;
    content: string;
    created_at: string;
    sender: {
      id: number;
      first_name: string;
      last_name: string;
    };
    post?: {
      mediaUrl?: string;
    };
  }>;
  isMessagesLoading: boolean;
  handleDeleteFriendship: (friendId: number) => Promise<void>;
  isDeletingFriendship: boolean;
  authToken: string;
}

function ChatScreen({
  userId,
  chatId,
  chat,
  isChatLoading,
  chatMembers,
  isChatMembersLoading,
  messages,
  isMessagesLoading,
  handleDeleteFriendship,
  isDeletingFriendship,
  authToken,
}: ChatScreenProps) {
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  // 获取聊天伙伴信息
  let partner: any = null;
  if (chat?.type === 'direct') {
    chatMembers?.forEach((member: any) => {
      if (member.user.id !== userId) {
        partner = member.user;
      }
    });
  }

  // 处理消息数据
  useEffect(() => {
    if (messages && messages.length > 0) {
      const formattedMessages = messages.map((msg) => ({
        _id: msg.id,
        text: msg.content,
        createdAt: new Date(msg.created_at),
        user: {
          _id: msg.sender.id,
          name: `${msg.sender.first_name} ${msg.sender.last_name}`,
          avatar: msg.sender.id !== userId ? partner?.profile_picture : undefined,
        },
        // 如果消息包含帖子，添加图片
        ...(msg.post?.mediaUrl ? { image: msg.post.mediaUrl } : {}),
      }));
      
      setChatMessages(formattedMessages);
    }
  }, [messages, userId, partner]);

  // 使用发送消息钩子
  const { sendMessage } = useSendMessage();
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // 使用WebSocket钩子
  const { 
    isConnected, 
    error: wsError, 
    connect, 
    disconnect, 
    subscribeToMessages 
  } = useWebSocket(userId);

  // 连接WebSocket并订阅消息
  useEffect(() => {
    if (!isChatLoading && !isChatMembersLoading && !isMessagesLoading) {
      // 连接WebSocket
      connect();
    }
    
    return () => {
      // 组件卸载时断开连接
      disconnect();
    };
  }, [isChatLoading, isChatMembersLoading, isMessagesLoading, connect, disconnect]);

  // 订阅消息更新
  useEffect(() => {
    if (isConnected) {
      // 处理新消息
      const handleNewMessage = (newMessage: any) => {
        console.log('收到新消息:', newMessage);
        
        // 只处理当前聊天的消息
        if (newMessage.chat_id === chatId) {
          // 查找发送者信息
          let sender: any = null;
          if (newMessage.sender_id === userId) {
            // 自己发送的消息，不需要处理
            return;
          } else {
            // 查找聊天成员中的发送者
            chatMembers?.forEach((member: any) => {
              if (member.user.id === newMessage.sender_id) {
                sender = member.user;
              }
            });
          }
          
          // 格式化消息并添加到聊天中
          const formattedMessage = {
            _id: newMessage.id,
            text: newMessage.content,
            createdAt: new Date(newMessage.created_at),
            user: {
              _id: newMessage.sender_id,
              name: sender ? `${sender.first_name} ${sender.last_name}` : `用户 ${newMessage.sender_id}`,
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
  }, [isConnected, subscribeToMessages, chatId, userId, chatMembers]);

  // 发送消息处理函数
  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    setChatMessages(previousMessages => 
      GiftedChat.append(previousMessages, newMessages)
    );
    
    try {
      setIsSendingMessage(true);
      const messageToSend = newMessages[0];
      
      const input = {
        chat_id: chatId,
        sender_id: userId,
        content: messageToSend.text,
      };
      
      const response = await sendMessage(input);
      if (!response.success) {
        console.error("发送消息失败:", response.errors);
      }
    } catch (error) {
      console.error("发送消息时出错:", error);
    } finally {
      setIsSendingMessage(false);
    }
  }, [chatId, userId, sendMessage]);

  // 自定义气泡样式
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

  // 自定义日期分隔符
  const renderDay = (props: DayProps<IMessage>) => {
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

  // 自定义输入工具栏
  const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E8E8E8',
          padding: 4,
        }}
      />
    );
  };

  // 自定义发送按钮
  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <Send
        {...props}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
          marginBottom: 5,
        }}
      >
        <Ionicons name="send" size={24} color="#DE728D" />
      </Send>
    );
  };

  // 自定义输入框左侧按钮
  const renderActions = () => {
    return (
      <TouchableOpacity 
        style={styles.cameraButton}
        onPress={() => router.push('/camera')}
      >
        <Ionicons name="camera" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    );
  };

  // 自定义输入框
  const renderComposer = (props: ComposerProps) => {
    return (
      <Composer
        {...props}
        textInputStyle={{
          backgroundColor: '#F5F5F5',
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingTop: 8,
          paddingBottom: 8,
          marginLeft: 0,
        }}
        placeholder="Type a message..."
      />
    );
  };

  if (isChatLoading || isChatMembersLoading || isMessagesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 聊天头部 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        
        {chat?.type === 'direct' && (
          <TouchableOpacity 
            onPress={() => router.push(`/chats/${chatId}/${partner?.id}`)}
            style={styles.avatarContainer}
          >
            <Image source={{ uri: partner?.profile_picture }} style={styles.avatar} />
          </TouchableOpacity>
        )}
        
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>
            {chat?.type === 'direct' 
              ? `${partner?.first_name} ${partner?.last_name}` 
              : chat?.title || '聊天'}
          </Text>
          {wsError ? (
            <Text style={styles.errorText}>连接错误</Text>
          ) : isConnected ? (
            <Text style={styles.connectedText}>已连接</Text>
          ) : (
            <Text style={styles.disconnectedText}>未连接</Text>
          )}
        </View>
        
        <TouchableOpacity onPress={() => {
          if (chat?.type === 'direct') {
            showModal();
          } else {
            // 群组选项菜单
            router.push(`/chats/${chatId}/invite`);
          }
        }} style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* 聊天内容 */}
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
        scrollToBottom
        inverted={true}
        renderAvatar={null}
        timeTextStyle={{
          left: { color: '#888' },
          right: { color: '#888' },
        }}
      />

      {/* 好友删除确认弹窗 */}
      {chat?.type === 'direct' && (
        <RemoveFriendModal 
          visible={visible} 
          hideModal={hideModal} 
          userId={userId} 
          friendId={partner?.id} 
          handleDeleteFriendship={handleDeleteFriendship} 
          isDeletingFriendship={isDeletingFriendship}
        />
      )}
    </SafeAreaView>
  );
}

const ChatPage = (props: any) => {
  const { chatId } = useLocalSearchParams();
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // 修改引用类型
  const chatRef = useRef<ChatScreenProps['chat'] | null>(null);
  const chatMembersRef = useRef<ChatScreenProps['chatMembers'] | null>(null);
  const messagesRef = useRef<ChatScreenProps['messages'] | null>(null);
  
  const hasFetchedChat = useRef(false);
  const hasFetchedChatMembers = useRef(false);
  const hasFetchedMessages = useRef(false);

  // 查询聊天数据
  const { chat, fetched: hasNewChatData } = useGetChat(Number(chatId), !hasFetchedChat.current);

  const { chatMembers, fetched: hasNewChatMembersData } = useGetChatMembers(Number(chatId), !hasFetchedChatMembers.current);

  // 查询消息数据
  const { messages, fetched: hasNewMessagesData } = useGetMessages(Number(chatId), !hasFetchedMessages.current);

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

  // 删除好友功能
  const { deleteFriendship } = useDeleteFriendship();
  const [isDeletingFriendship, setIsDeletingFriendship] = useState(false);
  const handleDeleteFriendship = async (friendId: number) => {
    try {
      setIsDeletingFriendship(true);
      const response = await deleteFriendship(userId, friendId, authToken);
      if (response.success) {
        console.log("好友关系（和聊天）已成功删除");
        router.push('/chats');
      } else {
        console.error("删除好友关系时出错:", response.errors);
      }
    } catch (error) {
      console.error("删除好友关系时出错:", error);
    } finally {
      setIsDeletingFriendship(false);
    }
  }

  // 调试
  const loading = !hasFetchedChat.current || !hasFetchedChatMembers.current || !hasFetchedMessages.current;
  // if (debugRenders && !loading) {
  //   console.log("渲染聊天页面\n",
  //     "聊天:", chatRef.current, "\n",
  //     "聊天成员:", chatMembersRef.current, "\n",
  //     "聊天消息:", messagesRef.current, "\n",
  //     "渲染计数器:", renderCounter, "\n",
  //   );
  // }

  if (loading) {
    return null; // 修复空返回值的问题
  }

  // 添加类型检查以确保不会传递 null
  const currentChatMembers = chatMembersRef.current || [];
  const currentMessages = messagesRef.current || [];

  return (
    <ChatScreen 
      userId={userId}
      chatId={Number(chatId)}
      chat={chatRef.current!} // 使用非空断言，因为loading时已经返回了
      isChatLoading={!hasFetchedChat.current}
      chatMembers={currentChatMembers}
      isChatMembersLoading={!hasFetchedChatMembers.current}
      messages={currentMessages}
      isMessagesLoading={!hasFetchedMessages.current}
      handleDeleteFriendship={handleDeleteFriendship}
      isDeletingFriendship={isDeletingFriendship}
      authToken={authToken}
    />
  );
  /*
  if (chatRef.current.type === "direct") {
    const partner = chatMembersRef.current?.find((member: any) => member.user.id !== userId)?.user;
    return <IndividualChat partner={partner} />;
  } else if (chatRef.current.type === "group") {
    return <GroupChat chat={chatRef.current} />;
  }
  */
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
    marginLeft: 10,
    marginBottom: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthWrapper(ChatPage);