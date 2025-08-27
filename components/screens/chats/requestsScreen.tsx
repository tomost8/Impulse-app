import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import Header from "@/components/ui/common/headers/Header";

interface Request {
  id: string;
  first_name: string;
  username: string;
  profile_picture: any;
}

interface GroupInvite {
  id: string;
  title: string;
  profile_pic: any;
}

interface RequestsScreenProps {
  loading: boolean;
  friendRequests: Request[];
  handleRemoveFriendRequest: (friendId: number) => void;
  groupInvites: GroupInvite[];
  handleAcceptGroupInvite: (chatId: number) => void;
  handleRemoveGroupInvite: (chatId: number) => void;
}

const RequestsScreen = (props: RequestsScreenProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }

  // Friend Requests
  const handleAddFriend = () => {
    router.push('/chats/addFriends');
  };
  const handleCancelFriendRequest = (friendId: string) => {
    props.handleRemoveFriendRequest(Number(friendId));
  };
  const handleViewProfile = (id: string) => {
    router.push(`/user/${id}`);
  };

  // Group Invitations
  const handleAccept = (chatId: string) => {
    props.handleAcceptGroupInvite(Number(chatId));
  };
  const handleCancelGroupInvite = (chatId: string) => {
    props.handleRemoveGroupInvite(Number(chatId));
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Requests"
        onBackPress={() => router.back()}
      />

      <ScrollView style={styles.content}>
        {/* Friend Requests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Friend Requests ({props.friendRequests.length})</Text>
          {props.friendRequests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.userInfo}>
                <Image 
                  source={{ uri: request.profile_picture }}
                  style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{request.first_name}</Text>
                  <Text style={styles.username}>{request.username}</Text>
                </View>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.viewProfileButton}
                  onPress={() => handleViewProfile(request.id)}
                >
                  <Text style={styles.viewProfileText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleCancelFriendRequest(request.id)}
                  disabled={props.loading}
                >
                  <Image 
                    source={require("@/assets/icons/cancel.png")}
                    style={[styles.cancelIcon, props.loading && styles.disabledIcon]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Group Invitations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group Invitations ({props.groupInvites.length})</Text>
          {props.groupInvites.map((invite) => (
            <View key={invite.id} style={styles.requestCard}>
              <View style={styles.userInfo}>
                <Image 
                  source={{ uri: invite.profile_pic }}
                  style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{invite.title}</Text>
                  {/* we don't have username for groups (we also don't track person who sent invite)
                  <Text style={styles.username}>{invite.username}</Text>
                  */}
                </View>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.acceptButton}
                  onPress={() => handleAccept(invite.id)}
                  disabled={props.loading}
                >
                  <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleCancelGroupInvite(invite.id)}
                  disabled={props.loading}
                >
                  <Image 
                    source={require("@/assets/icons/cancel.png")}
                    style={[styles.cancelIcon, props.loading && styles.disabledIcon]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#E0EDFD',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#242020',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#242020',
    fontWeight: '600',
    marginLeft: 6,
  },
  addButton: {
    padding: 8,
  },
  addIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#242020',
    paddingLeft: 2,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  requestCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  username: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  viewProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: '#DE728D',
    borderRadius: 100,
  },
  viewProfileText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  acceptButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: '#DE728D',
    borderRadius: 100,
  },
  acceptText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#A4ACBC',
  },
  disabledIcon: {
    opacity: 0.5,
  },
});

export default RequestsScreen;
