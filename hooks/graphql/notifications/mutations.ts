import { gql, useMutation } from '@apollo/client';

/*
    "input": {
      "title": "One-time Reminder",
      "content": "This is one-time reminder!",
      "type": "REMINDER",
      "schedule_type": "ONCE",
      "schedule_time": "2025-01-20T23:31:00.000Z"
        }
*/
export const CREATE_REMINDER = gql`
  mutation ($input: CreateNotificationInput!) {
    createReminder(input: $input)
  } 
`;

export function useCreateReminder() {
  const [createReminderMutation] = useMutation(CREATE_REMINDER);
  const createReminder = async (input: any, authToken: string) => {
    try {
      const response = await createReminderMutation({
        variables: {
          input: input
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      return response.data.createReminder;
    } catch (error) {
      console.error('Create Reminder failed:', error);
      throw error;
    }
  };
  return { createReminder };    
}

/*
### Mutation - Send Broadcast Notification
POST {{baseUrl}}/graphql
Content-Type: application/json
Authorization: Bearer {{authToken}}

{
  "query": "mutation($input: CreateNotificationInput!) { sendBroadcastNotification(input: $input) }",
  "variables": {
    "input": {
      "title": "Important Broadcast",
      "content": "This is a test broadcast notification",
      "type": "ADMIN_BROADCAST",
      "sender_id": 1
    }
  }
}
*/

export const SEND_BROADCAST_NOTIFICATION = gql`
  mutation ($input: CreateNotificationInput!) {
    sendBroadcastNotification(input: $input)
  }
`;

export function useSendBroadcastNotification() {
  const [sendBroadcastNotificationMutation] = useMutation(SEND_BROADCAST_NOTIFICATION);
  const sendBroadcastNotification = async (input: any, authToken: string) => {
    try {
      const response = await sendBroadcastNotificationMutation({
        variables: {
          input: input
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      return response.data.sendBroadcastNotification;
    } catch (error) {
      console.error('Send Broadcast Notification failed:', error);
      throw error;
    }
  };
  return { sendBroadcastNotification };
}

/*
### Mutation - Send Community Notification
POST {{baseUrl}}/graphql
Content-Type: application/json
Authorization: Bearer {{authToken}}

{
  "query": "mutation($input: CreateNotificationInput!, $communityId: Int!) { sendCommunityNotification(input: $input, communityId: $communityId) }",
  "variables": {
    "communityId": 1,
    "input": {
      "title": "Community Update",
      "content": "This is a test community notification",
      "type": "COMMUNITY_NOTICE"
    }
  }
}
*/

export const SEND_COMMUNITY_NOTIFICATION = gql`
  mutation ($input: CreateNotificationInput!, $communityId: Int!) {
    sendCommunityNotification(input: $input, communityId: $communityId)
  } 
`;

export function useSendCommunityNotification() {
  const [sendCommunityNotificationMutation] = useMutation(SEND_COMMUNITY_NOTIFICATION);
  const sendCommunityNotification = async (input: any, communityId: number, authToken: string) => {
    try {
      const response = await sendCommunityNotificationMutation({
        variables: {
          input: input,
          communityId: communityId
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      return response.data.sendCommunityNotification;
    } catch (error) {
      console.error('Send Community Notification failed:', error);
      throw error;
    }
  };
  return { sendCommunityNotification };
}