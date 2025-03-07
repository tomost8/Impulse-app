import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface TopBarProps {
  onLeaderboardPress?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onLeaderboardPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Image 
          source={require("@/assets/icons/backArrow.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.leaderboardButton}
        onPress={onLeaderboardPress}
      >
        <Image 
          source={require("@/assets/icons/leaderboard.png")}
          style={styles.leaderboardIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: '#0066FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  leaderboardButton: {
    padding: 8,
  },
  leaderboardIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
});

export default TopBar;
