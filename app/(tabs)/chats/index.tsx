import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks

// Components
import ChatsListScreen from '@/components/screens/chats/ChatsListScreen';
// Debug
import { pageDisplay, debugChatsPage } from '@/debug/utils';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';


const ChatPage = () => {
  const { fetching, chats, friends } = useDataProvider();

  // Display Chat Info
  const acceptedChats = chats.filter((chat: any) => chat.status === 'ACCEPTED').map((chat: any) => chat);
  
  // Sort chats by updated_at with most recent first
  const sortedChats = acceptedChats.sort((a: any, b: any) => {
    const aHasUnread = a.unreadCount > 0;
    const bHasUnread = b.unreadCount > 0;

    // If one has unread and the other doesn't, unread one comes first
    if (aHasUnread && !bHasUnread) return -1;
    if (!aHasUnread && bHasUnread) return 1;

    // If both have same unread status, sort by most recent date
    const dateA = new Date(a.chat.updated_at || 0).getTime();
    const dateB = new Date(b.chat.updated_at || 0).getTime();
    return dateB - dateA;
  });

  const chatInfo = sortedChats.map((chat: any) => {
    if (chat.chat.type === 'group') {
      return {
        ...chat.chat,
        message: "Tap to view messages",
        time: "",
        unreadCount: chat.unreadCount || 0
      };
    } else if (chat.chat.type === 'direct') {
      const matchingFriend = friends.find(friend => friend.chat_id === chat.chat.id);
      const directChatInfo = {
        id: chat.chat.id,
        type: 'direct',
        title: matchingFriend ? matchingFriend.friend.username : chat.title,
        profile_pic: matchingFriend ? matchingFriend.friend.profile_picture : null,
        message: "Tap to view messages",
        time: "",
        unreadCount: chat.unreadCount || 0
      };
      return directChatInfo;
    }
    return {
      ...chat.chat,
      message: "Tap to view messages",
      time: ""
    }; // fallback case
  });

  // Display Request Count
  const friendRequests = friends.filter((friend: any) => friend.status === 'PENDING' && friend.role === 'receiver').map((friend: any) => friend.friend);
  const groupInvites = chats.filter((chat: any) => chat.status === 'PENDING');
  const requestCount = friendRequests.length + groupInvites.length;

  // Debug
  const loading = fetching;
  if (debugChatsPage && !loading) {
    const friendDetails = friends.map((friend: any) => ({
      id: friend.friend.id,
      name: friend.friend.username || `${friend.friend.first_name} ${friend.friend.last_name}`,
      status: friend.status,
      role: friend.role
    }));
    const chatDetails = chats.map((chat: any) => {
      const chatInfoItem = chatInfo.find((info: any) => info.id === chat.chat.id);
      return {
        id: chat.chat.id,
        name: chatInfoItem?.title || chat.chat.title || 'Direct',
        type: chat.chat.type,
        status: chat.status
      };
    });
    console.log(`Rendering ChatPage - Friends:`, friendDetails, `| Chats:`, chatDetails);
  }

  if (pageDisplay) {
    return <ChatsListScreen 
      loading={loading}
      chats={chatInfo}
      requestCount={requestCount}
    />
  }
  
  return null;
}


export default AuthWrapper(ChatPage);
