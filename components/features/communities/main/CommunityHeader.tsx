import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CommunityHeaderProps {
  onLeaderboardPress?: () => void;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ onLeaderboardPress }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
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
    width: "100%",
    backgroundColor: "#E0EDFD",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 15,
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

export default CommunityHeader;
