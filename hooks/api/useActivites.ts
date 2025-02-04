import { useQuery } from '@apollo/client';
import { GET_ACTIVITIES } from '../../services/api/activities';

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
            console.error('GraphQL Error Message:', error.message);
            console.error('GraphQL Network Error:', error.networkError);
            console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
        }
    });
    console.log(userId, "ActivityGraphQL data", data, "skipped", !shouldFetch, "loading", loading);
    return {
        activities: data?.activitiesByUserId.activities || [],
        fetched: shouldFetch && !loading,
        error: error?.message || null,
        refetch
    };
};