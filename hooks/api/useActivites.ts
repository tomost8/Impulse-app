import { useQuery } from '@apollo/client';
import { GET_ACTIVITIES } from '../../services/api/activities';

export const useGetActivities = (userId: number, authToken: string) => {
    const { data, loading, error } = useQuery(GET_ACTIVITIES, {
        variables: { userId },
        context: {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        },
        onError: (error) => {
            console.error('GraphQL Error:', error);
            console.error('GraphQL Error Message:', error.message);
            console.error('GraphQL Network Error:', error.networkError);
            console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
        }
    });
    //console.log(data);
    return {
        activities: data?.activitiesByUserId.activities || [],
        isLoading: loading,
        error: error?.message || null
    };
};