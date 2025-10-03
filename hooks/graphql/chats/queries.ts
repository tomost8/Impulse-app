import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/debug/utils';

// Query - Get All Chats
export const GET_ALL_CHATS = gql`
  query {
    getAllChats {
      success
      chats { id type title password profile_pic creator { first_name last_name email } creator_id updated_at }
      errors { field message }
    }
  }
`;

export function useGetAllChats(shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_ALL_CHATS, {
    skip: !shouldFetch,
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetAllChats data", data, error ? 'error:' + error : '');
  }
  return {
    chats: data?.getAllChats.chats || [],
    fetched: fetched,
    error: error?.message || null
  };
}

// Query - Get Chat (by Chat ID)
export const GET_CHAT = gql`
  query ($id: Int!) {
    getChat(id: $id) {
      success
      chat {
        id
        type
        title
        password
        profile_pic
        creator {
          id
          first_name
          last_name
          email
        }
        creator_id
      }
      errors {
        field
        message
      }
    }
  }
`; 

export function useGetChat(id: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_CHAT, {
    variables: { id },
    skip: !shouldFetch,
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetChat data", data, error ? 'error:' + error : '');
  }
  return {
    chat: data?.getChat.chat || [],
    fetched: fetched,
    error: error?.message || null
  };
}


// Query - Get User Chats by User ID
export const GET_USER_CHATS = gql`
  query ($userId: Int!) {
    getUserChats(id: $userId) {
      success
      chat_members {
        chat { id type title profile_pic updated_at }
        role
        status
      }
      errors { field message }
    }
  }
`;

export function useGetUserChats(userId: number, shouldFetch: boolean=true, shouldUseCache: boolean=false) {
  const { data, loading, error } = useQuery(GET_USER_CHATS, {
    skip: !shouldFetch,
    variables: { userId },
    fetchPolicy: shouldUseCache ? 'cache-first' : 'network-only'
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    const chatMembers = data?.getUserChats.chat_members || [];
    const success = data?.getUserChats.success;
    const errors = data?.getUserChats.errors;
    const chatDetails = chatMembers.map((member: any) => ({
      chatId: member.chat.id,
      chatTitle: member.chat.title || (member.chat.type === 'direct' ? 'null (Direct Chat)' : 'Untitled Group'),
      chatType: member.chat.type,
      role: member.role,
      status: member.status,
      updatedAt: member.chat.updated_at
    }));
    const chatsString = chatDetails.map((c: any) => `  {chatId: ${c.chatId}, chatTitle: "${c.chatTitle}", chatType: "${c.chatType}", role: "${c.role}", updatedAt: "${c.updatedAt}"}`).join('\n');
    console.log("useGetUserChats: success:", success, "errors:", errors?.length > 0 ? errors : null, "chatCount:", chatMembers.length, "chats:\n" + chatsString);
  }
  return {
    chatMembers: data?.getUserChats.chat_members || [],
    fetched: fetched,
    error: error?.message || null
  };
} 

// Query - Get Chat Members (for Chat with ID of chatId)
export const GET_CHAT_MEMBERS = gql`
  query ($chatId: Int!) {
    getChatMembers(id: $chatId) {
      success
      chat_members { user { id first_name last_name username profile_picture } role status }
      errors { field message }
    }
  }
`;

export function useGetChatMembers(chatId: number, shouldFetch: boolean=true) {
  const { data, loading, error } = useQuery(GET_CHAT_MEMBERS, {
    variables: { chatId },
    skip: !shouldFetch,
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    const chatMembers = data?.getChatMembers.chat_members || [];
    const success = data?.getChatMembers.success;
    const errors = data?.getChatMembers.errors;
    const memberDetails = chatMembers.map((member: any) => ({
      userId: member.user.id,
      username: member.user.username,
      firstName: member.user.first_name,
      lastName: member.user.last_name,
      role: member.role,
      status: member.status
    }));
    const membersString = memberDetails.map((m: any) => `  {userId: ${m.userId}, username: "${m.username}", name: "${m.firstName} ${m.lastName}", role: "${m.role}", status: "${m.status}"}`).join('\n');
    console.log("useGetChatMembers: success:", success, "errors:", errors?.length > 0 ? errors : null, "memberCount:", chatMembers.length, "chatId:", chatId, "members:\n" + membersString);
  }
  return {
    chatMembers: data?.getChatMembers.chat_members || [],
    fetched: fetched,
    error: error?.message || null
  };
}

// Query - Get Chat Members Sorted (by sortBy for Chat with ID of chatId)
export const GET_CHAT_MEMBERS_SORTED = gql`
  query ($chatId: Int!, $sortBy: UserSortType!) {
    getChatMembers(id: $chatId, sort_by: $sortBy) {
      success
      chat_members {
        user {
          id
          first_name
          last_name
          username
          profile_picture
          point {
            points
            spending_points
            weekly_points
            monthly_points
          }
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

export function useGetGroupLeaderboard(chatId: number, sortBy: string, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_CHAT_MEMBERS_SORTED, {
    variables: { chatId, sortBy },
    skip: !shouldFetch,
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetGroupLeaderboard data", data, error ? 'error:' + error : '');
  }
  return {
    chatMembers: data?.getChatMembers.chat_members || [],
    fetched: fetched,
    error: error?.message || null
  };
}

// Query - Get Messages (by Chat ID)
export const GET_MESSAGES = gql`
  query ($chatId: Int!) {
    getMessages(id: $chatId) {
      success
      messages {
        id
        sender {
          id
          first_name
          last_name
          profile_picture
        }
        content
        post {
          id
          caption
          mediaUrls
        }
        created_at
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetMessages(chatId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { chatId },
    skip: !shouldFetch,
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetMessages data", data, error ? 'error:' + error : '');
  }
  return {
    messages: data?.getMessages.messages || [],
    fetched: fetched,
    error: error?.message || null
  };
}

const GET_LATEST_MESSAGES_FOR_USER = gql`
  query getLatestMessagesForUser($userId: Int!) {
    getLatestMessagesForUser(userId: $userId) {
      success
      messages {
        id
        chat_id
        content
        created_at
        sender {
          id
          first_name
          last_name
          profile_picture
        }
        chat { id type title profile_pic updated_at }
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetLatestMessagesForUser(userId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_LATEST_MESSAGES_FOR_USER, {
    variables: { userId },
    skip: !shouldFetch,
    fetchPolicy: 'network-only'
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    const messages = data?.getLatestMessagesForUser.messages || [];
    const success = data?.getLatestMessagesForUser.success;
    const errors = data?.getLatestMessagesForUser.errors;
    const messageDetails = messages.map((message: any) => ({
      messageId: message.id,
      chatId: message.chat_id,
      content: message.content,
      senderName: `${message.sender.first_name} ${message.sender.last_name}`,
      chatTitle: message.chat.title || (message.chat.type === 'direct' ? 'null (Direct Chat)' : 'Untitled Group'),
      chatType: message.chat.type,
      createdAt: message.created_at,
      chatUpdatedAt: message.chat.updated_at
    }));
    const messagesString = messageDetails.map((m: any) => `  {messageId: ${m.messageId}, chatId: ${m.chatId}, content: "${m.content}", sender: "${m.senderName}", chatTitle: "${m.chatTitle}", chatType: "${m.chatType}", createdAt: "${m.createdAt}", chatUpdatedAt: "${m.chatUpdatedAt}"}`).join('\n');
    console.log("useGetLatestMessagesForUser: success:", success, "errors:", errors?.length > 0 ? errors : null, "messageCount:", messages.length, "messages:\n" + messagesString);
  }
  return {
    messages: data?.getLatestMessagesForUser.messages || [],
    success: data?.getLatestMessagesForUser.success ?? false,
    errors: data?.getLatestMessagesForUser.errors || [],
    fetched,
    loading,
    error: error?.message || null
  };
}