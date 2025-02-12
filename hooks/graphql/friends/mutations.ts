import { gql, useMutation } from '@apollo/client';

// Mutation - Send Friend Request
// input: sender_id/receiver_id
export const SEND_FRIEND_REQUEST = gql`
  mutation ($input: CreateFriendshipInput!) {
    createFriendship(input: $input) {
      success
      friendship {
        user { id first_name last_name }
        friend { id first_name last_name }
        status
      }
      errors { field message }
    }
  }
`;

export function useSendFriendRequest() {
  const [sendFriendRequestMutation] = useMutation(SEND_FRIEND_REQUEST);
  const sendFriendRequest = async (input: any, authToken: string) => {
    try {
      const response = await sendFriendRequestMutation({ 
        variables: { 
          input: input 
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      return response.data.createFriendship;
    } catch (error) {
      console.error('Send Friend Request failed:', error);
      throw error;
    }
  };
  return { sendFriendRequest };
}

// Mutation - Accept Friend Request
export const ACCEPT_FRIEND_REQUEST = gql`
  mutation ($userId: Int!, $friendId: Int!, $input: UpdateFriendshipInput!) {
    updateFriendship(user_id: $userId, friend_id: $friendId, input: $input) {
      success
      friendship {
        user {
          id
          first_name
          last_name
        }
        friend {
          id
          first_name
          last_name
        }
        role
        status
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useAcceptFriendRequest() {
  const [acceptFriendRequestMutation] = useMutation(ACCEPT_FRIEND_REQUEST);
  const acceptFriendRequest = async (userId: number, friendId: number, input: any, authToken: string) => {
    try {
      const response = await acceptFriendRequestMutation({ 
        variables: { 
          userId: userId,
          friendId: friendId,
          input: input
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      return response.data.updateFriendship;
    } catch (error) {
      console.error('Accept Friend Request failed:', error);
      throw error;
    }
  };
  return { acceptFriendRequest };
}

// Mutation - Delete Friendship
export const DELETE_FRIENDSHIP = gql`
  mutation ($userId: Int!, $friendId: Int!) {
    deleteFriendship(user_id: $userId, friend_id: $friendId) {
      success
      errors {
        field
        message
      }
    }
  }
`;

export function useDeleteFriendship() {
  const [deleteFriendshipMutation] = useMutation(DELETE_FRIENDSHIP);
  const deleteFriendship = async (userId: number, friendId: number, authToken: string) => {
    try {
      const response = await deleteFriendshipMutation({ 
        variables: { 
          userId: userId,
          friendId: friendId,
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      return response.data.deleteFriendship;
    } catch (error) {
      console.error('Delete Friendship failed:', error);
      throw error;
    }
  };
  return { deleteFriendship };
}