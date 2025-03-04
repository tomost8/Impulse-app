import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CommunityScreen = ({ communities, isLoading }: { communities: any[], isLoading: boolean }) => {
  const [searchText, setSearchText] = React.useState("");

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const filteredCommunities = communities.filter(community => 
    searchText === "" || 
    community.community.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container} 
    //accessibilityRole="main"
    >
      <View style={styles.header}>
        <Text style={styles.time} accessibilityRole="text">
          9:41
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Image
            accessibilityLabel="Back arrow"
            resizeMode="contain"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/31eebec48547bd70e44e8a8ccfa9bfe0fd316b1230a3ef5f0a72f4aa55749a9e?placeholderIfAbsent=true&apiKey=ea4b1df1a7464c4cadfa7bc5641e7e40",
            }}
            style={styles.backArrow}
          />
          <Text style={styles.title} accessibilityRole="header">
            My Communities
          </Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.searchContainer}>
            <Image
              accessibilityLabel="Search icon"
              resizeMode="contain"
              source={{
                uri: "URL",
              }}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search communities"
              accessibilityLabel="Search communities"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          {filteredCommunities.map((community) => (
            <View key={community.community.id} style={styles.communityItem}>
              <Image
                accessibilityLabel={`${community.community.name} community icon`}
                resizeMode="contain"
                source={{
                  uri: community.community.thumbnail,
                }}
                style={styles.communityIcon}
              />
              <View style={styles.communityInfo}>
                <Text style={styles.communityName}>{community.community.name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Leaving community:", community.community.id);
                  }}
                  style={styles.leaveButton}
                  accessibilityLabel={`Leave ${community.community.name} group`}
                  accessibilityRole="button"
                >
                  <Text style={styles.leaveButtonText}>Leave Group</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Image
          accessibilityLabel="Social icon"
          resizeMode="contain"
          source={{
            uri: "URL",
          }}
          style={styles.socialIcon}
        />
        <Text style={styles.footerText}>Social</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 44,
    paddingBottom: 20,
    alignItems: "center",
  },
  time: {
    fontFamily: "Lato, sans-serif",
    fontSize: 17,
    color: "#242020",
    fontWeight: "600",
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
  backArrow: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 24,
    color: "#242020",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(225, 225, 225, 1)",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Open Sans, sans-serif",
    fontSize: 16,
    color: "rgba(164, 172, 188, 1)",
  },
  communityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  communityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  communityInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  communityName: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 16,
    color: "rgba(36, 32, 32, 1)",
    fontWeight: "600",
  },
  leaveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  leaveButtonText: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  footer: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 20,
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginBottom: 5,
  },
  footerText: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    color: "rgba(222, 114, 141, 1)",
    fontWeight: "600",
  },
});

export default CommunityScreen;
