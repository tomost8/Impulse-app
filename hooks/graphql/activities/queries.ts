import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/constants/debug';

// Query - Get Activities (by User ID)
export const GET_ACTIVITIES = gql`
  query ($userId: Int!) {
    activitiesByUserId(userId: $userId) {
      success
      activities {
        id
        name
        category
        description
        duration
        scheduledDatetime
        status
      }
    }
  }
`;

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
  if (debugQueries && fetched) {
    console.log("useGetActivities data", data, error ? 'error:' + error : '');
  }
  return {
    activities: data?.activitiesByUserId.activities || [],
    fetched: fetched,
    error: error?.message || null,
    refetch
  };
};