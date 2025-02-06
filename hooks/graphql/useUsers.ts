import { useQuery } from '@apollo/client';
import { GET_USER, GET_POINTS, GET_USERS_LEADERBOARD, GET_ALL_USERS } from './constants/users';

import { debugQueries } from '@/constants/debug';
const debug = debugQueries;

export function useGetAllUsers(hasFetched: boolean = true) {
  const { data, loading, error } = useQuery(GET_ALL_USERS, {
    skip: !hasFetched,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  if (debug) {
    console.log("useGetAllUsers data", data, "skipped", !hasFetched, "loading", loading, "error", error);
  }
  return {
    users: data?.users.users || [],
    fetched: hasFetched && !loading,
    error: error?.message || null
  };
}

export function useGetUser(id: number, hasFetched: boolean = true) {
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { id },
    skip: !hasFetched,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = hasFetched && !loading;
  if (debug && fetched) {
    console.log("useGetUser data", data, "error", error);
  }
  return {
    user: data?.user.user || [],
    fetched: fetched,
    error: error?.message || null,
    refetch: refetch
  };
} 



export function useGetUsersLeaderboard(sort_by: string, hasFetched: boolean = true) {
  const { data, loading, error } = useQuery(GET_USERS_LEADERBOARD, {
    variables: { sort_by },
    skip: !hasFetched,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  if (debug) {
    console.log("useGetUsersLeaderboard data", data, "skipped", !hasFetched, "loading", loading, "error", error);
  }
  return {
    users: data?.users.users || [],
    fetched: hasFetched && !loading,
    error: error?.message || null
  };
}

export function useGetPoints(id: number, hasFetched: boolean = true) {
  const { data, loading, error } = useQuery(GET_POINTS, {
    variables: { id },
    skip: !hasFetched,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  if (debug) {
    console.log("useGetPoints data", data, "skipped", !hasFetched, "loading", loading, "error", error);
  }
  return {
    points: data?.getPoint.point || [],
    fetched: hasFetched && !loading,
    error: error?.message || null
  };
}