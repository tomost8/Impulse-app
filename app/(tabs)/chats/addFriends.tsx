import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import useUserInfo from '@/hooks/useUserInfo';
import { useGetAllUsers } from '@/hooks/graphql/useUsers';
import { useGetFriends } from '@/hooks/graphql/useFriends';
import { useMutation } from '@apollo/client';
import { DELETE_FRIENDSHIP, SEND_FRIEND_REQUEST } from '@/hooks/graphql/constants/friends';


export default function AddFriendsScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { userId } = useUserInfo();
  const { users } = useGetAllUsers();
  const { friends } = useGetFriends(userId as number);
  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST);
  console.log("search bar: addFriends.tsx", 
    "users", users, 
    "friends", friends
  );

  const addFriend = async (friendId: number) => {
    try {
      const { data } = await sendFriendRequest({
        variables: {
          input: {
            sender_id: userId,
            receiver_id: friendId,
          },
        },
      });
      if (data.createFriendship.success) {
        console.log("Friend request sent successfully", data);
      } else {
        console.error("Error sending friend request:", data);
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const [deleteFriendRequest] = useMutation(DELETE_FRIENDSHIP);
  const removeRequest = async (friendId: number) => {
      try {
        const { data } = await deleteFriendRequest({ variables: { userId, friendId } });
        if (data.deleteFriendship.success) {
          console.log("Friend request deleted successfully");
        } else {
          console.error("Error deleting friendship:", data.deleteFriendship.errors);
        }
      } catch (error) {
        console.error("Error deleting friendship:", error);
      }
    console.log('Removing friend request for user ID:', userId);
  };

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
                  <TouchableOpacity style={styles.button} onPress={() => removeRequest(user.id)}>
                    <Text style={styles.text}>X for cancel pending request</Text>
                  </TouchableOpacity>
                </View>
              )
            );
          })
        ) : (
          users.map((user: any) => {
            const matchesSearch = user.username.includes(searchQuery);
            const isFriend = friends.some((friend: any) => friend.friend.id === user.id);
            const isDisplay = matchesSearch && !isFriend;
            
            return (
              isDisplay && (
                <View style={styles.container} key={user.id}>
                  <Text style={styles.text}>{user.first_name}, {user.username}, {user.profile_picture}</Text>
                  <TouchableOpacity style={styles.button} onPress={() => addFriend(user.id)}>
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