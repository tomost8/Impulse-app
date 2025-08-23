import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/utils/debug';

export const GET_ACTIVITIES_BY_DATE = gql`
  query ActivitiesByDate($userId: Int!, $date: String!) {
    activitiesByDate(userId: $userId, date: $date) {
      success
      activities {
        id
        category
        description
        duration
        scheduledDatetime
        status
        createdAt
      }
      errors {
        field
        message
      }
    }
  }
`;

export const useGetActivitiesByDate = (userId: number, date: string, authToken: string, shouldFetch: boolean=true) => {
  const { data, loading, error } = useQuery(GET_ACTIVITIES_BY_DATE, {
    skip: !shouldFetch,
    variables: { userId, date },
    context: {
      headers: {
          Authorization: `Bearer ${authToken}`,
      },
    },
    fetchPolicy: 'network-only', // Always fetch from network, never use cache
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    const activities = data?.activitiesByDate.activities || [];
    const success = data?.activitiesByDate.success;
    const errors = data?.activitiesByDate.errors;
    console.log("useGetActivitiesByDate:", {
      success,
      activityCount: activities.length,
      date,
      userId,
      errors: errors?.length > 0 ? errors : null,
      hasError: !!error
    });
  }
  return {
    activities: data?.activitiesByDate.activities || [],
    fetched: fetched,
    error: error?.message || null
  };
}

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
        createdAt
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