import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  currentIndex: number; // which story is active
  total: number;        // total number of stories
};

export default function StoryProgressBar({ currentIndex, total }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.track,
            i < currentIndex && styles.filled,      // previous stories = filled
            i === currentIndex && styles.active,   // current story = highlight
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 8,
  },
  track: {
    flex: 1,
    height: 3,
    backgroundColor: "#e0e0e0", // gray background
    marginHorizontal: 2,
    borderRadius: 2,
  },
  filled: {
    backgroundColor: "#DE728D", // pink for completed
  },
  active: {
    backgroundColor: "#DE728D", // same pink for active
    opacity: 0.7,               // slightly lighter to show "current"
  },
});
