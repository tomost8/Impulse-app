import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUserChats } from '../../../hooks/graphql/chats/queries';
import { useGetFriendRequests } from '../../../hooks/graphql/friends/queries';
import { useAcceptFriendRequest } from '../../../hooks/graphql/friends/mutations';
// Components
import ChatScreen from '@/components/screens/chats/chatscreen';
import ChatScreenOld from '@/components/old/chats/ChatScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';


const ChatPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const chatsRef = useRef<any[] | null>(null);
  const hasFetchedChats = useRef(false);
  const { chatMembers, fetched: hasNewChatsData } = useGetUserChats(userId as number, !hasFetchedChats.current);

  const friendRequestsRef = useRef<any[] | null>(null);
  const hasFetchedFriendRequests = useRef(false);
  const { friendRequests: receivedRequests, fetched: hasNewFriendRequestsData } = useGetFriendRequests(userId as number, 'receiver', !hasFetchedFriendRequests.current);
  
  const sentRequestsRef = useRef<any[] | null>(null);
  const hasFetchedSentRequests = useRef(false);
  const { friendRequests: sentRequests, fetched: hasNewSentRequestsData } = useGetFriendRequests(userId as number, 'sender', !hasFetchedSentRequests.current);

  useEffect(() => {
    if (!hasNewChatsData && !hasNewFriendRequestsData && !hasNewSentRequestsData) {
      return;
    }
    if (hasNewChatsData) {
      chatsRef.current = chatMembers;
      hasFetchedChats.current = true;
    }
    if (hasNewFriendRequestsData) {
      friendRequestsRef.current = receivedRequests;
      hasFetchedFriendRequests.current = true;
    }
    if (hasNewSentRequestsData) {
      sentRequestsRef.current = sentRequests;
      hasFetchedSentRequests.current = true;
    }
    if (hasFetchedChats.current && hasFetchedFriendRequests.current && hasFetchedSentRequests.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewChatsData, hasNewFriendRequestsData, hasNewSentRequestsData]);

  // Mutations
  const { acceptFriendRequest } = useAcceptFriendRequest();
  const [isAcceptingFriendRequest, setIsAcceptingFriendRequest] = useState(false);
  const handleAcceptFriendRequest = async (friendId: number) => {
    setIsAcceptingFriendRequest(true);
    try {
      const input = {
        status: 'ACCEPTED',
      }
      const response = await acceptFriendRequest(userId as number, friendId, input, authToken);
      if (response.success) {
        console.log("Friend request accepted:", response);
      } else {
        console.log("Error accepting friend request:", response.errors);
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    } finally {
      setIsAcceptingFriendRequest(false);
    }
  };

  // Debug
  const loading = !hasFetchedChats.current || !hasFetchedFriendRequests.current || !hasFetchedSentRequests.current;
  if (debugRenders && !loading) {
    console.log("Rendering ChatScreen\n",
      "Chats:", chatsRef.current, "\n",
      "Friend Requests:", friendRequestsRef.current, "\n",
      "Sent Requests:", sentRequestsRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  if (pageDisplay) {
    return <ChatScreen />
  } else {
    return <ChatScreenOld 
      chats={chatsRef.current}
      isChatsLoading={!hasFetchedChats.current}
      friendRequests={friendRequestsRef.current}
      isFriendRequestsLoading={!hasFetchedFriendRequests.current}
      sentRequests={sentRequestsRef.current}
      isSentRequestsLoading={!hasFetchedSentRequests.current}
      handleAcceptFriendRequest={handleAcceptFriendRequest}
      isAcceptingFriendRequest={isAcceptingFriendRequest}
    />;
  }
}

export default AuthWrapper(ChatPage);
