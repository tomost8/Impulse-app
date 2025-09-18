import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/debug/utils';

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
      }
    },
    fetchPolicy: 'network-only' // Always fetch from network, never use cache
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    const activities = data?.activitiesByDate.activities || [];
    const success = data?.activitiesByDate.success;
    const errors = data?.activitiesByDate.errors;
    
    let logMessage = `useGetActivitiesByDate: ${JSON.stringify({
      success,
      activityCount: activities.length,
      date,
      errors: errors?.length > 0 ? errors : null
    })}`;
    
    if (activities.length > 0) {
      const currentTime = new Date().toISOString();
      logMessage += `\nCurrent Time: ${currentTime}`;
      activities.forEach((activity: any, index: number) => {
        const scheduledTime = activity.scheduledDatetime ? new Date(activity.scheduledDatetime).toISOString() : 'N/A';
        const duration = activity.duration ? `${activity.duration} minutes` : 'N/A';
        const endTime = activity.scheduledDatetime && activity.duration ? 
          new Date(new Date(activity.scheduledDatetime).getTime() + activity.duration * 60000).toISOString() : 'N/A';
        const createdAt = activity.createdAt ? new Date(activity.createdAt).toISOString() : 'N/A';
        
        // Calculate different possible expiration times
        const createdAtEndTime = activity.createdAt && activity.duration ? 
          new Date(new Date(activity.createdAt).getTime() + activity.duration * 60000).toISOString() : 'N/A';
        
        // Check if current time is past various expiration points
        const now = new Date();
        const isPastScheduledEnd = endTime !== 'N/A' && now > new Date(endTime);
        const isPastCreatedEnd = createdAtEndTime !== 'N/A' && now > new Date(createdAtEndTime);
        
        logMessage += `\n  Activity ${index + 1}: ID=${activity.id}, Category=${activity.category}, Status=${activity.status}`;
        logMessage += `\n    Created: ${createdAt}, Scheduled: ${scheduledTime}, Duration: ${duration}`;
        logMessage += `\n    Scheduled End: ${endTime}, Created End: ${createdAtEndTime}`;
        logMessage += `\n    Past Scheduled End: ${isPastScheduledEnd}, Past Created End: ${isPastCreatedEnd}`;
      });
    }
    
    console.log(logMessage);
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
      }
    },
    fetchPolicy: 'cache-and-network'
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