import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetAllUsers } from '@/hooks/graphql/users/queries';
import { useGetFriends } from '@/hooks/graphql/friends/queries';
import { useSendFriendRequest, useDeleteFriendship } from '@/hooks/graphql/friends/mutations';
// Components
import FindFriendScreen from '@/components/screens/chats/findfriend';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';
import { useUserData } from '@/services/UserPreferencesContext';


const AddFriendsPage = () => {
  const { userId, authToken } = useUserInfo();
  const { fetching, friends } = useUserData();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries
  const usersRef = useRef<any[] | null>(null);
  const hasFetchedUsers = useRef(false);
  const { users, fetched: hasNewUsersData } = useGetAllUsers(!hasFetchedUsers.current);

  useEffect(() => {
    if (!hasNewUsersData) {
      return;
    }
    if (hasNewUsersData) {
      usersRef.current = users;
      hasFetchedUsers.current = true;
    } 
    if (hasFetchedUsers.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewUsersData]);

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
      const response = await sendFriendRequest(input, authToken as string);
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
      const response = await deleteFriendship(userId as number, friendId, authToken as string);
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
  const sentRequests = friends.filter((friend: any) => friend.status === 'PENDING' && friend.role === 'sender').map((friend: any) => friend.friend);
  const nonFriends = usersRef.current?.filter((user: any) => user.id !== userId && !friends.some((friend: any) => friend.friend.id === user.id));
  
  const loading = fetching || !hasFetchedUsers.current || isSendingFriendRequest || isDeletingFriendRequest;
  if (debugRenders && !loading) {
    console.log("Rendering AddFriendsScreen\n",
      "Users:", usersRef.current, "\n",
      "Friends:", friends, "\n",
      "Sent Requests:", sentRequests, "\n",
      "Non Friends:", nonFriends, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return (
    <FindFriendScreen 
      loading={loading}
      users={nonFriends || []}
      handleSendFriendRequest={handleSendFriendRequest}
      sentRequests={sentRequests}
      handleCancelSentRequest={handleDeleteFriendRequest}
    />
  );
}

export default AuthWrapper(AddFriendsPage);