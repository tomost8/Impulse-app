import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';

export default function AddFriendsScreenOld({
    users,
    isUsersLoading,
    friends,
    isFriendsLoading,
    handleSendFriendRequest,
    isSendingFriendRequest,
    handleDeleteFriendRequest,
    isDeletingFriendRequest,
  }: {
    users: any;
    isUsersLoading: boolean;
    friends: any;
    isFriendsLoading: boolean;
    handleSendFriendRequest: (friendId: number) => void;
    isSendingFriendRequest: boolean;
    handleDeleteFriendRequest: (friendId: number) => void;
    isDeletingFriendRequest: boolean;
  }) {
    if (isUsersLoading || isFriendsLoading || isSendingFriendRequest || isDeletingFriendRequest) {
      return <Text>Loading...</Text>;
    }
    const [searchQuery, setSearchQuery] = useState<string>('');
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Searchbar
            placeholder="Search username"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
          />
        </View>
        <View style={styles.section}>
          {searchQuery === '' ? (
            users.map((user: any) => {
              const isRequested = friends.some((friend: any) => friend.friend.id === user.id && friend.status === 'PENDING');
              
              return (
                isRequested && (
                  <View style={styles.container} key={user.id}>
                    <Text style={styles.text}>{user.first_name}, {user.username}, {user.profile_picture}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => handleDeleteFriendRequest(user.id)}>
                      <Text style={styles.text}>X for cancel pending request</Text>
                    </TouchableOpacity>
                  </View>
                )
              );
            })
          ) : (
            users.map((user: any) => {
              const matchesSearch = user.username && user.username.includes(searchQuery);
              const isFriend = friends.some((friend: any) => friend.friend.id === user.id);
              const isDisplay = matchesSearch && !isFriend;
              
              return (
                isDisplay && (
                  <View style={styles.container} key={user.id}>
                    <Text style={styles.text}>{user.first_name}, {user.username}, {user.profile_picture}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => handleSendFriendRequest(user.id)}>
                      <Text style={styles.text}>Add Friend</Text>
                    </TouchableOpacity>
                  </View>
                )
              );
            })
          )}
        </View>
      </View>
    );
  }