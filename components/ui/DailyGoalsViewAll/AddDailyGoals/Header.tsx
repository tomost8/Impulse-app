import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Import back arrow icon
const backArrow = require("@/assets/icons/backArrow.png");

const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={backArrow} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Add Daily Goals</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70, // Match Figma height
    backgroundColor: "#E0EDFD",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  backButton: {
    padding: 10, // Adds touchable area
    marginRight: 15, // Moves the title slightly to the right
  },
  backIcon: {
    width: 10,
    height: 17,
    tintColor: "#242020", // Dark color from Figma
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#242020", // Dark color
  },
});

export default Header;

