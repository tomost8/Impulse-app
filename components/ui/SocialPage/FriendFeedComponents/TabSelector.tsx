import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

// Import underline image
import underlineImage from "@/assets/icons/underline.png";

const TabSelector: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"Friends" | "My Communities">(
    "Friends"
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setSelectedTab("Friends")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Friends" && styles.selectedText,
            ]}
          >
            Friends
          </Text>
          {selectedTab === "Friends" && (
            <Image
              source={require("@/assets/icons/underline.png")}
              style={styles.underline}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setSelectedTab("My Communities")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "My Communities" && styles.selectedText,
            ]}
          >
            My Communities
          </Text>
          {selectedTab === "My Communities" && (
            <Image
              source={require("@/assets/icons/underline.png")}
              style={styles.underline}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
  },
  tab: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    color: "#242020",
    fontFamily: "Poppins",
    marginBottom: 4,
  },
  selectedText: {
    fontWeight: "600",
  },
  underline: {
    marginTop: 4,
    width: 90, // Adjust based on Figma design
    height: 3,
    resizeMode: "contain",
  },
});

export default TabSelector;
