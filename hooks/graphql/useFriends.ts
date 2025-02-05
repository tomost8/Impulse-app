import { useQuery } from '@apollo/client';
import { ACCEPT_FRIEND_REQUEST, GET_FRIEND_REQUESTS, GET_FRIENDS, GET_FRIENDS_SORTING } from './constants/friends';

const debug = false;

export function useGetFriends(userId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_FRIENDS, {
    skip: !shouldFetch,
    variables: { userId },
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  if (debug) {
    console.log("useGetFriends data", data, 
        "skipped", !shouldFetch, 
        "loading", loading, 
        "error", error);
  }
  return {
    friends: data?.getFriendships.friendships || [],
    fetched: shouldFetch && !loading,
    error: error?.message || null
  };
} 

export function useGetFriendsLeaderboard(userId: number, sortBy: string, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_FRIENDS_SORTING, {
    skip: !shouldFetch,
    variables: { userId, sortBy },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      
      
      
    }
  });
  if (debug) {
    console.log("useGetFriendsLeaderboard data", data, 
        "skipped", !shouldFetch, 
        "loading", loading, 
        "error", error);
  }
  return {
    friends: data?.getFriendships.friendships || [],
    fetched: shouldFetch && !loading,
    error: error?.message || null
  };
} 

export function useGetFriendRequests(userId: number, role: string, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_FRIEND_REQUESTS, {
    skip: !shouldFetch,
    variables: { userId, role: role },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      
      
      
    }
  });
  if (debug) {
    console.log("useGetFriendRequests data", data, 
        "skipped", !shouldFetch, 
        "loading", loading, 
        "error", error);
  }
  return {
    friendRequests: data?.getFriendRequests.friendships || [],
    fetched: shouldFetch && !loading,
    error: error?.message || null
  };
} 

//mutation
export function useAcceptFriendRequest(userId: number, friendId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(ACCEPT_FRIEND_REQUEST, {
    skip: !shouldFetch,
    variables: { userId, friendId },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      
      
      
    }
  });
  console.log('Friends data:', data);
  return {
    friendRequests: data?.getFriendRequests.friendships || [],
    isLoading: loading,
    error: error?.message || null
  };
} 