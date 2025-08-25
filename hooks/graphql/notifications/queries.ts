import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/debug/utils';

/*
### Query - Get Community Notifications
POST {{baseUrl}}/graphql
Content-Type: application/json
Authorization: Bearer {{authToken}}

{
  "query": "query($communityId: Int!, $limit: Int, $offset: Int) { getCommunityNotifications(communityId: $communityId, limit: $limit, offset: $offset) { success totalCount notifications { id type title content created_at sender { id username profile_picture } recipients { status read_at } } errors { field message } } }",
  "variables": {
    "communityId": 19,
    "limit": 10,
    "offset": 0
  }
}
*/

export const GET_COMMUNITY_NOTIFICATIONS = gql`
  query ($communityId: Int!, $limit: Int, $offset: Int) {
    getCommunityNotifications(communityId: $communityId, limit: $limit, offset: $offset) {
      success
      totalCount
      notifications {
        id
        type
        title
        content
        created_at
        sender {
          id
          username
          profile_picture
        }
        recipients {
          status
          read_at
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetCommunityAnnouncements(communityId: number, authToken: string, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_COMMUNITY_NOTIFICATIONS, {
    variables: { communityId },
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    skip: !shouldFetch,
    onError: (error) => {   
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    const announcements = data?.getCommunityNotifications?.notifications || [];
    console.log("useGetCommunityAnnouncements:", {
      "communityId": communityId,
      "announcementCount": announcements.length,
      "totalCount": data?.getCommunityNotifications?.totalCount,
      "success": data?.getCommunityNotifications?.success,
      "errors": data?.getCommunityNotifications?.errors
    });
  }

  return {
    announcements: data?.getCommunityNotifications?.notifications,
    totalCount: data?.getCommunityNotifications?.totalCount,
    fetched: fetched,
    error: error?.message || null,
  };
}
