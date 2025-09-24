import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { getBadgeImage, parseTitle } from "@/utils/challengeUtils";
import { getLabelByCategory } from '@/utils/goals';

type ViewCompletedChallengeProps = {
  id: string;
  title: string;
  totalDays: number;
  completedAt: string;
  endsAt: string;
  badgesEarned: any[];
  badge: string;
  category?: string;
};

const ViewCompletedChallenge: React.FC<ViewCompletedChallengeProps> = ({
  id,
  title,
  totalDays,
  completedAt,
  endsAt,
  badgesEarned,
  badge,
  category,
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString();
  };


  return (
    <View style={styles.container}>
      {/* Main Content Row */}
      <View style={styles.contentRowContainer}>
        {/* Badge + Completed Date */}
        <View style={styles.badgeContainer}>
          <Image 
            source={getBadgeImage(title, badge)}
            style={styles.badgeImage}
          />
          <Text style={styles.dateText}>
            {completedAt ? formatDate(completedAt) : 'MM/DD/YY'}
          </Text>
        </View>

        {/* Middle Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.categoryText}>{getLabelByCategory(category || '')}</Text>
          <Text style={styles.titleText}>{parseTitle(title)}</Text>
        </View>

        {/* Recap Button */}
        <TouchableOpacity 
          style={styles.recapButton}
          onPress={() => console.log('Recap pressed for UserChallenge:', id)}
        >
          <Text style={styles.recapButtonText}>Recap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Containers
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 8,
    width: "100%",
    height: 80,
  },
  contentRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  badgeContainer: {
    alignItems: "center",
    marginRight: 12,
    width: 70,
    height: 55,
    // borderColor: '#007AFF',
    // borderWidth: 2,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    height: 45,
    // borderColor: '#007AFF',
    // borderWidth: 2,
  },
  recapButton: {
    height: 30,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DE728D",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginLeft: 16,
  },

  // Content
  badgeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 11,
    fontWeight: "400",
    color: "#787878",
    fontFamily: "Open Sans",
    lineHeight: 10,
    textAlign: "center",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#242020",
    fontFamily: "Open Sans",
    lineHeight: 19,
    textAlign: "left",
    marginBottom: 2,
  },
  titleText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#5e6676",
    fontFamily: "Open Sans",
    lineHeight: 16,
    textAlign: "left",
    marginBottom: 2,
  },
  recapButtonText: {
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#DE728D",
  },
});

export default ViewCompletedChallenge;
