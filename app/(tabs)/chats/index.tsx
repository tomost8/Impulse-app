import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks

// Components
import ChatScreen from '@/components/screens/tabs/ChatsScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';
import { useUserData } from '@/services/UserPreferencesContext';


const ChatPage = () => {
  const { fetching, chats, friends } = useUserData();

  // Queries (maybe for messages)

  // Display Chat Info
  const acceptedChats = chats.filter((chat: any) => chat.status === 'ACCEPTED').map((chat: any) => chat.chat);
  const chatInfo = acceptedChats.map((chat: any) => {
    if (chat.type === 'group') {
      return chat;
    } else if (chat.type === 'direct') {
      const matchingFriend = friends.find(friend => friend.chat_id === chat.id);
      const directChatInfo = {
        id: chat.id,
        type: 'direct',
        title: matchingFriend ? matchingFriend.friend.username : chat.title,
        profile_pic: matchingFriend ? matchingFriend.friend.profile_picture : null
      };
      return directChatInfo;
    }
    return chat.chat; // fallback case
  });

  // Display Request Count
  const friendRequests = friends.filter((friend: any) => friend.status === 'PENDING' && friend.role === 'receiver').map((friend: any) => friend.friend);
  const groupInvites = chats.filter((chat: any) => chat.status === 'PENDING');
  const requestCount = friendRequests.length + groupInvites.length;

  // Debug
  const loading = fetching;
  if (debugRenders && !loading) {
    console.log("Rendering ChatScreen\n",
      "Chats:", chats, "\n",
      "Friends:", friends, "\n",
      "Chat Info:", chatInfo, "\n",
    );
  }

  if (pageDisplay) {
    return <ChatScreen 
      loading={loading}
      chats={chatInfo}
      requestCount={requestCount}
    />
  }
}

export default AuthWrapper(ChatPage);
