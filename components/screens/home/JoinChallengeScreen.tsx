import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ImageSourcePropType, SafeAreaView } from "react-native";
import LoadingScreen from "@/components/ui/common/loading";
import { getIconByCategory, getLabelByCategory } from "@/utils/goals";
import Header from "@/components/ui/common/headers/Header";
import { router } from "expo-router";
import { getBadgeImage } from "@/utils/challengeUtils";

type Friend = {
  id: number;
  name: string;
  username: string;
  avatar: string;
};

type Milestone = {
  title: string;
  badge: string;
  days: number;
  points: number;
  src?: ImageSourcePropType;
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

  console.log("🍳 milestones:", milestones);

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
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              {categoryIcon && (
                <Image source={categoryIcon as ImageSourcePropType} style={styles.icon} />
              )}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{getLabelByCategory(category)}</Text>
              <Text style={styles.subtitle}>{dayLength}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.joinButton} onPress={handleJoinChallenge}>
              <Text style={styles.joinButtonText}>{joined ? "Joined" : "Join"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.description}>Complete and upload a picture of a {title} activity each day to achieve the milestones below. Build your badge collection and share your success!</Text>


        {/* Milestones */}
        <View style={styles.milestonesContainer}>
          {milestones.map((m, index) => (
            <View key={index} style={styles.milestone}>
              <Text style={styles.milestoneText}>{m.badge}</Text>
              <Image 
                source={getBadgeImage(m.title, m.badge)}
                style={styles.icon}
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
        <Text style={styles.friendsTitle}>Friends</Text>
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
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerArea: {
    backgroundColor: "#E0EDFD",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconContainer: {
    width: 57,
    height: 57,
    marginRight: 16,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 8,
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
  description: {
    fontSize: 14,
    color: "#444",
    padding: 16,
    marginBottom: 20
  },
  milestonesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  milestone: {
    alignItems: "center",
    flex: 1
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5
  },
  milestoneText: {
    color: '#5E6676',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '700',
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
  friendsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10
  },
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
  friendName: {
    fontWeight: "600"
  },
  friendUsername: {
    fontSize: 12,
    color: "#666"
  },
});

export default JoinChallengeScreen;