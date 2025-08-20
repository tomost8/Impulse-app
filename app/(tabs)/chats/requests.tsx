import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useDeleteFriendship } from '@/hooks/graphql/friends/mutations';
  import { useDeleteChatMember } from '@/hooks/graphql/chats/mutations';
import { useUpdateChatMember } from '@/hooks/graphql/chats/mutations';
// Components
import RequestsScreen from '@/components/screens/chats/requestsScreen';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserAuth } from '@/services/AuthContext';
import { useUserData } from '@/services/UserPreferencesContext';

const RequestsPage = () => {
  const { authToken } = useUserAuth();
 const { fetching, user, friends, chats } = useUserData();

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
    } else {
      throw new Error("Response.success from deleteFriendship was false:" + response.errors);
    }
  } catch (error) {
    console.error('Error removing friend request:', error);
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
    "User ID:", user.id, "\n",
    "Friends:", friends, "\n",
    "Friend Requests:", friendRequests, "\n",
    "Chats:", chats, "\n",
    "Group Invites:", groupInvites, "\n",
  );
 }
 return (
   <RequestsScreen 
    loading={false}
    friendRequests={friendRequests}
    handleRemoveFriendRequest={handleRemoveFriendRequest}
    groupInvites={groupInvites}
    handleAcceptGroupInvite={handleAcceptGroupInvite}
    handleRemoveGroupInvite={handleRemoveGroupInvite}
   />
 );
};

export default AuthWrapper(RequestsPage);