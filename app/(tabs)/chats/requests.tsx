import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import RequestsScreen from '@/components/screens/chats/requests';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';
// Services
import { useUserData } from '@/services/UserPreferencesContext';

const RequestsPage = () => {
 const { fetching, friends, chats } = useUserData();

 // Add Mutations for accept/cancel

 const friendRequests = friends.filter((friend: any) => friend.status === 'PENDING' && friend.role === 'receiver').map((friend: any) => friend.friend);
 const groupInvites = chats.filter((chat: any) => chat.status === 'PENDING').map((chat: any) => chat.chat);

 const loading = fetching;
 if (debugRenders && !loading) {
  console.log("Rendering RequestsPage\n",
    "Friends:", friends, "\n",
    "Chats:", chats, "\n",
    "Friend Requests:", friendRequests, "\n",
    "Group Invites:", groupInvites, "\n",
  );
 }
 return (
   <RequestsScreen 
    loading={false}
    friendRequests={friendRequests}
    groupInvites={groupInvites}
   />
 );
};

export default AuthWrapper(RequestsPage);