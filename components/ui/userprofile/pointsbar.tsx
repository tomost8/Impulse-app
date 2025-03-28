import React from 'react';
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity,
  StyleSheet 
} from 'react-native';
import { router } from 'expo-router';
// Services
import { useUserData } from '@/services/UserPreferencesContext';

interface PointsBarProps {
  points: number;
  communities: number;
}

const PointsBar: React.FC<PointsBarProps> = ({
  points,
  communities
}) => {
  const { fetching, user } = useUserData();
  if (fetching) {
    return <Text>Loading...</Text>;
  }
  const handleCommunitiesPress = () => {
    // Update the navigation path to match your app's structure
    router.push(`/user/${user.id}/communityList`);
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
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(222, 114, 141, 0.25)',
    padding: 16,
  },
  statColumn: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
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
    marginLeft: 5,
  },
});

export default PointsBar;
