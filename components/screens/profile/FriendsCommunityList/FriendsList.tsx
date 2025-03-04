import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

const FriendsList = ({ friends, isLoading }: { friends: any[], isLoading: boolean }) => {
  const [searchText, setSearchText] = useState("");

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const filteredFriends = friends.filter(friend =>
    searchText === "" ||
    friend.friend.username.toLowerCase().includes(searchText.toLowerCase())
  );

  console.log("Friends:", friends);

  const handleRemoveFriend = (id: number) => {
    // Implementation for removing friend
    console.log("Removing friend:", id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/31eebec48547bd70e44e8a8ccfa9bfe0fd316b1230a3ef5f0a72f4aa55749a9e?placeholderIfAbsent=true&apiKey=ea4b1df1a7464c4cadfa7bc5641e7e40",
            }}
            style={styles.backIcon}
            accessibilityLabel="Back button"
          />
          <Text style={styles.title}>My Friends</Text>
        </View>
        <View style={styles.searchContainer}>
          <Image
            source={{
              uri: "URI",
            }}
            style={styles.searchIcon}
            accessibilityLabel="Search icon"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search username"
            value={searchText}
            onChangeText={setSearchText}
            accessibilityLabel="Search username input"
          />
        </View>
        <ScrollView style={styles.friendsList}>
          {filteredFriends.map((friend) => (
            <View key={friend.friend.id} style={styles.friendItem}>
              <Image
                source={{
                  uri: friend.friend.profile_picture,
                }}
                style={styles.friendAvatar}
                accessibilityLabel={`${friend.friend.name}'s avatar`}
              />
              <View style={styles.friendInfo}>
                <View>
                  <Text style={styles.friendName}>{friend.friend.first_name} {friend.friend.last_name}</Text>
                  <Text style={styles.friendUsername}>{friend.friend.username}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveFriend(friend.friend.id)}
                  accessibilityLabel={`Remove ${friend.friend.first_name} ${friend.friend.last_name} from friends list`}
                >
                  <Text style={styles.removeButtonText}>Remove Friend</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Image
          source={{
            uri: "URI",
          }}
          style={styles.footerIcon}
          accessibilityLabel="Social icon"
        />
        <Text style={styles.footerText}>Social</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  time: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  friendsList: {
    flex: 1,
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  friendInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  friendName: {
    fontSize: 16,
    fontWeight: "600",
  },
  friendUsername: {
    fontSize: 14,
    color: "#666",
  },
  removeButton: {
    backgroundColor: "#ff4757",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 20,
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 14,
    color: "#de728d",
    fontWeight: "600",
  },
});

export default FriendsList;
