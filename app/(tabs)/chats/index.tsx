import React, { useState, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
// Services
import { useDataRefetch } from '@/contexts/DataFetcher';
import AuthWrapper from '@/contexts/AuthWrapper';
import { useDataProvider } from '@/contexts/DataProviderContext';
// GraphQL hooks

// Components
import ChatsListScreen from '@/components/screens/chats/ChatsListScreen';

const DEBUG_CHATS_PAGE = false;


const ChatPage = () => {
  const { fetching, chats, friends, user, latestMessages } = useDataProvider();
  const { refetchData, isRefetching } = useDataRefetch();

  // Fetch data when navigating to this page
  useFocusEffect(
    React.useCallback(() => {
      console.log("🔄 Fetching data - ChatsPage navigated to");
      // Small delay to prevent GraphQL race conditions
      setTimeout(() => {
        refetchData({ chats: true, friends: true, latestMessages: true });
      }, 100);
    }, [])
  );

  // Queries (maybe for messages)

  // Display Chat Info
  const acceptedChats = chats.filter((chat: any) => chat.status === 'ACCEPTED').map((chat: any) => chat.chat);
  
  // Sort chats by their latest message time with most recent first
  const sortedChats = acceptedChats.sort((a: any, b: any) => {
    // Find the latest message for each chat
    const latestMessageA = latestMessages.find(msg => msg.chat_id === a.id);
    const latestMessageB = latestMessages.find(msg => msg.chat_id === b.id);
    
    // Use message time if available, otherwise fall back to chat updated_at
    const timeA = latestMessageA ? new Date(latestMessageA.created_at) : new Date(a.updated_at || 0);
    const timeB = latestMessageB ? new Date(latestMessageB.created_at) : new Date(b.updated_at || 0);
    
    return timeB.getTime() - timeA.getTime(); // Most recent first
  });
  
  const chatInfo = sortedChats.map((chat: any) => {
    // Find the latest message for this chat
    const latestMessage = latestMessages.find(msg => msg.chat_id === chat.id);
    
    // Helper function to format time/date
    const formatTimeOrDate = (dateString: string) => {
      const messageDate = new Date(dateString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // Check if it's today
      if (messageDate.toDateString() === today.toDateString()) {
        return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      // Check if it's yesterday
      else if (messageDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      }
      // Otherwise show date
      else {
        return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    };
    
    // Determine the time to display: latest message created_at, or chat updated_at as fallback
    const displayTime = latestMessage ? latestMessage.created_at : chat.updated_at;
    const displayMessage = latestMessage ? latestMessage.content : "No messages yet";
    
    if (chat.type === 'group') {
      return {
        ...chat,
        message: displayMessage,
        time: formatTimeOrDate(displayTime)
      };
    } else if (chat.type === 'direct') {
      const matchingFriend = friends.find(friend => friend.chat_id === chat.id);
      const directChatInfo = {
        id: chat.id,
        type: 'direct',
        title: matchingFriend ? matchingFriend.friend.username : chat.title,
        profile_pic: matchingFriend ? matchingFriend.friend.profile_picture : null,
        message: displayMessage,
        time: formatTimeOrDate(displayTime)
      };
      return directChatInfo;
    }
    return {
      ...chat.chat,
      message: displayMessage,
      time: formatTimeOrDate(displayTime)
    }; // fallback case
  });

  // Display Request Count
  const friendRequests = friends.filter((friend: any) => friend.status === 'PENDING' && friend.role === 'receiver').map((friend: any) => friend.friend);
  const groupInvites = chats.filter((chat: any) => chat.status === 'PENDING');
  const requestCount = friendRequests.length + groupInvites.length;

  // Debug
  const loading = fetching || isRefetching;
  if (DEBUG_CHATS_PAGE && !loading) {
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


  return <ChatsListScreen 
    loading={loading}
    chats={chatInfo}
    requestCount={requestCount}
  />
}


export default AuthWrapper(ChatPage);
