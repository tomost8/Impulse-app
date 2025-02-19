import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for dropdown arrow

// Options for the leaderboard selector
const leaderboardOptions = ["Weekly", "Monthly", "All Time"];

interface LeaderboardSelectorProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const LeaderboardSelector: React.FC<LeaderboardSelectorProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Button to open dropdown */}
      <TouchableOpacity style={styles.selectorButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>{selectedOption}</Text>
        <Ionicons name="chevron-down" size={16} color="white" style={styles.icon} />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <FlatList
              data={leaderboardOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item === selectedOption && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setSelectedOption(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// Styles based on Figma
const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 10, // Adjusted positioning
  },
  selectorButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DE728D",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Open Sans",
  },
  icon: {
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    backgroundColor: "white",
    width: 150,
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 5, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  option: {
    padding: 12,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#F5D3DA",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#242020",
  },
});

export default LeaderboardSelector;
