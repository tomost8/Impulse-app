import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';

const ConnectPopup: React.FC<ConnectPopupProps> = ({
  isVisible,
  onClose,
}) => {
  // ... handlers stay the same ...

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Connect with others</Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.closeButton}
            >
              <Image 
                source={require("@/assets/icons/cancel.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Partner Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Partner</Text>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={handleFindFriend}
            >
              <View style={styles.iconContainer}>
                <Image 
                  source={require("@/assets/icons/findfriend.png")}
                  style={styles.optionIcon}
                />
              </View>
              <Text style={styles.optionText}>Find a friend</Text>
            </TouchableOpacity>
          </View>

          {/* Groups Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Groups</Text>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={handleStartGroup}
            >
              <View style={styles.iconContainer}>
                <Image 
                  source={require("@/assets/icons/startgroup.png")}
                  style={styles.optionIcon}
                />
              </View>
              <Text style={styles.optionText}>Starting my own group</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionButton}
              onPress={handleJoinGroup}
            >
              <View style={styles.iconContainer}>
                <Image 
                  source={require("@/assets/icons/joinGroup.png")}
                  style={styles.optionIcon}
                />
              </View>
              <Text style={styles.optionText}>Joining a group</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // ... keep existing overlay and popup styles ...

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    width: 12, // Reduced from 24
    height: 12, // Reduced from 24
    resizeMode: 'contain',
    tintColor: '#979797',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#EFEEEE',
    borderRadius: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#FFFFFF', // Changed to white
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600', // Added bold
    color: '#000000',
  },
});

export default ConnectPopup; 