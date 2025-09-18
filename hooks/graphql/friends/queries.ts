import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/debug/utils';

// Query - Get Friends of User (by User ID)
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
        }
        role
        status
        chat_id
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
    fetchPolicy: 'cache-and-network',
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    const friendships = data?.getFriendships.friendships || [];
    const success = data?.getFriendships.success;
    const errors = data?.getFriendships.errors;
    const friendDetails = friendships.map((friendship: any) => ({
      username: friendship.friend.username,
      status: friendship.status,
      role: friendship.role
    }));
    const friendsString = friendDetails.map((f: any) => `  {username: "${f.username}", status: "${f.status}", role: "${f.role}"}`).join('\n');
    console.log("useGetFriends: success:", success, "errors:", errors?.length > 0 ? errors : null, "friendCount:", friendships.length, "friends:\n" + friendsString);
  }
  return {
    friends: data?.getFriendships.friendships || [],
    fetched: fetched,
    error: error?.message || null
  };
} 

// Query - Get Friends of User (by User ID) with Sorting for Leaderboard
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

export function useGetFriendsLeaderboard(userId: number, sortBy: string, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_FRIENDS_SORTING, {
    skip: !shouldFetch,
    variables: { userId, sortBy },
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    const friendships = data?.getFriendships.friendships || [];
    const success = data?.getFriendships.success;
    const errors = data?.getFriendships.errors;
    console.log("useGetFriendsLeaderboard:", {
      success,
      friendCount: friendships.length,
      sortBy,
      errors: errors?.length > 0 ? errors : null
    });
  }
  return {
    friends: data?.getFriendships.friendships || [],
    fetched: fetched,
    error: error?.message || null
  };
} 

// Query - Get Friends Requests of User (by User ID)
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

export function useGetFriendRequests(userId: number, role: string, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_FRIEND_REQUESTS, {
    skip: !shouldFetch,
    variables: { userId, role: role },
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetFriendRequests", role, "data", data, error ? 'error:' + error : '');
  }
  return {
    friendRequests: data?.getFriendRequests.friendships || [],
    fetched: fetched,
    error: error?.message || null
  };
} 
