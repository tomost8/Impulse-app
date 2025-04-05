import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { s } from "react-native-size-matters";
import { router } from "expo-router";
import RemoveFriendPopup from './FriendRemoveModal';

function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Image
            source={require("@/assets/icons/backArrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Friends</Text>
      </View>
    </View>
  );
}

interface FriendProps {
  loading: boolean;
  friends: any[];
  handleRemoveFriend: (id: number) => void;
}

const FriendsList = (props: FriendProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }

  const [searchText, setSearchText] = useState("");
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);

  // Filter friends based on search text
  const filteredFriends = props.friends.filter(friend => 
    friend.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
    friend.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleRemoveFriend = (id: number) => {
    setSelectedFriendId(id);
    setShowRemovePopup(true);
  };

  const confirmRemoveFriend = () => {
    if (selectedFriendId) {
      props.handleRemoveFriend(selectedFriendId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Image
            source={require("@/assets/icons/search.png")}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search username"
            placeholderTextColor="#979797"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <ScrollView style={styles.friendsList}>
          {filteredFriends.map((friend) => (
            <View key={friend.id} style={styles.friendItem}>
              <TouchableOpacity onPress={() => console.log("Profile pressed:", friend.id)}>
                <Image
                  source={{ uri: friend.profile_picture }}
                  style={styles.friendAvatar}
                />
              </TouchableOpacity>
              <View style={styles.friendInfo}>
                <View>
                  <Text style={styles.friendName}>{friend.first_name} {friend.last_name}</Text>
                  <Text style={styles.friendUsername}>{friend.username}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveFriend(friend.id)}
                >
                  <Text style={styles.removeButtonText}>Remove Friend</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <RemoveFriendPopup 
        visible={showRemovePopup}
        onClose={() => setShowRemovePopup(false)}
        onRemove={confirmRemoveFriend}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#E0EDFD',
    paddingTop: s(25),
    paddingBottom: s(16),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(16),
  },
  backButton: {
    marginRight: s(8),
  },
  backIcon: {
    width: 10,
    height: 15,
    tintColor: '#242020',
    marginLeft: 5,
    marginRight: 5,
  },
  headerTitle: {
    color: '#242020',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingTop: s(20),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: s(100),
    paddingHorizontal: s(16),
    height: s(48),
    marginBottom: s(12),
  },
  searchIcon: {
    width: s(18),
    height: s(18),
    marginRight: s(12),
  },
  searchInput: {
    flex: 1,
    fontSize: s(14),
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  friendsList: {
    flex: 1,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(12),
  },
  friendAvatar: {
    width: s(50),
    height: s(50),
    borderRadius: s(25),
    marginRight: s(12),
  },
  friendInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  friendName: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#242020',
    marginBottom: 2,
  },
  friendUsername: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  removeButton: {
    backgroundColor: '#DE728D',
    paddingHorizontal: s(12),
    paddingVertical: s(8),
    borderRadius: s(100),
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '700',
  },
});

export default FriendsList;
