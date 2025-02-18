import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface QuoteCardProps {
  quote: string;
  author: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, author }) => {
  return (
    <View style={styles.card}>
      {/* Left Quote Icon */}
      <Image source={require("@/assets/icons/quoteleft.png")} style={styles.quoteIconLeft} />

      {/* Quote Text */}
      <Text style={styles.quoteText}>{quote}</Text>

      {/* Author Name */}
      <Text style={styles.author}>- {author}</Text>

      {/* Right Quote Icon */}
      <Image source={require("@/assets/icons/quoteright.png")} style={styles.quoteIconRight} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F4F9FF", // ✅ Matches Figma background
    width: 320, // ✅ Matches Figma width
    height: 201, // ✅ Matches Figma height
    padding: 20, // ✅ Matches Figma spacing
    borderRadius: 16, // ✅ Matches Figma border-radius
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    alignSelf: "center",
  },
  quoteIconLeft: {
    position: "absolute",
    top: -10,
    left: -10,
    width: 50, // Approximated size from Figma
    height: 50,
    opacity: 0.5, // Matches Figma transparency
  },
  quoteIconRight: {
    position: "absolute",
    bottom: -10,
    right: -10,
    width: 50, 
    height: 50,
    opacity: 0.5,
  },
  quoteText: {
    fontSize: 14, // ✅ Matches Figma font size
    fontWeight: "600", // ✅ Matches Figma font weight
    fontFamily: "Poppins", // ✅ Matches Figma font family
    color: "#5E6676", // ✅ Matches Figma text color
    textAlign: "center",
    lineHeight: 20, // ✅ Matches Figma line height
    width: 250, // ✅ Matches text width in Figma
    marginBottom: 10, // ✅ Adds spacing before author
  },
  author: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Poppins",
    color: "#5E6676",
    marginTop: 5,
  },
});

export default QuoteCard;
