import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useDeleteFriendship } from '@/hooks/graphql/friends/mutations';
  import { useDeleteChatMember } from '@/hooks/graphql/chats/mutations';
import { useUpdateChatMember } from '@/hooks/graphql/chats/mutations';
// Components
import RequestsScreen from '@/components/screens/chats/requestsScreen';
// Debug
import { debugRenders } from '@/debug/utils';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useDataRefetch } from '@/contexts/DataFetcher';

const RequestsPage = () => {
  const { authToken } = useAuth();
   const { fetching, user, friends, chats } = useDataProvider();
   const { refetchData } = useDataRefetch();

 // Mutations: Accept
 const { updateChatMember } = useUpdateChatMember();
 const [isAcceptingGroupInvite, setIsAcceptingGroupInvite] = useState(false);
 const handleAcceptGroupInvite = async (chatId: number) => {
  try {
    setIsAcceptingGroupInvite(true);
    const input = {
      status: 'ACCEPTED'
    }
    const response = await updateChatMember(input, user.id, chatId);
    if (response.success) {
      console.log("Successfully accepted group invite.", response.chat_member);
      await refetchData({ chats: true });
    } else {
      throw new Error("Response.success from updateChatMember was false:" + response.errors);
    }
  } catch (error) {
    console.error('Error accepting group invite:', error);
  } finally {
    setIsAcceptingGroupInvite(false);
  }
}

 // Mutations: Cancel
const { deleteFriendship } = useDeleteFriendship();
const [isRemovingFriendRequest, setIsRemovingFriendRequest] = useState(false);
const handleRemoveFriendRequest = async (friendId: number) => {
  try {
    setIsRemovingFriendRequest(true);
    const response = await deleteFriendship(user.id, friendId, authToken as string);
    if (response.success) {
      console.log("Successfully removed friend request.");
      await refetchData({ friends: true });
    } else {
      throw new Error("Response.success from deleteFriendship was false:" + response.errors);
    }
  } catch (error) {
    console.error('Error removing friend request:', error);
    // Don't refetch on error to avoid unnecessary API calls
  } finally {
    setIsRemovingFriendRequest(false);
  }
}

 const { deleteChatMember } = useDeleteChatMember();
  const [isRemovingGroupInvite, setIsRemovingGroupInvite] = useState(false);
  const handleRemoveGroupInvite = async (chatId: number) => {
    try {
      setIsRemovingGroupInvite(true);
      const response = await deleteChatMember(user.id, chatId);
      if (response.success) {
        console.log("Successfully removed group invite.");
        await refetchData({ chats: true });
      } else {
        throw new Error("Response.success from deleteChatMember was false:" + response.errors);
      }
    } catch (error) {
      console.error('Error removing group invite:', error);
    } finally {
      setIsRemovingGroupInvite(false);
    }
  }

 const friendRequests = friends.filter((friend: any) => friend.status === 'PENDING' && friend.role === 'receiver').map((friend: any) => friend.friend);
 const groupInvites = chats.filter((chat: any) => chat.status === 'PENDING').map((chat: any) => chat.chat);



 const loading = fetching || isRemovingFriendRequest || isAcceptingGroupInvite || isRemovingGroupInvite;
 if (debugRenders && !loading) {
  console.log("Rendering RequestsPage\n",
    "Friends:", friends.map((friend: any) => ({
      id: friend.friend.id,
      username: friend.friend.username,
      role: friend.role,
      status: friend.status
    })), "\n",
    "Friend Requests:", friendRequests.map((req: any) => ({
      id: req.id,
      username: req.username,
      status: friends.find((f: any) => f.friend.id === req.id)?.status
    })), "\n",
    "Chats:", chats.map((chat: any) => ({
      id: chat.chat.id,
      type: chat.chat.type,
      title: chat.chat.title,
      role: chat.role,
      status: chat.status
    })), "\n",
    "Group Invites:", groupInvites.map((invite: any) => ({
      id: invite.id,
      type: invite.type,
      title: invite.title
    })), "\n",
  );
 }
 return (
   <RequestsScreen 
    loading={loading}
    friendRequests={friendRequests}
    handleRemoveFriendRequest={handleRemoveFriendRequest}
    groupInvites={groupInvites}
    handleAcceptGroupInvite={handleAcceptGroupInvite}
    handleRemoveGroupInvite={handleRemoveGroupInvite}
   />
 );
};

export default AuthWrapper(RequestsPage);