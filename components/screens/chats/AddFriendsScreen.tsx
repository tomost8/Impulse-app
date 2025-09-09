import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StyleSheet, 
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import LoadingScreen from '@/components/ui/common/loading';
import { router } from 'expo-router';
import Header from "@/components/ui/common/headers/Header";

interface Friend {
  id: string;
  first_name: string;
  username: string;
  profile_picture: any;
}

interface AddFriendsScreenProps {
  loading: boolean;
  users: Friend[];
  sentRequests: Friend[];
  handleSendFriendRequest: (friendId: number) => void;
  handleCancelSentRequest: (friendId: number) => void;
}

const AddFriendsScreen = (props: AddFriendsScreenProps) => {
  if (props.loading) {
    return <LoadingScreen />;
  } 
  
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search query
  const filteredUsers = props.users.filter(user => 
    user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine what to display based on search state
  const showPendingRequests = searchQuery === '';
  const showFilteredUsers = searchQuery !== '';

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
    <View style={styles.container}>
      <Header 
        title="Add Friends"
        onBackPress={() => router.back()}
      />

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
        {/* Pending Requests Section - Only show when search is empty */}
        {showPendingRequests && props.sentRequests && props.sentRequests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Friend Requests</Text>
            {props.sentRequests.map((friend) => (
                              <View key={friend.id} style={styles.friendCard}>
                  <TouchableOpacity 
                    style={styles.friendInfo}
                    onPress={() => router.push(`/user/${friend.id}`)}
                  >
                    <Image 
                      source={{ uri: friend.profile_picture }}
                      style={styles.profileImage}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.name}>{friend.first_name}</Text>
                      <Text style={styles.username}>{friend.username}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleCancel(friend.id)}
                    disabled={props.loading}
                  >
                    <Image 
                      source={require("@/assets/icons/cancel.png")}
                      style={[styles.cancelIcon, props.loading && styles.disabledIcon]}
                    />
                  </TouchableOpacity>
                </View>
            ))}
          </View>
        )}

        {/* Add Friends Section - Only show when searching */}
        {showFilteredUsers && (
          <View style={styles.section}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((friend) => (
                <View key={friend.id} style={styles.friendCard}>
                  <TouchableOpacity 
                    style={styles.friendInfo}
                    onPress={() => router.push(`/user/${friend.id}`)}
                  >
                    <Image 
                      source={{ uri: friend.profile_picture }}
                      style={styles.profileImage}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.name}>{friend.first_name}</Text>
                      <Text style={styles.username}>{friend.username}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.addButton, props.loading && styles.disabledButton]}
                    onPress={() => handleAddFriend(friend.id)}
                    disabled={props.loading}
                  >
                    <Text style={[styles.addButtonText, props.loading && styles.disabledText]}>Add Friend</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.noResultsText}>No users found matching "{searchQuery}"</Text>
            )}
          </View>
        )}
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
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 10,
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
    marginVertical: 16,
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
  disabledIcon: {
    opacity: 0.5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
  noResultsText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#979797',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AddFriendsScreen;
