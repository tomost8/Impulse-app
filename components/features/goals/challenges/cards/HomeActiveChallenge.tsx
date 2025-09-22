import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from 'react-native-svg';

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

type HomeActiveChallengeProps = {
  id: string;
  title: string;
  progress: {
    progressLabel: string;
    daysRemaining: number;
  };
  status: 'active' | 'completed' | 'pending';
  description?: string;
};

const HomeActiveChallenge: React.FC<HomeActiveChallengeProps> = ({
  id,
  title,
  progress,
  status,
  description,
}) => {
  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  
  return (
    <View style={[
      styles.container, 
      isCompleted && styles.completedContainer
    ]}>
      {/* Main Content Row */}
      <View style={styles.mainContent}>
        {/* Circular Progress */}
        <CircularProgress progressLabel={progress.progressLabel} />

        {/* Text Content */}
        <View style={styles.textContainer}>
          {/* Title and Status Row */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            <Text style={[styles.status, isCompleted && styles.completedStatus]}>
              {status === 'active' ? 'Active' : status === 'completed' ? 'Completed' : 'Pending'}
            </Text>
          </View>
          
          {/* Days Remaining */}
          <Text style={styles.progress}>
            {progress.daysRemaining} Day{progress.daysRemaining === 1 ? '' : 's'} Remaining
          </Text>
          
          {/* Description */}
          {description && (
            <Text style={[styles.description, isActive && styles.activeDescription]}>
              {description}
            </Text>
          )}

          {/* Badges Section */}
          <View style={styles.badgesContainer}>
            <View style={styles.badgePlaceholder} />
            <View style={styles.badgePlaceholder} />
            <View style={styles.badgePlaceholder} />
            <View style={styles.badgePlaceholder} />
          </View>
        </View>
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
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    width: 50,
    height: 50,
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
    justifyContent: "space-between",
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
  progress: {
    fontSize: 12,
    fontWeight: "400",
    color: "#242020",
    fontFamily: "Open Sans",
    lineHeight: 16,
    marginTop: 2,
    textAlign: "left",
  },
  description: {
    fontSize: 12,
    fontWeight: "400",
    color: "#A4ACBC",
    fontFamily: "Open Sans",
    lineHeight: 16,
    marginTop: 2,
    textAlign: "left",
  },
  status: {
    fontSize: 12,
    fontWeight: "700",
    color: "#DE728D",
    fontFamily: "Poppins",
    lineHeight: 18,
    marginLeft: 8,
  },
  badgesContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 6,
    gap: 8,
  },
  badgePlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
  },
  completedContainer: {
    backgroundColor: "#F1F3FA",
  },
  completedStatus: {
    color: "#5E6676",
  },
  activeContainer: {
    backgroundColor: "#FFF5F8",
  },
  activeDescription: {
    color: "#DE728D",
  },
});

export default HomeActiveChallenge;
