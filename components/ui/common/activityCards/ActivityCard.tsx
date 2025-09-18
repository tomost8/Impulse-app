import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType, Pressable } from "react-native";
import { convertUtcToLocal } from "@/utils/timezoneProcessing";
import { getLabelByCategory, getIconByCategory } from "@/utils/goals";
import { useRouter } from "expo-router";

// Function to get grey icons for completed activities
const getGreyIconByCategory = (category: string, isCompleted: boolean) => {
  if (!isCompleted) {
    return getIconByCategory(category);
  }
  
  // Return grey icons for completed activities
  switch (category) {
    case 'FOOD':
      return require("@/assets/icons/greyFood.png");
    case 'PASSION_HOBBY':
      return require("@/assets/icons/greyPassionHobby.png");
    case 'RISE_AND_SHINE':
      return require("@/assets/icons/greyRiseShine.png");
    case 'STUDYING_WORKING':
      return require("@/assets/icons/greyStudyingWorking.png");
    case 'WELLNESS':
      return require("@/assets/icons/greyWellness.png");
    case 'WORKING_OUT':
      return require("@/assets/icons/greyWorkout.png");
    default:
      return getIconByCategory(category);
  }
};

type ActivityCardProps = {
  id: number;
  category: string;
  scheduledDatetime: string;
  duration: number;
  status: string;
  description: string;
  timezone: string;
  isOwnProfile?: boolean;
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  category,
  scheduledDatetime,
  duration,
  status,
  description,
  timezone,
  isOwnProfile,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (status.toLowerCase() === "pending") {
      router.push({
        pathname: "/camera",
        params: { id, category }
      });
    }
  };

  const isCompleted = status.toLowerCase() !== 'pending';
  
  const CardContent = (
    <View style={[styles.container, isCompleted && styles.completedContainer, !isCompleted && styles.incompleteContainer]}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Image source={getGreyIconByCategory(category, isCompleted) as ImageSourcePropType} style={styles.icon} />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{getLabelByCategory(category)}</Text>
        {duration && (
          <Text style={styles.time}>
            {`${convertUtcToLocal(scheduledDatetime, timezone)} to ${convertUtcToLocal(scheduledDatetime, timezone, duration)}`}
          </Text>
        )}
        {description && (
          <Text style={[styles.description, !isCompleted && styles.incompleteDescription]}>{description}</Text>
        )}
      </View>

      {/* Status */}
      <Text style={[styles.status, isCompleted && styles.completedStatus]}>
        {status.toLowerCase() === 'pending' ? 'In Progress' : 'Completed'}
      </Text>
    </View>
  );

  return (status.toLowerCase() === "pending" && isOwnProfile) ? (
    <Pressable onPress={handlePress}>{CardContent}</Pressable>
  ) : (
    CardContent
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F9FF",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 12, 
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    width: "102%",
  },
  iconContainer: {
    alignSelf: "flex-start",
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    overflow: "hidden",
  },
  icon: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  iconBackground: {
    backgroundColor: "rgba(222, 114, 189, 0.2)",
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 160,
    maxWidth: "75%",
    flexShrink: 1,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#242020",
    fontFamily: "Open Sans",
    lineHeight: 19,
    maxWidth: "100%",
    textAlign: "left",
    paddingLeft: 12,
  },
  time: {
    fontSize: 12,
    fontWeight: "400",
    color: "#242020",
    fontFamily: "Open Sans",
    lineHeight: 16,
    marginTop: 3,
    flexShrink: 1,
    textAlign: "left",
    paddingLeft: 12,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "#A4ACBC",
    fontFamily: "Open Sans",
    lineHeight: 19,
    marginTop: 3,
    flexGrow: 1,
    textAlign: "left",
    width: "110%",
    paddingLeft: 12,
  },
  status: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DE728D",
    fontFamily: "Poppins",
    textAlign: "right",
    lineHeight: 21,
    position: "absolute",
    top: 14,
    right: 14,
  },
  completedContainer: {
    backgroundColor: "#F1F3FA",
  },
  completedStatus: {
    color: "#5E6676",
  },
  incompleteContainer: {
    backgroundColor: "#FFF5F8",
  },
  incompleteDescription: {
    color: "#DE728D",
  },
});

export default ActivityCard;
