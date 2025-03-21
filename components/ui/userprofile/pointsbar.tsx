import React from 'react';
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity,
  StyleSheet 
} from 'react-native';
import { router } from 'expo-router';

interface PointsBarProps {
  points: number;
  communities: number;
}

const PointsBar: React.FC<PointsBarProps> = ({
  points,
  communities
}) => {
  const handleCommunitiesPress = () => {
    // Navigate to communities view
    router.push('/social/communities');
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        {/* Points */}
        <View style={styles.statColumn}>
          <Text style={styles.statNumber}>{points}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>

        {/* Separator */}
        <Image 
          source={require('@/assets/icons/Separator.png')}
          style={styles.separator}
        />

        {/* Communities */}
        <TouchableOpacity 
          style={styles.communitiesButton} 
          onPress={handleCommunitiesPress}
        >
          <View style={styles.statColumn}>
            <Text style={styles.statNumber}>{communities}</Text>
            <Text style={styles.statLabel}>Communities</Text>
          </View>
          <Image 
            source={require('@/assets/icons/arrowright.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(222, 114, 141, 0.25)',
    padding: 16,
  },
  statColumn: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  separator: {
    height: 40,
    width: 1,
    marginHorizontal: 24,
  },
  communitiesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#DE728D',
  },
});

export default PointsBar;
