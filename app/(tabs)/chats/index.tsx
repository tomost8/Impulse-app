import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { Ionicons } from '@expo/vector-icons';
// GraphQL hooks

// Components
import ChatScreen from '@/components/screens/tabs/ChatsScreen';
// Debug
import { pageDisplay, debugRenders } from '@/debug/utils';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';

const { width: screenWidth } = Dimensions.get('window');

// function ChatScreen({
//   chats,
//   isChatsLoading,
//   friendRequests,
//   isFriendRequestsLoading,
//   sentRequests,
//   isSentRequestsLoading,
//   handleAcceptFriendRequest,
//   isAcceptingFriendRequest
// }: {
//   chats: any,
//   isChatsLoading: boolean,
//   friendRequests: any,
//   isFriendRequestsLoading: boolean,
//   sentRequests: any,
//   isSentRequestsLoading: boolean,
//   handleAcceptFriendRequest: (friendId: number) => void,
//   isAcceptingFriendRequest: boolean,
// }) {
//   if (isChatsLoading || isFriendRequestsLoading || isSentRequestsLoading || isAcceptingFriendRequest) {
//     return <Text>Loading...</Text>;
//   }

//   const [activeTab, setActiveTab] = useState<'chats' | 'communities' | 'requests'>('chats');

//   return (
//     <View style={styles.container}>
//       {/* 状态栏 */}
//       <StatusBar barStyle="dark-content" backgroundColor="#f0f6ff" />
      
//       {/* 顶部栏 */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           {/* 左侧留空 */}
//         </View>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.headerIcon}>
//             <Ionicons name="search" size={24} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerIcon}>
//             <Ionicons name="person-add" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>
//       </View>
      
//       {/* 标签栏 */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity 
//           style={[styles.tabButton, activeTab === 'chats' && styles.activeTab]} 
//           onPress={() => setActiveTab('chats')}
//         >
//           <Text style={[styles.tabText, activeTab === 'chats' && styles.activeTabText]}>Chats</Text>
//           {activeTab === 'chats' && <View style={styles.activeIndicator} />}
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[styles.tabButton, activeTab === 'communities' && styles.activeTab]} 
//           onPress={() => setActiveTab('communities')}
//         >
//           <Text style={[styles.tabText, activeTab === 'communities' && styles.activeTabText]}>Communities</Text>
//           {activeTab === 'communities' && <View style={styles.activeIndicator} />}
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[styles.tabButton, activeTab === 'requests' && styles.activeTab]} 
//           onPress={() => setActiveTab('requests')}
//         >
//           <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>Requests</Text>
//           {activeTab === 'requests' && <View style={styles.activeIndicator} />}
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.scrollView}>
//         {activeTab === 'chats' && (
//           <View>
//             {chats.filter((chat: any) => chat.status === 'ACCEPTED').map((chat: any) => (
//               <TouchableOpacity
//                 key={`chat-${chat.chat.id}`}
//                 style={styles.chatItem}
//                 onPress={() => router.push(`/chats/${chat.chat.id}`)}
//               >
//                 <Image source={{ uri: chat.chat.profile_pic }} style={styles.avatar} />
//                 <View style={styles.chatInfo}>
//                   <View style={styles.chatHeader}>
//                     <Text style={styles.chatName}>{chat.chat.title}</Text>
//                     <Text style={styles.timeText}>{chat.last_message_time || '49 days ago'}</Text>
//                   </View>
//                   <View style={styles.messageContainer}>
//                     <Text style={styles.messagePreview} numberOfLines={1}>
//                       {chat.chat.type === 'GROUP' ? 'Wiselyy: ' : ''} 
//                       {chat.last_message || 'No message yet'}
//                     </Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}

//         {activeTab === 'communities' && (
//           <View style={styles.emptyState}>
//             <Text style={styles.emptyStateText}>Communities coming soon</Text>
//           </View>
//         )}

//         {activeTab === 'requests' && (
//           <View>
//             <Text style={styles.sectionTitle}>Received Requests</Text>
//             {friendRequests.length > 0 ? (
//               friendRequests.map((friendRequest: any) => (
//                 <View key={`request-${friendRequest.friend.id}`} style={styles.requestItem}>
//                   <Image source={{ uri: friendRequest.friend.profile_picture }} style={styles.avatar} />
//                   <View style={styles.requestInfo}>
//                     <Text style={styles.requestName}>
//                       {friendRequest.friend.first_name} {friendRequest.friend.last_name}
//                     </Text>
//                     <TouchableOpacity 
//                       onPress={() => handleAcceptFriendRequest(friendRequest.friend.id)} 
//                       style={styles.acceptButton}
//                     >
//                       <Text style={styles.acceptButtonText}>Accept</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.noRequestsText}>No friend requests</Text>
//             )}

//             <Text style={styles.sectionTitle}>Sent Requests</Text>
//             {sentRequests.length > 0 ? (
//               sentRequests.map((friendRequest: any) => (
//                 <View key={`sent-${friendRequest.friend.id}`} style={styles.requestItem}>
//                   <Image source={{ uri: friendRequest.friend.profile_picture }} style={styles.avatar} />
//                   <View style={styles.requestInfo}>
//                     <Text style={styles.requestName}>
//                       {friendRequest.friend.first_name} {friendRequest.friend.last_name}
//                     </Text>
//                     <Text style={styles.pendingText}>Pending</Text>
//                   </View>
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.noRequestsText}>No sent requests</Text>
//             )}
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

const ChatPage = () => {
  const { fetching, chats, friends } = useDataProvider();

  // Queries (maybe for messages)

  // Display Chat Info
  const acceptedChats = chats.filter((chat: any) => chat.status === 'ACCEPTED').map((chat: any) => chat.chat);
  const chatInfo = acceptedChats.map((chat: any) => {
    if (chat.type === 'group') {
      return chat;
    } else if (chat.type === 'direct') {
      const matchingFriend = friends.find(friend => friend.chat_id === chat.id);
      const directChatInfo = {
        id: chat.id,
        type: 'direct',
        title: matchingFriend ? matchingFriend.friend.username : chat.title,
        profile_pic: matchingFriend ? matchingFriend.friend.profile_picture : null
      };
      return directChatInfo;
    }
    return chat.chat; // fallback case
  });

  // Display Request Count
  const friendRequests = friends.filter((friend: any) => friend.status === 'PENDING' && friend.role === 'receiver').map((friend: any) => friend.friend);
  const groupInvites = chats.filter((chat: any) => chat.status === 'PENDING');
  const requestCount = friendRequests.length + groupInvites.length;

  // Debug
  const loading = fetching;
  if (debugRenders && !loading) {
    console.log("Rendering ChatScreen\n",
      "Chats:", chats, "\n",
      "Friends:", friends, "\n",
      "Chat Info:", chatInfo, "\n",
    );
  }

  if (pageDisplay) {
    return <ChatScreen 
      loading={loading}
      chats={chatInfo}
      requestCount={requestCount}
    />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40, // 增加顶部留白
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: '#f0f6ff',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 2,
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 14,
    color: '#888',
  },
  messageContainer: {
    flexDirection: 'row',
  },
  messagePreview: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  requestItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  requestInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestName: {
    fontSize: 16,
    fontWeight: '500',
  },
  acceptButton: {
    backgroundColor: '#e75480',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  acceptButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  pendingText: {
    color: '#888',
    fontSize: 14,
  },
  noRequestsText: {
    padding: 15,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default AuthWrapper(ChatPage);
