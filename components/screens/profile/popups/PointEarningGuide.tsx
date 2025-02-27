import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const PointEarningGuide = () => {
  const handleGotItPress = () => {
    // Handle button press
  };

  const guideItems = [
    { title: "Primary Goal", points: 100 },
    { title: "Secondary Goal", points: 75 },
    { title: "Additional Activity Posts", points: 45, suffix: "Each" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View
        style={styles.container}
        accessibilityRole="region"
        accessibilityLabel="Point Earning Guide"
      >
        <View style={styles.contentWrapper}>
          <View style={styles.titleContainer}>
            <Text
              style={styles.title}
              accessibilityRole="header"
              accessibilityLevel={1}
            >
              Point Earning Guide
            </Text>
          </View>
          <View style={styles.guideContent} accessibilityRole="list">
            <Text style={styles.content} accessibilityRole="text">
              Earn points for posting accountability pictures and completing
              challenges and redeem them for rewards! Set your primary and
              secondary goals in profile.
            </Text>
            {guideItems.map((item, index) => (
              <View key={index} accessibilityRole="listitem">
                <Text style={styles.content}>
                  {item.title}: {item.points} Points
                  {item.suffix ? ` ${item.suffix}` : ""}
                </Text>
              </View>
            ))}
            <Text style={styles.content} accessibilityRole="text">
              Any activity you complete that is not a primary or secondary goal
              is worth 45 points. You do not need to indicate this anywhere.
            </Text>
            <Text
              style={[styles.content, styles.note]}
              accessibilityRole="text"
            >
              Note: You can only earn points for the first picture in each goal
              category, per day. For example, if workout is your primary goal
              and you post 2 workout pictures in the same day, you only earn 100
              points for the day.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel="Got it"
          accessibilityHint="Dismiss the point earning guide"
          onPress={handleGotItPress}
        >
          <Text style={styles.buttonText}>Got it</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    borderRadius: 25,
    maxWidth: 350,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
  },
  contentWrapper: {
    width: 310,
    maxWidth: "100%",
    alignItems: "stretch",
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    fontWeight: "600",
    color: "#242020",
  },
  guideContent: {
    marginTop: 8,
  },
  content: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    marginBottom: 16,
    color: "#242020",
  },
  note: {
    fontStyle: "italic",
  },
  button: {
    alignSelf: "stretch",
    borderRadius: 30,
    marginTop: 20,
    minHeight: 50,
    width: 310,
    maxWidth: "100%",
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },
});

export default PointEarningGuide;
