import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { router } from 'expo-router';

interface Request {
  id: string;
  first_name: string;
  username: string;
  profile_picture: any;
}

interface RequestsScreenProps {
  loading: boolean;
  friendRequests: any[];
  groupInvites: any[];
}

const RequestsScreen = (props: RequestsScreenProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }
  // Sample data

  const groupInvites: Request[] = [
    { 
      id: '1', 
      first_name: 'Courtney', 
      username: 'username', 
      profile_picture: require('@/assets/images/andrew.png')
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleAddFriend = () => {
    router.push('/chats/addFriends');
  };

  const handleViewProfile = (id: string) => {
    console.log('View profile:', id);
  };

  const handleCancel = (id: string) => {
    console.log('Cancel request:', id);
  };

  const handleAccept = (id: string) => {
    console.log('Accept invitation:', id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Image 
              source={require("@/assets/icons/backArrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Requests</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddFriend}
        >
          <Image 
            source={require("@/assets/icons/addFriend.png")}
            style={styles.addIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Friend Requests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Friend Requests (2)</Text>
          {props.friendRequests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.userInfo}>
                <Image 
                  source={request.profile_picture}
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
                  onPress={() => handleCancel(request.id)}
                >
                  <Image 
                    source={require("@/assets/icons/cancel.png")}
                    style={styles.cancelIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Group Invitations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group Invitations (1)</Text>
          {props.groupInvites.map((invite) => (
            <View key={invite.id} style={styles.requestCard}>
              <View style={styles.userInfo}>
                <Image 
                  source={invite.profileImage}
                  style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{invite.name}</Text>
                  <Text style={styles.username}>{invite.username}</Text>
                </View>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.acceptButton}
                  onPress={() => handleAccept(invite.id)}
                >
                  <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleCancel(invite.id)}
                >
                  <Image 
                    source={require("@/assets/icons/cancel.png")}
                    style={styles.cancelIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 65,
    backgroundColor: '#E0EDFD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
    tintColor: '#DE728D',
  },
});

export default RequestsScreen;
