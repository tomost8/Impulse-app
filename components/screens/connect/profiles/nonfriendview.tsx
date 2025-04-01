import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import PointsBar from '@/components/ui/userprofile/pointsbar';
import Bio from '@/components/ui/userprofile/bio';
import FriendRequestSentPopup from './friendrequestsent';
import Header from '@/components/ui/userprofile/header';

interface NonFriendViewScreenProps {
  loading: boolean;
  nonFriend: any;
}

const NonFriendViewScreen = (props: NonFriendViewScreenProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }
  console.log('NonFriendViewScreen props:', props.nonFriend);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [showRequestSentPopup, setShowRequestSentPopup] = useState(false);

  // Sample data
  const nonFriend = {
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

  const handleSendRequest = () => {
    if (!isRequestSent) {
      setShowRequestSentPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowRequestSentPopup(false);
    setIsRequestSent(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header
          onBackPress={() => router.back()}
          name={props.nonFriend.first_name + ' ' + props.nonFriend.last_name}
          username={props.nonFriend.username}
          profileImage={props.nonFriend.profile_picture}
        />

        {/* Points Bar */}
        <PointsBar 
          points={props.nonFriend.point.points}
          communities={nonFriend.communities}
        />

        {/* Bio Section */}
        <Bio 
          bioText={props.nonFriend.bio}
          primaryActivity={props.nonFriend.primary_goal}
          secondaryActivity={props.nonFriend.secondary_goal}
          gender={props.nonFriend.gender}
          timezone={props.nonFriend.timezone}
        />
      </ScrollView>

      {/* Friend Request Button */}
      <TouchableOpacity 
        style={[
          styles.friendRequestButton,
          isRequestSent && styles.requestSentButton
        ]}
        onPress={handleSendRequest}
      >
        <Text style={styles.buttonText}>
          {isRequestSent ? "Request Sent" : "Send Friend Request"}
        </Text>
      </TouchableOpacity>

      <FriendRequestSentPopup 
        isVisible={showRequestSentPopup}
        onClose={handlePopupClose}
      />
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
    marginBottom: 80, // Space for button
  },
  friendRequestButton: {
    position: 'absolute',
    bottom: 24, // Gap from bottom of screen
    left: 20,
    right: 20,
    height: 48,
    backgroundColor: '#DE728D',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8, 
  },
  requestSentButton: {
    backgroundColor: 'rgba(222, 114, 141, 0.50)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default NonFriendViewScreen;