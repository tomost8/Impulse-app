import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUserChats } from '@/hooks/graphql/chats/queries';
import { useGetFriendRequests } from '../../../hooks/graphql/friends/queries';
import { useAcceptFriendRequest } from '../../../hooks/graphql/friends/mutations';
// Components
import ChatScreen from '@/components/screens/tabs/ChatsScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';
import { useUserData } from '@/services/UserPreferencesContext';


const ChatPage = () => {
  const { userId, authToken } = useUserInfo();
  const { fetching, chats, friends } = useUserData();
  const [renderCounter, setRenderCounter] = useState(0);

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

  // Debug
  const loading = fetching;
  if (debugRenders && !loading) {
    console.log("Rendering ChatScreen\n",
      "Chats:", chats, "\n",
      "Friends:", friends, "\n",
      "Chat Info:", chatInfo, "\n",
      "Render Counter:", renderCounter, "\n",
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
