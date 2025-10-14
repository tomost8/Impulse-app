import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { GiftedChat, Bubble, Day, InputToolbar, Composer, Send, IMessage, BubbleProps, DayProps, InputToolbarProps, SendProps, ComposerProps } from 'react-native-gifted-chat';
import { Feather, Ionicons } from '@expo/vector-icons';

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

const ChatScreen: React.FC<ChatScreenProps> = ({
  userId,
  chatId,
  chat,
  partner,
  chatMessages,
  isConnected,
  wsError,
  onSend,
  isSendingMessage,
}) => {

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
        containerStyle={styles.inputToolbarContainer}
        primaryStyle={styles.inputToolbarPrimary}
      />
    );
  };

  const renderEmptySend = () => {
    return <View />; // An empty View component
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
      <View style={styles.composerContainer}>
        <Composer
          {...props}
          textInputStyle={styles.textInput}
          placeholder="Type a message..."
        />
        <View style={styles.sendButtonWrapper}>
          <Send
            {...props}
            containerStyle={styles.sendButton}
            disabled={!props.text || props.text.trim().length === 0}
          >
            <Feather name="send" size={24} color={"#DE728D"} />
          </Send>
        </View>
      </View>
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
        renderActions={renderActions}
        renderComposer={renderComposer}
        renderSend={renderEmptySend}
        //scrollToBottom
        inverted={false}
        renderAvatar={null}
        timeTextStyle={{
          left: { color: '#888' },
          right: { color: '#888' },
        }}
      />
    </SafeAreaView>
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
  composerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 40,
    flex: 1,
  },
  textInput: {
    flex: 1,
    marginLeft: 0,
    paddingTop: 6,
    paddingBottom: 0,
    marginRight: 8, // Add space between input and send button
    color: '#242020',
  },
  sendButtonWrapper: {
    justifyContent: 'flex-end',
    marginBottom: 4, // Adjust for proper vertical alignment
  },
  inputToolbarContainer: {
    backgroundColor: '#f0f6ff',
    borderTopWidth: 0,
    paddingHorizontal: 0,
    paddingBottom: 5,
  },
  inputToolbarPrimary: {
    alignItems: 'center',
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

export default ChatScreen;
