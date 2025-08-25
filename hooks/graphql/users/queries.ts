import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/debug/utils';

// Query - Get All Users
export const GET_ALL_USERS = gql`
  query {
    users {
      success
      users { id first_name last_name username profile_picture }
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
        age
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
        is_double_cam
        point {
          points
          spending_points
          weekly_points
          monthly_points
        }
        login_streak {
          streak_count
          weekly_logins
          formatted_weekly_logins {
            label
            completed
          }
          last_login_date
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
    const user = data?.user.user;
    const success = data?.user.success;
    const errors = data?.user.errors;
    console.log("useGetUser:", {
      success,
      errors: errors?.length > 0 ? errors : null,
      userId: user?.id,
      name: `${user?.first_name} ${user?.last_name}`,
      email: user?.email,
      username: user?.username,
      primaryGoal: user?.primary_goal,
      secondaryGoal: user?.secondary_goal,
      timezone: user?.timezone
    });
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