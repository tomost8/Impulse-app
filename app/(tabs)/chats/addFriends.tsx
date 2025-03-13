
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetAllUsers } from '@/hooks/graphql/users/queries';
import { useGetFriends } from '@/hooks/graphql/friends/queries';
import { useSendFriendRequest, useDeleteFriendship } from '@/hooks/graphql/friends/mutations';
// Components
import FindFriendScreen from '@/components/screens/connect/findfriend';
import AddFriendsScreenOld from '@/components/old/chats/AddFriendsScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';



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

  if (pageDisplay) {
    return <FindFriendScreen />
  } else {
    return <AddFriendsScreenOld
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
}

export default AuthWrapper(AddFriendsPage);