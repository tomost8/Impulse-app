import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useDeleteFriendship } from '@/hooks/graphql/friends/mutations';
// Components
import FriendsList from '@/components/screens/profile/FriendsCommunityList/FriendsList';
// Debug
import { debugRenders } from '@/debug/utils';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useDataRefetch } from '@/contexts/DataFetcher';



const FriendsPage = () => {
  const { authToken } = useAuth();
  const { fetching, user, friends } = useDataProvider();
  const { refetchData } = useDataRefetch();

   // Mutations: Cancel
const { deleteFriendship } = useDeleteFriendship();
const [isRemovingFriend, setIsRemovingFriend] = useState(false);
const handleRemoveFriend = async (friendId: number) => {
  try {
    setIsRemovingFriend(true);
    const response = await deleteFriendship(user.id, friendId, authToken as string);
    if (response.success) {
      console.log("Successfully removed friend.", friendId);
      await refetchData({ friends: true });
    } else {
      throw new Error("Response.success from deleteFriendship was false:" + response.errors);
    }
  } catch (error) {
    console.error('Error removing friend:', error);
  } finally {
    setIsRemovingFriend(false);
  }
}

  const acceptedFriends = friends.filter((friend: any) => friend.status === 'ACCEPTED').map((friend: any) => friend.friend);

  const loading = fetching || isRemovingFriend;

  return (
    <FriendsList 
      loading={loading}
      friends={acceptedFriends} 
      handleRemoveFriend={handleRemoveFriend}
    />
  );
}

export default AuthWrapper(FriendsPage);