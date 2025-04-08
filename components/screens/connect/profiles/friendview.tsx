import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  Text
} from 'react-native';
import { router } from 'expo-router';
import Header from '@/components/ui/userprofile/header';
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <Header
          onBackPress={() => router.back()}
          name={props.friend.first_name + ' ' + props.friend.last_name}
          username={props.friend.username}
          profileImage={props.friend.profile_picture}
        />

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
  goalsSection: {
    marginTop: -16, // Adjust spacing between header and goals
    marginBottom: 16, // Add space before points bar
  },
});

export default FriendViewScreen;
