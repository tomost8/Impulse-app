import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Use expo-linear-gradient
import { getBadgeImage } from "@/utils/challengeUtils";

interface MilestoneResult {
  daysToFinish: number;
  nextBadge: string;
}

const milestones = [
  { percentage: 4 / 7, badge: "Bronze" },
  { percentage: 5 / 7, badge: "Silver" },
  { percentage: 6 / 7, badge: "Gold" },
  { percentage: 7 / 7, badge: "Diamond" },
] as const;

interface ProgressWithMilestonesProps {
  days_completed: number;
  challengeTitle: string;
}

const ProgressWithMilestones: React.FC<ProgressWithMilestonesProps> = ({
  days_completed,
  challengeTitle,
}) => {
  const totalDays = parseInt(challengeTitle.split(" ")[0]);
  const progress = Math.max(0, Math.min(1, days_completed / totalDays));

  const getDaysUntilNextBadge = (progress: number, totalDays: number): MilestoneResult => {
    const normalizedProgress = Math.max(0, Math.min(1, progress));
    const nextMilestone =
      milestones.find((milestone) => normalizedProgress < milestone.percentage) ||
      milestones[milestones.length - 1];
    const daysToFinish = Math.ceil(
      nextMilestone.percentage * totalDays - normalizedProgress * totalDays
    );

    return {
      daysToFinish: Math.max(0, daysToFinish),
      nextBadge: nextMilestone.badge,
    };
  };

  const { daysToFinish, nextBadge } = getDaysUntilNextBadge(progress, totalDays);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {daysToFinish} {daysToFinish === 1 ? "Day" : "Days"} until {nextBadge}
      </Text>

      <View style={styles.progressBackground}>
        <LinearGradient
          colors={["#EFEEEE", "transparent"]} // Background gradient
          style={styles.backgroundGradient}
        />
        <LinearGradient
          colors={["#FA9649", "#FE6D73"]} // Progress fill gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressFill, { flex: progress }]}
        />
        <View style={{ flex: 1 - progress }} />
      </View>

      <View style={styles.milestones}>
        {milestones.map((m, idx) => (
          <View
            key={idx}
            style={[styles.milestone, { left: `${m.percentage * 100}%` }]}
          >
            <Image
              source={getBadgeImage(challengeTitle, m.badge)}
              style={styles.icon}
              resizeMethod={Platform.OS === 'android' ? 'resize' : undefined}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  label: {
    color: "#5E6676",
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "500",
    marginBottom: 8,
    backgroundColor: "transparent", // Match text style from example
  },
  progressBackground: {
    flexDirection: "row",
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EFEEEE",
    overflow: "hidden",
    position: "relative", // Allow absolute positioning of gradient
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 10, // Match progress bar height
  },
  progressFill: {
    borderRadius: 5,
  },
  milestones: {
    position: "relative",
    height: 40,
    marginTop: -10,
  },
  milestone: {
    position: "absolute",
    top: 0,
    transform: [{ translateX: -24 }],
  },
  icon: {
    marginTop: 12,
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default ProgressWithMilestones;