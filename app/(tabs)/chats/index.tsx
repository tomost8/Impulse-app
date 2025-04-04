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

  const chatInfo = chats.map((chat: any) => {
    if (chat.chat.type === 'group') {
      return chat.chat;
    } else if (chat.chat.type === 'direct') {
      const matchingFriend = friends.find(friend => friend.chat_id === chat.chat.id);
      const directChatInfo = {
        id: chat.chat.id,
        type: 'direct',
        title: matchingFriend ? matchingFriend.friend.username : chat.chat.title,
        profile_pic: matchingFriend ? matchingFriend.friend.profile_picture : null
      };
      return directChatInfo;
    }
    return chat.chat; // fallback case
  });

  // Request Count
  const friendRequests = friends.filter((friend: any) => friend.status === 'PENDING' && friend.role === 'receiver').map((friend: any) => friend.friend);
  const groupInvites = chats.filter((chat: any) => chat.status === 'PENDING');

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
    />
  }
}

export default AuthWrapper(ChatPage);
