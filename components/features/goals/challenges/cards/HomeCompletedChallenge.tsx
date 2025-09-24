import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { getBadgeImage } from "@/utils/challengeUtils";

type HomeCompletedChallengeProps = {
  id: string;
  title: string;
  totalDays: number;
  completedAt: string;
  endsAt: string;
  badge: string;
};

const HomeCompletedChallenge: React.FC<HomeCompletedChallengeProps> = ({
  id,
  title,
  totalDays,
  completedAt,
  endsAt,
  badge,
}) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString();
  };

  const handlePress = () => {
    // Navigate to challenge details using the dynamic route
    router.push(`/home/challenges/${id}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      {/* Main Content Row */}
      <View style={styles.mainContent}>
        {/* Badge Placeholder */}
        <Image 
          source={getBadgeImage(title, badge)}
          style={styles.icon}
        />

        {/* Text Content */}
        <View style={styles.textContainer}>
          {/* Title */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
          </View>
          
          {/* Completion Info */}
          <View style={styles.completionInfo}>
            <Text style={styles.completedText}>Completed</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.completionDate}>{completedAt ? formatDate(completedAt) : 'MM/DD/YY'}</Text>
          </View>

          {/* View Results */}
          <TouchableOpacity 
            style={styles.viewResultsContainer}
            onPress={() => console.log('View Results pressed for UserChallenge:', id)}
          >
            <Text style={styles.viewResultsText}>View Results</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#5E6676",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 8,
    width: "100%",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 12,
    resizeMode: "contain",
  },
  mainContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#242020",
    fontFamily: "Open Sans",
    lineHeight: 19,
    flex: 1,
    textAlign: "left",
  },
  completionInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  completedText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#242020",
    fontFamily: "Open Sans",
    lineHeight: 16,
  },
  dot: {
    fontSize: 12,
    fontWeight: "400",
    color: "#242020",
    fontFamily: "Open Sans",
    lineHeight: 16,
    marginHorizontal: 4,
  },
  endDate: {
    fontSize: 12,
    fontWeight: "400",
    color: "#242020",
    fontFamily: "Open Sans",
    lineHeight: 16,
  },
  completionDate: {
    fontSize: 12,
    fontWeight: "400",
    color: "#242020",
    fontFamily: "Open Sans",
    lineHeight: 16,
  },
  viewResultsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 6,
  },
  viewResultsText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#363636",
    fontFamily: "Open Sans",
    marginRight: 4,
  },
  arrow: {
    fontSize: 12,
    fontWeight: "600",
    color: "#242020",
    fontFamily: "Open Sans",
  },
});

export default HomeCompletedChallenge;
