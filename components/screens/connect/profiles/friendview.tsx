import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { router } from 'expo-router';
import PointsBar from '@/components/ui/userprofile/pointsbar';
import DailyGoals from '@/components/ui/userprofile/dailygoals';
import Bio from '@/components/ui/userprofile/bio';

interface FriendViewProps {
  name: string;
  username: string;
  profileImage: any;
  points: number;
  communities: number;
}

const FriendViewScreen = () => {
  // Sample data
  const friend = {
    name: 'First Name Last Name',
    username: '@username',
    profileImage: require('@/assets/images/andrew.png'),
    points: 400,
    communities: 15,
    bioText: 'Lorem ipsum dolor sit amet consectetur. Elit nisi amet semper arcu. Magna suspendisse purus sed posuere tincidunt blandit nibh ornare nunc. Venenatis id quam gravida nisi. Morbi tincidunt convallis enim tristique mus. Tempus vitae morbi ut.',
    primaryActivity: 'Working Out',
    secondaryActivity: 'Rise & Shine',
    gender: 'Female',
    timezone: 'GMT +5'
  };

  // Sample daily goals data
  const dailyGoals = [
    {
      category: 'RISE_AND_SHINE',
      scheduledDatetime: '2024-02-20T14:00:00Z',
      duration: 60,
      status: 'In progress',
      description: 'Activity Description: text text text text',
    },
    {
      category: 'RISE_AND_SHINE',
      scheduledDatetime: '2024-02-20T14:00:00Z',
      duration: 60,
      status: 'In progress',
      description: 'Activity Description: text text text text',
    },
    {
      category: 'RISE_AND_SHINE',
      scheduledDatetime: '2024-02-20T14:00:00Z',
      duration: 60,
      status: 'In progress',
      description: 'Activity Description: text text text text',
    },
  ];

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Crescent Background */}
        <View style={styles.crescentContainer}>
          <Image 
            source={require("@/assets/icons/crescent.png")}
            style={styles.crescentImage}
          />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Image 
              source={require("@/assets/icons/backArrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Friend Insights</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image 
            source={friend.profileImage}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{friend.name}</Text>
          <Text style={styles.username}>{friend.username}</Text>
        </View>

        {/* Daily Goals Section with custom style override */}
        <View style={styles.goalsWrapper}>
          <DailyGoals 
            goals={dailyGoals} 
            cardStyle={{ backgroundColor: 'transparent' }}
          />
        </View>

        {/* Points Bar */}
        <PointsBar 
          points={friend.points}
          communities={friend.communities}
        />

        {/* Bio Section */}
        <Bio 
          bioText={friend.bioText}
          primaryActivity={friend.primaryActivity}
          secondaryActivity={friend.secondaryActivity}
          gender={friend.gender}
          timezone={friend.timezone}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  crescentContainer: {
    position: 'absolute',
    top: 0,
    left: -30,
    right: 25,
    height: 205,
    zIndex: 0,
  },
  crescentImage: {
    width: '115%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    zIndex: 1,
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
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#242020',
    fontWeight: '600',
    marginLeft: 6,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 5,
    zIndex: 1,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 18,
    marginTop: 15,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 6,
  },
  username: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  goalsWrapper: {
    backgroundColor: 'transparent',
    '& > *': {
      backgroundColor: 'transparent',
    },
  },
});

export default FriendViewScreen;
