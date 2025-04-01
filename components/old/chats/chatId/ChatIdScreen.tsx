import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from '@/utils/testStyles';
import RemoveFriendModal from '@/components/modals/RemoveFriendModal';
import { useState } from 'react';

export default function ChatIdScreenOld({
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
                <Image source={{ uri: partner?.profile_picture }} style={styles.smallImage} />
                <Text style={styles.text}>{partner?.first_name} {partner?.last_name}</Text>
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
              <TouchableOpacity style={styles.button} onPress={() => router.push(`/chats/${chatId}/groupInfo`)}>
                <Text style={styles.text}>Group Info</Text>
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
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        {renderChatHeader()}
        <Text style={styles.todoText}>Actual Chat Functionality</Text>
      </View>
    );
  }