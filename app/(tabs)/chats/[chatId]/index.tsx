import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useGetChat, useGetChatMembers } from '../../../../hooks/graphql/useChats';
import styles from '@/constants/testStyles';
import useUserInfo from '@/hooks/useUserInfo';
import { useState } from 'react';
import RemoveFriendModal from '@/components/modals/RemoveFriendModal';

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams();
  const { userId } = useUserInfo();
  const { chat, isLoading, error } = useGetChat(Number(chatId));
  const { chatMembers} = useGetChatMembers(Number(chatId));
  let partner: any = null;
  if (chat?.type === 'direct') {
    chatMembers.forEach((member: any) => {
      if (member.user.id !== userId) {
        partner = member.user;
      }
    });
  }
  console.log("chats/[chatId]/index.tsx", 
    "chat", chat, 
    "chatMembers", chatMembers, 
    "partner", partner
  );

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="white" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

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
            <RemoveFriendModal visible={visible} hideModal={hideModal} userId={userId as number} friendId={partner?.id} />
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
