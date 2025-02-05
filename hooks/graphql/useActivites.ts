import { useQuery } from '@apollo/client';
import { GET_ACTIVITIES } from './constants/activities';

const debug = false;

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
if (debug) {
    console.log("useGetActivities data", data, 
      "skipped", !shouldFetch, 
      "loading", loading, 
      "error", error, 
    );
  }
  return {
    activities: data?.activitiesByUserId.activities || [],
    fetched: shouldFetch && !loading,
    error: error?.message || null,
    refetch
  };
};