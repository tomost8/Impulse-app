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
    height: 65,
    backgroundColor: '#E0EDFD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#242020',
  },
  leaderboardButton: {
    padding: 8,
  },
  leaderboardIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#DE728D',
  },
});

export default TopBar;
