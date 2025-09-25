import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ImageSourcePropType, SafeAreaView } from "react-native";
import LoadingScreen from "@/components/ui/common/loading";
import { getIconByCategory, getLabelByCategory } from "@/utils/goals";
import Header from "@/components/ui/common/headers/Header";
import { router } from "expo-router";
import { getBadgeImage } from "@/utils/challengeUtils";

type Milestone = {
  title: string;
  badge: string;
  days: number;
  points: number;
  src?: ImageSourcePropType;
};

type Friend = {
  id: number;
  name: string;
  username: string;
  avatar: string;
};

interface JoinChallengeScreenProps {
  isLoading: boolean;
  title: string;
  category: string;
  dayLength: string;
  description: string;
  joined: boolean;
  onJoinChallenge: () => Promise<void>;
  milestones: Milestone[];
  // friends: Friend[];
}

const JoinChallengeScreen: React.FC<JoinChallengeScreenProps> = ({
  isLoading, 
  title,
  category,
  dayLength,
  description,
  joined,
  onJoinChallenge,
  milestones,
  // friends,
}) => {
  const categoryIcon = getIconByCategory(category);

  const handleJoinChallenge = async () => {
    console.log('Join Challenge button pressed for:', title);
    onJoinChallenge();
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerArea}>
        <Header 
          title="Challenges"
          onBackPress={() => router.back()}
        />
      </SafeAreaView>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <View style={styles.challengeHeaderContainer}>
            <View style={styles.challengeInfo}>
              {categoryIcon && (
                <Image source={categoryIcon as ImageSourcePropType} style={styles.categoryIcon} />
              )}
              <View style={styles.textSection}>
                <Text style={styles.title}>{getLabelByCategory(category)}</Text>
                <Text style={styles.subtitle}>{dayLength}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity 
                style={joined ? styles.joinButtonDisabled : styles.joinButton} 
                onPress={joined ? undefined : handleJoinChallenge}
                disabled={joined}
              >
                <Text style={joined ? styles.joinButtonTextDisabled : styles.joinButtonText}>
                  {joined ? "Joined" : "Join"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.description}>
            Complete and upload a picture of a {getLabelByCategory(category).toLowerCase()} activity 
            each day to achieve the milestones below. Build your badge collection and share your success!
          </Text>

          {/* Milestones */}
          <View style={styles.milestonesContainer}>
            {milestones.map((m, index) => (
              <View key={index} style={styles.milestone}>
                <Text style={styles.milestoneText}>{m.badge}</Text>
                <Image 
                  source={getBadgeImage(m.title, m.badge)}
                  style={styles.badge}
                />
                <Text style={styles.milestoneSubText}>
                  {m.days} days 
                </Text>
                <Text style={styles.milestoneSubText}>
                  {m.points} points
                </Text>
              </View>
            ))}
          </View>

          {/* Friends */}
          {/* <Text style={styles.friendsTitle}>Friends</Text> */}
          {/* {friends.map((f) => (
            <View key={f.id} style={styles.friendItem}>
              <Image source={{ uri: f.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.friendName}>{f.name}</Text>
                <Text style={styles.friendUsername}>{f.username}</Text>
              </View>
            </View>
          ))} */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Containers
  container: { 
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerArea: {
    backgroundColor: "#E0EDFD",
  },
  scrollContainer: {
    flex: 1,
  },
  challengeHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  description: {
    fontSize: 14,
    color: "#444",
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 20,
  },
  milestonesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 20,
  },

  /* Challenge Header */
  challengeInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textSection: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 8,
  },
  categoryIcon: {
    width: 57,
    height: 57,
    marginRight: 16,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 18, 
    letterSpacing: 0,
    color: "#242020",
    paddingTop: 10,
  },
  subtitle: {
    color: '#5F5F5F',
    fontFamily: 'Lato',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 14,
    paddingBottom: 10
  },

  /* Join Button */
  joinButton: {
    backgroundColor: "#E75480",
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Inter",
    fontSize: 14,
    lineHeight: 22,
  },
  joinButtonDisabled: {
    backgroundColor: "#CCCCCC",
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: "center",
  },
  joinButtonTextDisabled: {
    color: "#999999",
    fontWeight: "600",
    fontFamily: "Inter",
    fontSize: 14,
    lineHeight: 22,
  },

  /* Milestones */
  milestone: {
    alignItems: "center",
    flex: 1,
  },
  milestoneText: {
    color: '#5E6676',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  badge: {
    width: 57,
    height: 50,
    borderRadius: 20,
    marginVertical: 8,
    alignSelf: 'center'
  },
  milestoneSubText: {
    color: '#5E6676',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 12,
  },

  /* Friends */
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12
  },
  friendsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10
  },
  friendName: {
    fontWeight: "600"
  },
  friendUsername: {
    fontSize: 12,
    color: "#666"
  },
});

export default JoinChallengeScreen;