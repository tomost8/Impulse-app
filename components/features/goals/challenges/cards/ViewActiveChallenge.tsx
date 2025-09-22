import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { Circle } from 'react-native-svg';
import { getCategoryIconByCategory, getLabelByCategory } from '@/utils/goals';

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
  status: 'active' | 'completed' | 'pending';
  description?: string;
  category?: string;
};

const ViewActiveChallenge: React.FC<ViewActiveChallengeProps> = ({
  id,
  title,
  progress,
  status,
  description,
  category,
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
        {/* Category Image */}
        <View style={styles.categoryContainer}>
          <Image 
            source={getCategoryIconByCategory(category || null)} 
            style={styles.categoryImage}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          {/* Category */}
          <Text style={styles.category}>{getLabelByCategory(category || '')}</Text>
          
          {/* Title */}
          <Text style={styles.title}>{title}</Text>
          
          {/* Description */}
          {description && (
            <Text style={[styles.description, isActive && styles.activeDescription]}>
              {description}
            </Text>
          )}
        </View>

        {/* Circular Progress - Moved to Right */}
        <CircularProgress progressLabel={progress.progressLabel} />
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
    marginLeft: 12,
    width: 50,
    height: 50,
  },
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    width: 50,
    height: 50,
  },
  categoryImage: {
    width: 40,
    height: 40,
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
    marginBottom: 4,
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
  completedContainer: {
    backgroundColor: "#F1F3FA",
  },
  activeContainer: {
    backgroundColor: "#FFF5F8",
  },
  activeDescription: {
    color: "#DE728D",
  },
});

export default ViewActiveChallenge;
