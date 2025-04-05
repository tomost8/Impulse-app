import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Keyboard
} from 'react-native';
import { router } from 'expo-router';
import InviteSentPopup from './invitesentpopup';

interface Friend {
  id: string;
  name: string;
  username: string;
  profile_picture: any;
  isInvited: boolean;
}

interface InviteToGroupProps {
  loading: boolean;
  friends: Friend[];
  members: any[];
  handleInvite: (friendId: number) => void;
}

const InviteToGroupScreen = (props: InviteToGroupProps) => {
  if (props.loading) {
    return (
      <Text>Loading...</Text>
    );
  }
  
  // Friends can be invited, not invited, or member (which we don't display)
  const invitedFriends = props.friends.filter(friend => 
    props.members.some(member => 
      member.user.id === friend.id && member.status === 'PENDING'
    )
  );

  const nonInvitedFriends = props.friends.filter(friend => 
    !props.members.some(member => 
      member.user.id === friend.id
    )
  );

  const friends = [
    ...invitedFriends.map(friend => ({ ...friend, isInvited: true })),
    ...nonInvitedFriends.map(friend => ({ ...friend, isInvited: false }))
  ]

  console.log("Friends:", friends);

  // Search Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    Keyboard.dismiss();
  };
  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Invite Handling
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [pendingInviteId, setPendingInviteId] = useState<string | null>(null);

  const handleInviteClick = (friendId: string) => {
    setPendingInviteId(friendId);
    console.log("Clicking invite for friend ID:", friendId);
    props.handleInvite(Number(friendId));
    setIsInviteModalVisible(true);
  };

  const handleInviteSentClose = () => {
    setIsInviteModalVisible(false);
    setPendingInviteId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image 
            source={require("@/assets/icons/backArrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Invite a friend to the group</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image 
          source={require("@/assets/icons/search.png")}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search username"
          placeholderTextColor="#979797"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Friends List */}
      <ScrollView style={styles.friendsList}>
        {filteredFriends.map((friend) => (
          <View key={friend.id} style={styles.friendCard}>
            <View style={styles.friendInfo}>
              <Image 
                source={friend.profile_picture}
                style={styles.profileImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{friend.name}</Text>
                <Text style={styles.username}>{friend.username}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[
                styles.inviteButton,
                friend.isInvited && styles.invitedButton
              ]}
              onPress={() => handleInviteClick(friend.id)}
              disabled={friend.isInvited}
            >
              <Text style={[
                styles.inviteButtonText,
                friend.isInvited && styles.invitedButtonText
              ]}>
                {friend.isInvited ? 'Invited' : 'Send Invite'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <InviteSentPopup
        isVisible={isInviteModalVisible}
        onClose={handleInviteSentClose}
      />
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
    paddingHorizontal: 16,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 100,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#979797',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
  },
  friendsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  friendCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  friendInfo: {
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
  inviteButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: '#DE728D',
    borderRadius: 100,
  },
  invitedButton: {
    backgroundColor: '#F5F5F5',
  },
  inviteButtonText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  invitedButtonText: {
    color: '#979797',
  },
});

export default InviteToGroupScreen;
