import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/constants/debug';
const debug = debugQueries;


// Query - Get Friends by User ID
export const GET_FRIENDS = gql`
    query ($userId: Int!) {
        getFriendships(id: $userId) {
            success
            friendships {
                friend {
                    id
                    first_name
                    last_name
                    username
                    profile_picture
                    email
                    point {
                        points
                        spending_points
                        weekly_points
                        monthly_points
                    }
                }
                role
                status
            }
            errors {
                field
                message
            }
        }
    }
`;

// Query - Get Friends by User ID with Sorting for Leaderboard
export const GET_FRIENDS_SORTING = gql`
    query ($userId: Int!, $sortBy: UserSortType!) {
        getFriendships(id: $userId, sort_by: $sortBy) {
            success
            friendships {
                friend {
                    id
                    username
                    profile_picture
                    point {
                        points
                        spending_points
                        weekly_points
                        monthly_points
                    }
                }
            }
            errors {
                field
                message
            }
        }
    }
`;

// Query - Get Friends Requests by User ID
export const GET_FRIEND_REQUESTS = gql`
    query ($userId: Int!, $role: String!) {
        getFriendRequests(id: $userId, role: $role) {
            success
            friendships {
                friend {
                    id
                    first_name
                    last_name
                    email
                }
                role
                status
            }
            errors {
                field
                message
            }
        }
    }
`;



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
  const fetched = shouldFetch && !loading;
  if (debug && fetched) {
    console.log("useGetFriendsLeaderboard data", data, "error", error);
  }
  return {
    friends: data?.getFriendships.friendships || [],
    fetched: fetched,
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
