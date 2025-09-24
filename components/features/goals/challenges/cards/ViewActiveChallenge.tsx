import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { Circle } from 'react-native-svg';
import { getIconByCategory, getLabelByCategory } from '@/utils/goals';
import { parseTitle } from "@/utils/challengeUtils";

// Function to parse progress from "0/7" format
const parseProgress = (progressLabel: string) => {
  const match = progressLabel.match(/(\d+)\/(\d+)/);
  if (match) {
    const current = parseInt(match[1]);
    const total = parseInt(match[2]);
    return { current, total, percentage: (current / total) * 100 };
  }
  return { current: 0, total: 1, percentage: 0 };
};

// Circular Progress Component
const CircularProgress = ({ progressLabel }: { progressLabel: string }) => {
  const { current, total, percentage } = parseProgress(progressLabel);
  const size = 50;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = (percentage / 100) * circumference;

  return (
    <View style={styles.progressContainer}>
      <Svg width={size} height={size} style={styles.progressSvg}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#DE728D"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text style={styles.progressText}>{current}/{total}</Text>
    </View>
  );
};

type ViewActiveChallengeProps = {
  id: string;
  title: string;
  progress: {
    progressLabel: string;
    daysRemaining: number;
  };
  category?: string;
};

const ViewActiveChallenge: React.FC<ViewActiveChallengeProps> = ({
  id,
  title,
  progress,
  category,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentRowContainer}>
        {/* Category Icon */}
        <View style={styles.categoryIconContainer}>
          <Image 
            source={getIconByCategory(category || null)} 
            style={styles.categoryIcon}
          />
        </View>

        {/* Middle Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.categoryText}>{getLabelByCategory(category || '')}</Text>
          <Text style={styles.titleText}>{parseTitle(title)}</Text>
        </View>

        {/* Circular Progress */}
        <CircularProgress progressLabel={progress.progressLabel} />
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
  categoryIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    width: 70,
    height: 55,
    //borderColor: '#007AFF',
    //borderWidth: 2,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    height: 45,
    //borderColor: '#007AFF',
    //borderWidth: 2,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    width: 50,
    height: 55,
    //borderColor: '#007AFF',
    //borderWidth: 2,
  },

  // Content
  categoryIcon: {
    width: 55,
    height: 55,
    resizeMode: "contain",
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
    marginBottom: 4,
  },
  progressSvg: {
    position: 'absolute',
  },
  progressText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DE728D',
    fontFamily: 'Open Sans',
    textAlign: 'center',
  },
});

export default ViewActiveChallenge;
