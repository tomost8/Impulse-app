import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Searchbar } from 'react-native-paper';
import { useGetAllChats, useGetUserChats } from '@/hooks/graphql/chats/queries';
import useUserInfo from '@/hooks/useUserInfo';
import JoinGroupModal from '@/components/modals/JoinGroupModal';
import { INVITE_USER_TO_CHAT } from '@/hooks/graphql/chats/mutations';
import { client } from '@/services/client';


export default function GroupJoinScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { userId } = useUserInfo();
  const { chats } = useGetAllChats();
  const { chatMembers } = useGetUserChats(userId as number);
  console.log("search bar: groupJoin.tsx", 
    "chats", chats, 
    "chatMembers", chatMembers
  );
  //modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleJoinGroup = async (chat: any) => {
    if (chat.password) {
      console.log('There is a password', chat);
    } else {
      const input = { chat_id: chat.id, user_id: userId, status: 'ACCEPTED' };
      console.log('There is no password', chat, input);
      try {
        const { data } = await client.mutate({
          mutation: INVITE_USER_TO_CHAT,
          variables: { input },
        });
        if (data.createChatMember.success) {
          console.log("Group joined successfully", data);
          showModal();
        } else {
          console.error("Error joining group:", data);
        }
      } catch (error) {
        console.error("Error joining group:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
      <Searchbar
          placeholder="Search groups"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
      </View>
      <View style={styles.section}>
        {chats.map((chat: any) => {
          const isGroup = (chat.type === 'group'); //groups must have titles
          const matchesSearch = isGroup && chat.title.includes(searchQuery);
          const isAcceptedMember = chatMembers.some((member: any) => member.chat.id === chat.id && member.status === 'ACCEPTED');
          const isDisplay = isGroup && matchesSearch && !isAcceptedMember;

          return isDisplay && (
            <View style={styles.container} key={chat.id}>
              <Text style={styles.text}>{chat.title}, {chat.profile_pic}</Text>
              <TouchableOpacity style={styles.button} onPress={() => handleJoinGroup(chat)}>
                <Text style={styles.text}> Join </Text>
              </TouchableOpacity>
              <JoinGroupModal 
                visible={visible}  
                hideModal={hideModal} 
                chat={chat}
                userId={userId as number}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}