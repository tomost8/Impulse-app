import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/constants/debug';

// Query - Get All Users
export const GET_ALL_USERS = gql`
  query {
    users {
      success
      users { id email firebase_uid first_name last_name username gender role status searchable last_login_at created_at updated_at }
      errors { field message }
    }
  }
`;

export function useGetAllUsers(hasFetched: boolean = true) {
  const { data, loading, error } = useQuery(GET_ALL_USERS, {
    skip: !hasFetched,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = hasFetched && !loading;
  if (debugQueries && fetched) {
    console.log("useGetAllUsers data", data, error ? 'error:' + error : '');
  }
  return {
    users: data?.users.users || [],
    fetched: fetched,
    error: error?.message || null
  };
}

// Query - Get User (by User ID)
export const GET_USER = gql`
  query ($id: Int!) {
    user(id: $id) {
      success
      user {
        id
        email
        firebase_uid
        first_name
        last_name
        username
        gender
        bio
        primary_goal
        secondary_goal
        profile_picture
        role
        status
        timezone
        searchable
        last_login_at
        point {
          points
          spending_points
          weekly_points
          monthly_points
        }
      }
      errors { field message }
    }
  }
`; 

export function useGetUser(id: number, hasFetched: boolean = true) {
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { id },
    skip: !hasFetched,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = hasFetched && !loading;
  if (debugQueries && fetched) {
    console.log("useGetUser data", data, error ? 'error:' + error : '');
  }
  return {
    user: data?.user.user || [],
    fetched: fetched,
    error: error?.message || null,
    refetch: refetch
  };
} 

// Query - Get Leaderboard for all Users
export const GET_USERS_LEADERBOARD = gql`
  query ($sort_by: UserSortType!) {
    users(sort_by: $sort_by) {
      success
      users {
        id
        firebase_uid
        first_name
        last_name
        username
        profile_picture
        point {
          points
          spending_points
          weekly_points
          monthly_points
        }
      }
      errors { field message }
    }
  }
`; 

export function useGetUsersLeaderboard(sort_by: string, hasFetched: boolean = true) {
  const { data, loading, error } = useQuery(GET_USERS_LEADERBOARD, {
    variables: { sort_by },
    skip: !hasFetched,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = hasFetched && !loading;
  if (debugQueries && fetched) {
    console.log("useGetUsersLeaderboard data", data, error ? 'error:' + error : '');
  }
  return {
    users: data?.users.users || [],
    fetched: fetched,
    error: error?.message || null
  };
}