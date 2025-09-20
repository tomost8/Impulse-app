import React from "react";
import { Text, StyleSheet, View } from "react-native";

interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>
        Looking good, <Text style={styles.boldText}>{name}!</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start", // ✅ Left-aligns the text
    width: 321, // ✅ Matches Figma width constraint
    marginLeft: 10,
    marginBottom: 15, // ✅ Creates spacing before streak tracker
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#242020",
  },
  boldText: {
    fontWeight: "700",
  },
});

export default Greeting;
