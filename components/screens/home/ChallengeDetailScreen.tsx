import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageSourcePropType, Image, TouchableOpacity, FlatList, Platform } from "react-native";
import Header from "@/components/ui/common/headers/Header";
import { router } from "expo-router";
import LoadingScreen from "@/components/ui/common/loading";
import { getIconByCategory, getLabelByCategory } from "@/utils/goals";
import { getBadgeImage, getPointsByBadge } from "@/utils/challengeUtils";
import { CircularProgress } from "@/components/features/goals/challenges/cards/HomeActiveChallenge";
import ProgressWithMilestones from "./Progressbar";

interface ChallengeDetailScreenProps {
  challenge: any;
  isLoading: boolean;
  entries: any[];
  participants: any[];
}

const ChallengeDetailScreen: React.FC<ChallengeDetailScreenProps> = ({
  challenge,
  isLoading,
  entries,
  participants,
}) => {
  if (isLoading) {
    return <LoadingScreen />;
  }

  const {
    userChallenge: {
      days_completed,
      badge_level = "",
      status,
      challenge: challengeData,
    },
    progress,
  } = challenge;

  const challengeTitle = challengeData.title;
  const totalDays = Number(challengeTitle?.split(" ")[0]) || 0;

  const STATUS_TESTING = false;
  const isActive = STATUS_TESTING ? false : status === "ACTIVE";
  const isCompleted = STATUS_TESTING ? false : status === "COMPLETED";
  const isFailed = STATUS_TESTING ? true : status === "FAILED";

  const { progressLabel, daysRemaining } = progress ?? {};

  const categoryIcon = getIconByCategory(challengeData.category);
  const Points = badge_level? getPointsByBadge(badge_level, totalDays): 0;


  const recapData = Array.from({ length: totalDays }, (_, i) => {
    const dayNumber = i + 1;
    const entry = entries.find((e: any) => e.day_number === dayNumber);
    return {
      day: dayNumber,
      imageUrl: entry?.mediaUrls?.[0] || null,
    };
  });
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerArea}>
        <Header 
          title="Challenge"
          onBackPress={() => router.back()}
        />
      </SafeAreaView>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              {categoryIcon && (
                <Image source={categoryIcon as ImageSourcePropType} style={styles.icon} />
              )}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{getLabelByCategory(challengeData.category)}</Text>
              <Text style={styles.subtitle}>{totalDays} Days</Text>
            </View>
          </View>
          <View>
            {isActive ? (
              <Text style={styles.titleActiveButton}>Active</Text>
            ) : isCompleted || isFailed ? (
              null
            ) : (
              <Text style={styles.titleActiveButton}>Inactive</Text>
            )}
          </View>
        </View>

        {/* Section 1: Card Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isActive ? 'Current Goal Progress' : (isCompleted || isFailed)? 'Challenge Summary' : ''}
          </Text>
          <View style={styles.badgeContent}>
            {/* Badge Placeholder */}
            {isActive &&
              <CircularProgress progressLabel={progressLabel} />
            }
            {(isCompleted || isFailed) &&
              <Image
                source={getBadgeImage(challengeData.title, badge_level)}
                style={styles.badgeIcon}
                resizeMethod={Platform.OS === 'android' ? 'resize' : undefined}
              />
            }
            {/* Text Content */}
            <View style={styles.badgeTextContainer}>
              {/* Title */}
              <Text style={styles.summaryHeader}>
                {isActive ? `DAY ${totalDays}` : isCompleted ? 'Congratulations!' : isFailed? 'Try Again Next Time' : ''}
              </Text>
              <Text style={styles.completedText}>
                {isActive ? `${daysRemaining} Days Remaining` : (isCompleted || isFailed) ? `${days_completed}/${totalDays} Days Complete` : ''}
              </Text>
              {(isCompleted || isFailed) && <Text style={styles.completedText}>{Points} Points Earned</Text>}
            </View>
          </View>
        </View>

        {/* Section 2: Progress Section */}
        <View style={styles.section}>
          {isActive && <Text style={styles.sectionTitle}>Badges and Points</Text>}
          {isActive && 
            <ProgressWithMilestones
              days_completed={days_completed}
              challengeTitle={challengeTitle}
            />
          }
          {isCompleted && <Text style={styles.ownPct}>20% of Impulse users have this badge</Text>}
        </View>

        {/* Section 3: Daily Recap Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, styles.recapTitle]}>Daily Recap</Text>
          <Text style={[styles.completedText, styles.recapText]}>{totalDays} Day Challenge</Text>
          <FlatList
            data={recapData}
            numColumns={7}
            keyExtractor={(item) => item.day.toString()}
            renderItem={({ item }) => (
              <View style={styles.circleContainer}>
                <View
                  style={[ styles.circleImage, styles.imageContainer ]}
                >
                  {item.imageUrl &&
                    <Image 
                      source={{ uri: item.imageUrl }}
                      style={styles.circleImage}
                      resizeMethod={Platform.OS === 'android' ? 'resize' : undefined}
                    />
                  }
                  {(
                    item.day > totalDays - daysRemaining + 1 ||
                    (item.day === totalDays - daysRemaining + 1 && !item.imageUrl)
                  ) && (
                    <Image source={require("@/assets/images/challenge/Inactive State.png")} style={styles.inactiveImage} />
                  )}
                  <Text
                    style={styles.dayText}
                  >
                    {item.day}
                  </Text>
                </View>
              </View>
            )}
            scrollEnabled={false}
          />
        </View>

        {/* Section 4: Friends Section */}
        {!isFailed && <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isActive ? 'Friends Also Participating' : isCompleted ? 'Friends' : ''}
          </Text>
          {participants.map((participant: any, idx: number) => (
            <View key={idx} style={styles.friendContainer}>
              <View style={styles.titleContainer}>
                <View>
                  <Image
                    source={
                      participant.profile_picture
                        ? { uri: participant.profile_picture }
                        : require("@/assets/images/profilepicturecircle.png")
                    }
                    style={styles.friendAvatar}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.friendName}>{participant.first_name} {participant.last_name}</Text>
                  <Text style={styles.friendUserName}> {participant.username} </Text>
                </View>
              </View>
              {isCompleted && <View>
                <Image 
                  source={getBadgeImage(challengeData.title, participant.badge_level)}
                  style={styles.friendBadge}
                  resizeMethod={Platform.OS === 'android' ? 'resize' : undefined}
                />
              </View>}
            </View>
          ))}
        </View>}      
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
  scrollView: {
    padding: 16,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconContainer: {
    width: 60,
    height: 60,
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
    gap: 4,
  },
  title: {
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0,
    color: "#242020",
    paddingTop: 5,
  },
  subtitle: {
    color: '#5F5F5F',
    fontFamily: 'Lato',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    paddingBottom: 5
  },
  titleButton: {
    backgroundColor: "#E75480",
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: "center",
  },
  titleButtonText: {
    color: "#000000",
    fontWeight: 500,
    fontFamily: "Inter",
    fontSize: 14,
  },
  titleActiveButton: {
    color: "#DE728D",
    fontWeight: 500,
    fontFamily: "Inter",
    fontSize: 16,
  },
  badgeContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#FFF4F1",
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  badgeIcon: {
    marginRight: 20,
    marginLeft: 8,
    marginBottom: 4,
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  badgeTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 2,
    //borderColor: 'blue',
    //borderWidth: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    paddingBottom: 16,
  },
  summaryHeader: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  completedText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    color: "#000",
    fontFamily: "Poppins",
    //
    paddingLeft: 4,
  },
  ownPct: {
    textAlign: 'center',
    fontFamily: 'Lato',
    fontWeight: '900',
    fontStyle: 'normal',
    color: "#EA7571",
    fontSize: 12,
    letterSpacing: 0,
    marginVertical: 10,
    verticalAlign: 'middle'
  },
  recapTitle: {
    marginBottom: 20,
  },
  recapText: {
    marginBottom: 10,
  },
  circleContainer: {
    flex: 1,
    alignItems: "center",
    margin: 5,
  },
  circleImage: {
    backgroundColor: "#D9D9D9",
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  inactiveImage: {
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 50,
    resizeMode: "cover",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dayText: {
    position: "absolute",
    color: '#242020',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 11,
  },
  friendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendBadge: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: "contain",
  },

  friendName: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#242020",
    textAlign: "center",
    fontWeight: 600,
  },
  friendUserName: {
    fontSize: 12,
    fontFamily: "Inter",
    color: "#5E6676",
    textAlign: "center",
    fontWeight: 400,
  },
});

export default ChallengeDetailScreen;
