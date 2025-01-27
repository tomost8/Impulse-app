import { useMutation, useQuery } from '@apollo/client';
import { CREATE_ACTIVITY } from '../../services/api/activities';

//input: name, description, category, duration, scheduledDatetime, postId, userId
export function createActivity(
    authToken: string,
    userId: number, 
    category: string, 
    scheduledDatetime: string,
    name?: string,
    description?: string,
    duration?: number,
    postId?: number,
) {
  const [createActivity, { data, loading, error }] = useMutation(CREATE_ACTIVITY, {
    context: { 
        headers: { Authorization: `Bearer ${authToken}`}
    },
    variables: { 
        input: { name, description, category, duration, scheduledDatetime, postId, userId } 
    },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  console.log(data);
  return {
    activity: data?.createActivity.activity || [],
    isLoading: loading,
    error: error?.message || null
  };
}