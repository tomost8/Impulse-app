import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import { convertUtcToLocal } from "@/utils/timezoneProcessing";
import { getLabelByCategory, getIconByCategory } from "@/utils/goals";

type PostActivityCardProps = {
  category: string;
  scheduledDatetime: string;
  duration: number;
  status: string;
  description: string;
  timezone: string;
  isSelected: boolean;
  onSelect: () => void;
};

const PostActivityCard: React.FC<PostActivityCardProps> = ({
  category,
  scheduledDatetime,
  duration,
  description,
  timezone,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selectedCard]}
      onPress={onSelect}
    >
      <View style={styles.cardContent}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Image source={getIconByCategory(category) as ImageSourcePropType} style={styles.icon} />
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
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
      </View>

      {/* Check Icon */}
      <View style={styles.rightContent}>
        <Image 
          source={isSelected ? 
            require("@/assets/icons/greencheck.png") : 
            require("@/assets/icons/circleunfilled.png")
          } 
          style={styles.checkIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
  selectedCard: {
    backgroundColor: "#E8F3FF",
    borderColor: "#007AFF",
    borderWidth: 1,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContent: {
    position: "absolute",
    right: 14,
    top: 14,
    alignItems: "flex-end",
    gap: 8,
  },
  checkIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
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
    fontWeight: "500",
    color: "#DE728D",
    fontFamily: "Poppins",
    textAlign: "right",
    lineHeight: 21,
  },
});

export default PostActivityCard;
