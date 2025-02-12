import React from "react";
import { View, Text, StyleSheet } from "react-native";

const QuoteCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.quote}>
        "You'll never change your life until you change something you do daily.
        The secret of your success is found in your daily routine."
      </Text>
      <Text style={styles.author}>- Alex K</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f4f9ff",
    borderRadius: 12,
    marginVertical: 20,
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
  author: {
    fontSize: 14,
    textAlign: "right",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default QuoteCard