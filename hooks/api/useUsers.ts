import { useQuery } from '@apollo/client';
import { GET_USER, GET_POINTS, GET_USERS_LEADERBOARD, GET_ALL_USERS } from '../../graphql/constants/users';

const debug = false;

export function useGetAllUsers(hasFetched: boolean = true) {
  const { data, loading, error } = useQuery(GET_ALL_USERS, {
    skip: !hasFetched,
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
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
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id },
    skip: !hasFetched,
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  if (debug) {
    console.log("useGetUser data", data, "skipped", !hasFetched, "loading", loading, "error", error);
  }
  return {
    user: data?.user.user || [],
    fetched: hasFetched && !loading,
    error: error?.message || null
  };
} 



export function useGetUsersLeaderboard(sort_by: string, hasFetched: boolean = true) {
  const { data, loading, error } = useQuery(GET_USERS_LEADERBOARD, {
    variables: { sort_by },
    skip: !hasFetched,
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
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
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
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