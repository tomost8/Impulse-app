import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { router } from 'expo-router';
import PointsBar from '@/components/ui/userprofile/pointsbar';
import Bio from '@/components/ui/userprofile/bio';
import DailyGoals from '@/components/ui/userprofile/dailygoals';
import { getLabelByCategory } from '@/utils/goals';

interface FriendViewScreenProps {
  loading: boolean;
  friend: any;
  communityCount: number;
  activities: any[];
}

const FriendViewScreen = (props: FriendViewScreenProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }
  console.log('FriendViewScreen props:', props.friend);
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
    timezone: 'GMT +5',
    dailyGoals: [
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
    ]
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerExtension}>
          <SafeAreaView>
            <View style={styles.headerRow}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Image 
                  source={require("@/assets/icons/backArrow.png")}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Partner Insights</Text>
            </View>
          </SafeAreaView>
        </View>

        {/* Custom Header Section */}
        <View style={styles.headerContainer}>
          {/* Crescent Background */}
          <View style={styles.crescentContainer}>
            <View style={styles.crescent} />
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              source={{ uri: props.friend.profile_picture }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{props.friend.first_name} {props.friend.last_name}</Text>
            <Text style={styles.username}>@{props.friend.username}</Text>
          </View>
        </View>

        {/* Daily Goals Section */}
        <View style={styles.goalsSection}>
          <DailyGoals 
            goals={props.activities}
            timezone={props.friend.timezone}
            //cardStyle={{ backgroundColor: 'transparent' }}
          />
        </View>

        {/* Points Bar */}
        <PointsBar 
          points={props.friend.point.points}
          communities={props.communityCount}
        />

        {/* Bio Section */}
        <Bio 
          bioText={props.friend.bio}
          primaryActivity={getLabelByCategory(props.friend.primary_goal)}
          secondaryActivity={getLabelByCategory(props.friend.secondary_goal)}
          gender={props.friend.gender}
          timezone={props.friend.timezone}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerExtension: {
    backgroundColor: '#E0EDFD',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 12,
  },
  backButton: {
    width: 11,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginLeft: 5,
  },
  backIcon: {
    width: 11,
    height: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  headerContainer: {
    position: 'relative',
    paddingBottom: 16,
  },
  crescentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    overflow: 'hidden',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 60,
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginTop: 16,
  },
  username: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#979797',
    marginTop: 4,
  },
  crescent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    borderBottomLeftRadius: 800,
    borderBottomRightRadius: 800,
    backgroundColor: '#E0EDFD',
    transform: [
      { scaleX: 1.3 },
      { translateY: -380 },
    ],
  },
  scrollView: {
    flex: 1,
  },
  goalsSection: {
    marginBottom: 16, // Add space before points bar
  },
});

export default FriendViewScreen;
