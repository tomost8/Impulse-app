import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetAllUsers } from '@/hooks/graphql/users/queries';
import { useGetFriends } from '@/hooks/graphql/friends/queries';
import { useSendFriendRequest, useDeleteFriendship } from '@/hooks/graphql/friends/mutations';
// Components
// Debug
import { debugRenders } from '@/utils/debug';

function AddFriendsScreen({
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

const AddFriendsPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const usersRef = useRef<any[] | null>(null);
  const hasFetchedUsers = useRef(false);
  const { users, fetched: hasNewUsersData } = useGetAllUsers(!hasFetchedUsers.current);

  const friendsRef = useRef<any[] | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriends(userId as number, !hasFetchedFriends.current);

  useEffect(() => {
    if (!hasNewUsersData && !hasNewFriendsData) {
      return;
    }
    if (hasNewUsersData) {
      usersRef.current = users;
      hasFetchedUsers.current = true;
    }
    if (hasNewFriendsData) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
    }
    if (hasFetchedUsers.current && hasFetchedFriends.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewUsersData, hasNewFriendsData]);

  // Mutations
  const { sendFriendRequest } = useSendFriendRequest();
  const [isSendingFriendRequest, setIsSendingFriendRequest] = useState(false);
  const handleSendFriendRequest = async (friendId: number) => {
    setIsSendingFriendRequest(true);
    try {
      const input = {
        sender_id: userId,
        receiver_id: friendId,
      }
      const response = await sendFriendRequest(input, authToken);
      if (response.success) {
        console.log("Friend request sent successfully", response);
      } else {
        console.error("Error sending friend request:", response.errors);
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    } finally {
      setIsSendingFriendRequest(false);
    }
  }

  const { deleteFriendship } = useDeleteFriendship();
  const [isDeletingFriendRequest, setIsDeletingFriendRequest] = useState(false);
  const handleDeleteFriendRequest = async (friendId: number) => {
    setIsDeletingFriendRequest(true);
    try {
      const response = await deleteFriendship(userId, friendId, authToken);
      if (response.success) {
        console.log("Friend request deleted successfully", response);
      } else {
        console.error("Error deleting friend request:", response.errors);
      }
    } catch (error) {
      console.error("Error deleting friend request:", error);
    } finally {
      setIsDeletingFriendRequest(false);
    }
  }

  // Debug
  const loading = !hasFetchedUsers.current || !hasFetchedFriends.current || isSendingFriendRequest || isDeletingFriendRequest;
  if (debugRenders && !loading) {
    console.log("Rendering AddFriendsScreen\n",
      "Users:", usersRef.current, "\n",
      "Friends:", friendsRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return <AddFriendsScreen
    users={usersRef.current}
    isUsersLoading={!hasFetchedUsers.current}
    friends={friendsRef.current}
    isFriendsLoading={!hasFetchedFriends.current}
    handleSendFriendRequest={handleSendFriendRequest}
    isSendingFriendRequest={isSendingFriendRequest}
    handleDeleteFriendRequest={handleDeleteFriendRequest}
    isDeletingFriendRequest={isDeletingFriendRequest}
  />
}

export default AuthWrapper(AddFriendsPage);