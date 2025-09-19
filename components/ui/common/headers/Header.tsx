import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, Platform } from "react-native";

// Import the back arrow icon
const backArrow = require("@/assets/icons/backArrow.png");

interface HeaderProps {
  title: string;
  onBackPress: () => void;
  containerStyle?: any;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  onBackPress,
  containerStyle
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Image source={backArrow} style={styles.backIcon} />
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#E0EDFD",
  },
  container: {
    width: "100%",
    backgroundColor: "#E0EDFD",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    paddingBottom: 4,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10, // Enlarges touch area for usability
  },
  backIcon: {
    width: 10,
    height: 17,
    tintColor: "#242020",
    marginRight: 12, // Space between icon and title
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#242020",
  },
});

export default Header;
