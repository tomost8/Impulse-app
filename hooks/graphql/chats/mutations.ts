import { gql, useMutation } from '@apollo/client';

//"query": "mutation ($input: CreateChatInput!) { createChat(input: $input) { success chat { id type title password profile_pic creator { id first_name last_name email } } errors { field message } } }",
//input: type/title/creator_id
export const CREATE_GROUP = gql`
  mutation ($input: CreateChatInput!) {
    createChat(input: $input) {
      success
      chat { id type title password profile_pic creator { id first_name last_name email } }
      errors { field message }
    }
  }
`;

export function useCreateGroup() {
  const [createGroupMutation] = useMutation(CREATE_GROUP);
  const createGroup = async (input: any) => {
    try {
      const response = await createGroupMutation({ 
        variables: { 
          input: input
        }
      });
      return response.data.createChat;
    } catch (error) {
      console.error('Create Group failed:', error);
      throw error;
    }
  };
  return { createGroup };
}

// Mutation - Invite User to Chat (default status: PENDING)
// input: chat_id/user_id
export const CREATE_CHAT_MEMBER = gql`
  mutation ($input: CreateChatMemberInput!) {
    createChatMember(input: $input) {
      success
      chat_member { 
        chat { id type title creator { id first_name last_name email } } 
        user { id first_name last_name email } 
        role 
        status 
      }
      errors { field message }
    }
  }
`;

export function useCreateChatMember() {
  const [createChatMemberMutation] = useMutation(CREATE_CHAT_MEMBER);
  const createChatMember = async (input: any) => {
    try {
      const response = await createChatMemberMutation({ 
        variables: { 
          input: input
        }
      });
      return response.data.createChatMember;
    } catch (error) {
      console.error('Create Chat Member failed:', error);
      throw error;
    }
  };
  return { createChatMember };
}

// Mutation - Update Chat Member
// input: chat_id/user_id/role/status
export const UPDATE_CHAT_MEMBER = gql`
  mutation ($input: UpdateChatMemberInput!, $userId: Int!, $chatId: Int!) {
    updateChatMember(input: $input, user_id: $userId, chat_id: $chatId) {
      success
      chat_member {
        chat_id
        user_id
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

export function useUpdateChatMember() {
  const [updateChatMemberMutation] = useMutation(UPDATE_CHAT_MEMBER);
  const updateChatMember = async (input: any, userId: number, chatId: number) => {
    try {
      const response = await updateChatMemberMutation({
        variables: {
          input: input,
          userId: userId,
          chatId: chatId
        }
      });
      return response.data.updateChatMember;
    } catch (error) {
      console.error('Update Chat Member failed:', error);
      throw error;
    }
  };
  return { updateChatMember };
}

// Mutation - Delete Chat Member
// input: user_id/chat_id
export const DELETE_CHAT_MEMBER = gql`
  mutation ($userId: Int!, $chatId: Int!) {
    deleteChatMember(user_id: $userId, chat_id: $chatId) {
      success
      errors {
        field
        message
      }
    }
  }
`;

export function useDeleteChatMember() {
  const [deleteChatMemberMutation] = useMutation(DELETE_CHAT_MEMBER);
  const deleteChatMember = async (userId: number, chatId: number) => {
    try {
      const response = await deleteChatMemberMutation({
        variables: {
          userId: userId,
          chatId: chatId
        }
      });
      return response.data.deleteChatMember;
    } catch (error) {
      console.error('Delete Chat Member failed:', error);
      throw error;
    }
  };
  return { deleteChatMember };
}

// Mutation - Send Message
export const SEND_MESSAGE = gql`
  mutation ($input: CreateMessageInput!) {
    createMessage(input: $input) {
      success
      message {
        id
        chat_id
        sender_id
        content
        post_id
        created_at
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useSendMessage() {
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const sendMessage = async (input: any) => {
    try {
      const response = await sendMessageMutation({ 
        variables: { 
          input: input
        }
      });
      return response.data.createMessage;
    } catch (error) {
      console.error('Send Message failed:', error);
      throw error;
    }
  };
  return { sendMessage };
}
