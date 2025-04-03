import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StyleSheet, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { router } from 'expo-router';

interface Friend {
  id: string;
  first_name: string;
  username: string;
  profile_picture: any;
}

interface FindFriendScreenProps {
  loading: boolean;
  users: Friend[];
  sentRequests: Friend[];
  handleSendFriendRequest: (friendId: number) => void;
  handleCancelSentRequest: (friendId: number) => void;
}

const FindFriendScreen = (props: FindFriendScreenProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  } 
  
  const [searchQuery, setSearchQuery] = useState('');

  // need to maybe change filters to show based on if empty or not
  const filteredUsers = props.users.filter(user => 
    user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // idk if we need this function, only gets called on search bar submit i think
  const handleSearch = () => {
    console.log('Search query:', searchQuery);
  };

  const handleCancel = (friendId: string) => {
    console.log('Cancel friend request:', friendId);
    props.handleCancelSentRequest(Number(friendId));
  };

  const handleAddFriend = (friendId: string) => {
    console.log('Add friend:', friendId);
    props.handleSendFriendRequest(Number(friendId));
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
        <Text style={styles.title}>Add Friends</Text>
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

      <ScrollView style={styles.content}>
        {/* Pending Requests Section */}
        {props.sentRequests && props.sentRequests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Friend Requests</Text>
            {props.sentRequests.map((friend) => (
              <View key={friend.id} style={styles.friendCard}>
                <View style={styles.friendInfo}>
                  <Image 
                    source={friend.profile_picture}
                    style={styles.profileImage}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.name}>{friend.first_name}</Text>
                    <Text style={styles.username}>{friend.username}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  onPress={() => handleCancel(friend.id)}
                >
                  <Image 
                    source={require("@/assets/icons/cancel.png")}
                    style={styles.cancelIcon}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Add Friends Section */}
        <View style={styles.section}>
          {filteredUsers.map((friend) => (
            <View key={friend.id} style={styles.friendCard}>
              <View style={styles.friendInfo}>
                <Image 
                  source={friend.profile_picture}
                  style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{friend.first_name}</Text>
                  <Text style={styles.username}>{friend.username}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleAddFriend(friend.id)}
              >
                <Text style={styles.addButtonText}>Add Friend</Text>
              </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
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
  cancelIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#DE728D',
    marginRight: 4,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: '#DE728D',
    borderRadius: 100,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default FindFriendScreen;
