import { useQuery } from '@apollo/client';
import { GET_USER, GET_POINTS, GET_USERS_LEADERBOARD } from '../../services/api/users';

export function useGetUser(id: number) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });

  return {
    user: data?.user.user || [],
    isLoading: loading,
    error: error?.message || null
  };
} 

export function useGetUsersLeaderboard(sort_by: string) {
  const { data, loading, error } = useQuery(GET_USERS_LEADERBOARD, {
    variables: { sort_by },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  //console.log(data);
  return {
    users: data?.users.users || [],
    isLoading: loading,
    error: error?.message || null
  };
}

export function useGetPoints(id: number) {
  const { data, loading, error } = useQuery(GET_POINTS, {
    variables: { id },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  return {
    points: data?.getPoint.point || [],
    isLoading: loading,
    error: error?.message || null
  };
}