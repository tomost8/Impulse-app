import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import JoinGroupModal from '@/components/modals/JoinGroupModal';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetAllChats, useGetUserChats } from '@/hooks/graphql/chats/queries';
import { useCreateChatMember } from '@/hooks/graphql/chats/mutations';
// Components
// Debug
import { debugRenders } from '@/utils/debug';

function JoinGroupScreen({
  chats,
  isChatsLoading,
  chatMembers,
  isChatMembersLoading,
  handleJoinGroup,
  isJoiningGroup,
  //Extra
  userId
}: {
  chats: any;
  isChatsLoading: boolean;
  chatMembers: any;
  isChatMembersLoading: boolean;
  handleJoinGroup: (chat: any) => void;
  isJoiningGroup: boolean;
  //Extra
  userId: number;
}) {
  if (isChatsLoading || isChatMembersLoading || isJoiningGroup) {
    return <Text>Loading...</Text>;
  }
  //modal
  const [visible, setVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const showModal = (chat: any) => {
    console.log("selected chat", chat);
    setSelectedChat(chat);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
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
              <TouchableOpacity style={styles.button} onPress={() => showModal(chat)}>
                <Text style={styles.text}> Join </Text>
              </TouchableOpacity>
              <JoinGroupModal 
                visible={visible}  
                hideModal={hideModal} 
                chat={selectedChat}
                handleJoinGroup={handleJoinGroup}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const JoinGroupPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const chatsRef = useRef<any[] | null>(null);
  const hasFetchedChats = useRef(false);
  const { chats, fetched: hasNewChatsData } = useGetAllChats(!hasFetchedChats.current);

  const chatMembersRef = useRef<any[] | null>(null);
  const hasFetchedChatMembers = useRef(false);
  const { chatMembers, fetched: hasNewChatMembersData } = useGetUserChats(userId as number, !hasFetchedChatMembers.current);

  useEffect(() => {
    if (!hasNewChatsData && !hasNewChatMembersData) {
      return;
    }
    if (hasNewChatsData) {
      chatsRef.current = chats;
      hasFetchedChats.current = true;
    }
    if (hasNewChatMembersData) {
      chatMembersRef.current = chatMembers;
      hasFetchedChatMembers.current = true;
    }
    if (hasFetchedChats.current && hasFetchedChatMembers.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewChatsData, hasNewChatMembersData]);

  // Mutations
  const { createChatMember } = useCreateChatMember();
  const [isJoiningGroup, setIsJoiningGroup] = useState(false);
  const handleJoinGroup = async (chat: any) => {
    // Password check is in the form in JoinGroupModal
    setIsJoiningGroup(true);
    try {
      const input = { 
        user_id: userId, 
        chat_id: chat.id,
        status: 'ACCEPTED'
      };
      const response = await createChatMember(input);
      if (response.success) {
        console.log("Group joined successfully", response);
      } else {
        console.error("Error joining group:", response);
      }
    } catch (error) {
      console.error("Error joining group:", error);
    } finally {
      setIsJoiningGroup(false);
    }
  };

  // Debug
  const loading = !hasFetchedChats.current || !hasFetchedChatMembers.current || isJoiningGroup;
  if (debugRenders && !loading) {
    console.log("Rendering JoinGroupPage\n",
      "Chats:", chatsRef.current, "\n",
      "Chat Members:", chatMembersRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return (
    <JoinGroupScreen 
      chats={chatsRef.current}
      isChatsLoading={!hasFetchedChats.current}
      chatMembers={chatMembersRef.current}
      isChatMembersLoading={!hasFetchedChatMembers.current}
      handleJoinGroup={handleJoinGroup}
      isJoiningGroup={isJoiningGroup}
      //Extra
      userId={userId as number}
    />
  );
}

export default AuthWrapper(JoinGroupPage);
