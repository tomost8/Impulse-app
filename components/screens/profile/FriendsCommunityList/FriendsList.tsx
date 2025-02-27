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

const FriendsList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const friends = [
    { id: 1, name: "Courtney", username: "courtney123" },
    { id: 2, name: "Alex", username: "alex456" },
    { id: 3, name: "Sam", username: "sam789" },
    { id: 4, name: "Jordan", username: "jordan101" },
  ];

  const handleRemoveFriend = (id) => {
    // Implementation for removing friend
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
              uri: "URI",
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
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityLabel="Search username input"
          />
        </View>
        <ScrollView style={styles.friendsList}>
          {friends.map((friend) => (
            <View key={friend.id} style={styles.friendItem}>
              <Image
                source={{
                  uri: "URI",
                }}
                style={styles.friendAvatar}
                accessibilityLabel={`${friend.name}'s avatar`}
              />
              <View style={styles.friendInfo}>
                <View>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendUsername}>{friend.username}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveFriend(friend.id)}
                  accessibilityLabel={`Remove ${friend.name} from friends list`}
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
