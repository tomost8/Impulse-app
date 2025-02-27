import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

function Header() {
  return (
    <View accessibilityRole="banner">
      <View style={styles.statusBar}>
        <Text style={styles.statusBarText}>9:41</Text>
      </View>
      <View style={styles.headerContent}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => {}}
        >
          <Image
            resizeMode="contain"
            source={{
              uri: "URL",
            }}
            style={styles.backIcon}
            accessibilityIgnoresInvertColors={true}
          />
        </TouchableOpacity>
        <Text
          style={styles.headerText}
          accessibilityRole="heading"
          accessibilityLevel={1}
        >
          Redeem
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    paddingHorizontal: 37,
    paddingTop: 11,
    paddingBottom: 55,
  },
  statusBarText: {
    fontFamily: "SF Pro Text, sans-serif",
    fontSize: 17,
    color: "#242020",
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: -0.41,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
    color: "rgba(68, 68, 68, 1)",
    fontWeight: "600",
  },
});

export default Header;
