import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Searchbar } from 'react-native-paper';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriends } from '@/hooks/graphql/friends/queries';
import { useGetChatMembers } from '@/hooks/graphql/chats/queries';
import { useCreateChatMember } from '@/hooks/graphql/chats/mutations';
// Components
// Debug
import { debugRenders } from '@/utils/debug';

function GroupInviteScreen({
  chatId,
  friends,
  isFriendsLoading,
  chatMembers,
  isChatMembersLoading,
  handleInviteUserToChat,
  isInvitingUserToChat
}: {
  chatId: number;
  friends: any;
  isFriendsLoading: boolean;
  chatMembers: any;
  isChatMembersLoading: boolean;
  handleInviteUserToChat: (userId: number, chatId: number) => void;
  isInvitingUserToChat: boolean;
}) {
  console.log(isFriendsLoading, isChatMembersLoading, isInvitingUserToChat);
  if (isFriendsLoading || isChatMembersLoading || isInvitingUserToChat) {
    return <Text style={styles.text}>Loading...</Text>;
  }
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.section}>
      <Searchbar
          placeholder="Search friends"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
      </View>
      <View style={styles.section}>
        {friends.map((friend: any) => {
          const matchesSearch = 
            friend.friend.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
            `${friend.friend.first_name} ${friend.friend.last_name}`.toLowerCase().includes(searchQuery.toLowerCase());
          const isMember = chatMembers.some((member: any) => member.user.id === friend.friend.id);
          const isPending = isMember && chatMembers.find((member: any) => member.user.id === friend.friend.id)?.status === 'PENDING';
          const displayFriend = matchesSearch && (!isMember || isPending);

          return displayFriend && (
            <View style={styles.container} key={friend.friend.id}>
              <Text style={styles.text}>{friend.friend.first_name} {friend.friend.last_name}, {friend.friend.username}, {friend.friend.profile_picture}</Text>
              <TouchableOpacity 
                style={[styles.button, isPending && { opacity: 0.5 }]} 
                onPress={() => handleInviteUserToChat(friend.friend.id, chatId)}
                disabled={isPending}
              >
                <Text style={styles.text}>{isPending ? 'Invited' : 'Send Invite'}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const GroupInvitePage = (props: any) => {
  console.log("GroupInvitePage");
  const { chatId } = useLocalSearchParams();
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const friendsRef = useRef<any[] | null>(null);
  const hasFetchedFriends = useRef<boolean>(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriends(userId as number, !hasFetchedFriends.current);

  const chatMembersRef = useRef<any[] | null>(null);
  const hasFetchedChatMembers = useRef<boolean>(false);
  const { chatMembers, fetched: hasNewChatMembersData } = useGetChatMembers(Number(chatId), !hasFetchedChatMembers.current);

  useEffect(() => {
    if (!hasNewFriendsData && !hasNewChatMembersData) {
      return;
    }
    if (hasNewFriendsData) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
    }
    if (hasNewChatMembersData) {
      chatMembersRef.current = chatMembers;
      hasFetchedChatMembers.current = true;
    }
    if (hasNewFriendsData && hasNewChatMembersData) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewFriendsData, hasNewChatMembersData]);

  // Mutations
  const { createChatMember } = useCreateChatMember();
  const [isInvitingUserToChat, setIsInvitingUserToChat] = useState(false);
  const handleInviteUserToChat = async (chatId: number) => {
    setIsInvitingUserToChat(true);
    try {
      const input = { 
        user_id: userId, 
        chat_id: chatId,
      };
      const response = await createChatMember(input);
      console.log(response.data.createChatMember);
      return response.data.createChatMember;
    } catch (error) {
      console.error("Error inviting friend:", error);
      throw error;
    } finally {
      setIsInvitingUserToChat(false);
    }
  }

  // Debug
  const loading = !hasFetchedFriends.current || !hasFetchedChatMembers.current || isInvitingUserToChat;
  if (debugRenders && !loading) {
    console.log('Rendering GroupInvitePage\n',
      'Friends:', friendsRef.current, '\n',
      'Chat Members:', chatMembersRef.current, '\n',
      'Render Counter:', renderCounter, '\n',
    );
  }

  return (
    <GroupInviteScreen
      chatId={Number(chatId)}
      friends={friendsRef.current}
      isFriendsLoading={!hasFetchedFriends.current}
      chatMembers={chatMembersRef.current}
      isChatMembersLoading={!hasFetchedChatMembers.current}
      handleInviteUserToChat={handleInviteUserToChat}
      isInvitingUserToChat={isInvitingUserToChat}
    />
  );
}

export default AuthWrapper(GroupInvitePage);