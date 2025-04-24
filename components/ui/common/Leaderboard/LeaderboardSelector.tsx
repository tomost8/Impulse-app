import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for dropdown arrow

// Options for the leaderboard selector
type LeaderboardPeriod = 'POINTS_WEEKLY' | 'POINTS_MONTHLY' | 'POINTS_ALL';
const leaderboardOptions: LeaderboardPeriod[] = ['POINTS_WEEKLY', 'POINTS_MONTHLY', 'POINTS_ALL'];
const displayOptions = ["Weekly", "Monthly", "All Time"];

interface LeaderboardSelectorProps {
  selectedPeriod: LeaderboardPeriod;
  setSelectedPeriod: (period: LeaderboardPeriod) => void;
}

// Updated helper function to get display text from option value
const getDisplayText = (value: LeaderboardPeriod): string => {
  const index = leaderboardOptions.indexOf(value);
  return index !== -1 ? displayOptions[index] : value;
};

const LeaderboardSelector: React.FC<LeaderboardSelectorProps> = ({
  selectedPeriod,
  setSelectedPeriod,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Button to open dropdown */}
      <TouchableOpacity style={styles.selectorButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>{getDisplayText(selectedPeriod)}</Text>
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
                    item === selectedPeriod && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setSelectedPeriod(item as LeaderboardPeriod);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{getDisplayText(item)}</Text>
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
