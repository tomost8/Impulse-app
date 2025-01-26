import { useQuery } from '@apollo/client';
import { ACCEPT_FRIEND_REQUEST, GET_FRIEND_REQUESTS, GET_FRIENDS } from '../../services/api/friends';

export function useGetFriends(userId: number) {
  const { data, loading, error } = useQuery(GET_FRIENDS, {
    variables: { userId },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  //console.log('Friends data:', data);
  return {
    friends: data?.getFriendships.friendships || [],
    isLoading: loading,
    error: error?.message || null
  };
} 

export function useGetFriendRequests(userId: number) {
  const { data, loading, error } = useQuery(GET_FRIEND_REQUESTS, {
    variables: { userId },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  //console.log('Friends data:', data);
  return {
    friendRequests: data?.getFriendRequests.friendships || [],
    isLoading: loading,
    error: error?.message || null
  };
} 

export function useAcceptFriendRequest(userId: number, friendId: number) {
  const { data, loading, error } = useQuery(ACCEPT_FRIEND_REQUEST, {
    variables: { userId, friendId },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  console.log('Friends data:', data);
  return {
    friendRequests: data?.getFriendRequests.friendships || [],
    isLoading: loading,
    error: error?.message || null
  };
} 

export function useGetFriendsLeaderboard(userId: number, sortBy: string) {
  const { data, loading, error } = useQuery(GET_FRIENDS, {
    variables: { userId, sortBy },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  //console.log('Friends data:', data);
  return {
    friends: data?.getFriendships.friendships || [],
    isLoading: loading,
    error: error?.message || null
  };
} 