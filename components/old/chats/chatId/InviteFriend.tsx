import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';

export default function GroupInviteScreenOld({
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