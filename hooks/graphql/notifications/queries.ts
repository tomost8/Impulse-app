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
    
    // Log detailed announcement data
    let announcementDetails = "";
    if (announcements.length > 0) {
      announcements.forEach((announcement: any, index: number) => {
        announcementDetails += `\n  - Announcement ${index + 1}: ${JSON.stringify({
          id: announcement.id,
          title: announcement.title,
          content: announcement.content,
          created_at: announcement.created_at,
          type: announcement.type,
          sender_id: announcement.sender?.id,
          sender_username: announcement.sender?.username,
          sender_profile_picture: !!announcement.sender?.profile_picture
        })}`;
      });
    }
    console.log(`useGetCommunityAnnouncements - Community ID: ${communityId}, Count: ${announcements.length}, Total: ${data?.getCommunityNotifications?.totalCount}, Success: ${data?.getCommunityNotifications?.success}${announcementDetails}`);
  }

  return {
    announcements: data?.getCommunityNotifications?.notifications,
    totalCount: data?.getCommunityNotifications?.totalCount,
    fetched: fetched,
    error: error?.message || null,
  };
}
