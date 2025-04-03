import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import MyComponent from '@/components/old/misc/TwoTab';
import styles from '@/utils/testStyles';
import SocialModal from '@/components/old/chats/ChatModal';
import ConnectPopup from '@/components/screens/connect/connectpopup';
import { useState } from 'react';

export default function ChatScreenOld({
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
      <SafeAreaView>
      <ScrollView>
        <TouchableOpacity style={styles.button} onPress={showModal}>
          <Text style={styles.text}>
            Button for add friends
          </Text>
        </TouchableOpacity>
        <ConnectPopup 
          isVisible={visible} 
          onClose={hideModal}
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
      </SafeAreaView>
    );
  }