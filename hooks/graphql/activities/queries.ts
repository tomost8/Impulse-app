import { useQuery } from '@apollo/client';
import { GET_ACTIVITIES } from './activities';

import { debugQueries } from '@/constants/debug';
const debug = debugQueries;

export const useGetActivities = (userId: number, authToken: string, shouldFetch: boolean = true) => {
  const { data, loading, error, refetch } = useQuery(GET_ACTIVITIES, {
    skip: !shouldFetch,
    variables: { userId },
    context: {
      headers: {
          Authorization: `Bearer ${authToken}`,
      },
    },
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debug && fetched) {
    console.log("useGetActivities data", data, "error", error);
  }
  return {
    activities: data?.activitiesByUserId.activities || [],
    fetched: fetched,
    error: error?.message || null,
    refetch
  };
};