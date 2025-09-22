import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getLabelByCategory } from '@/utils/goals';

type ViewCompletedChallengeProps = {
  id: string;
  title: string;
  totalDays: number;
  completedAt: string;
  endsAt: string;
  badgesEarned: any[];
  category?: string;
};

const ViewCompletedChallenge: React.FC<ViewCompletedChallengeProps> = ({
  id,
  title,
  totalDays,
  completedAt,
  endsAt,
  badgesEarned,
  category,
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString();
  };


  return (
    <View style={styles.container}>
      {/* Main Content Row */}
      <View style={styles.mainContent}>
        {/* Left Column - Badge and Date */}
        <View style={styles.leftColumn}>
          {/* Badge Placeholder */}
          <View style={styles.badgePlaceholder} />
          
          {/* Completed Date */}
          <Text style={styles.completedDate}>
            {completedAt ? formatDate(completedAt) : 'N/A'}
          </Text>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          {/* Category */}
          <Text style={styles.category}>{getLabelByCategory(category || '')}</Text>
          
          {/* Title */}
          <Text style={styles.title}>{title}</Text>
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
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 8,
    width: "100%",
  },
  leftColumn: {
    alignItems: "center",
    marginRight: 12,
    width: 50,
  },
  badgePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E5E7EB",
    marginBottom: 4,
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
  },
  category: {
    fontSize: 14,
    fontWeight: "600",
    color: "#242020",
    fontFamily: "Open Sans",
    lineHeight: 19,
    textAlign: "left",
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    fontWeight: "400",
    color: "#A4ACBC",
    fontFamily: "Open Sans",
    lineHeight: 16,
    textAlign: "left",
    marginBottom: 2,
  },
  completedDate: {
    fontSize: 10,
    fontWeight: "400",
    color: "#A4ACBC",
    fontFamily: "Open Sans",
    lineHeight: 14,
    textAlign: "center",
  },
  recapButton: {
    height: 40,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DE728D",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginLeft: 12,
  },
  recapButtonText: {
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#DE728D",
  },
});

export default ViewCompletedChallenge;
