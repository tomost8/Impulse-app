import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Searchbar } from 'react-native-paper';
import useUserInfo from '@/hooks/useUserInfo';
import { useGetFriends } from '@/hooks/graphql/friends/queries';
import { INVITE_USER_TO_CHAT } from '@/hooks/graphql/chats/mutations';
import { client } from '@/services/client';
import { useGetChatMembers } from '@/hooks/graphql/chats/queries';


export default function GroupInviteScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { userId } = useUserInfo();
  const { chatId } = useLocalSearchParams();
  const { friends } = useGetFriends(userId as number);
  const { chatMembers } = useGetChatMembers(Number(chatId));
  console.log("search bar: chats/[chatId]/invite.tsx", 
    "friends", friends, 
    "chatMembers", chatMembers
  );

  const inviteFriend = async (userId: number, chatId: number) => {
    const input = { user_id: userId, chat_id: chatId };
    try {
      const response = await client.mutate({
        mutation: INVITE_USER_TO_CHAT,
        variables: { input },
      });
      console.log(response.data.createChatMember);
      return response.data.createChatMember;
    } catch (error) {
      console.error("Error inviting friend:", error);
      throw error;
    }
  };

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
                onPress={() => inviteFriend(friend.friend.id, Number(chatId))}
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