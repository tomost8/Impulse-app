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

const NonFriendViewScreen = () => {
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

  const handleBack = () => {
    router.back();
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
          onBackPress={handleBack}
          name={nonFriend.name}
          username={nonFriend.username}
          profileImage={nonFriend.profileImage}
        />

        {/* Points Bar */}
        <PointsBar 
          points={nonFriend.points}
          communities={nonFriend.communities}
        />

        {/* Bio Section */}
        <Bio 
          bioText={nonFriend.bioText}
          primaryActivity={nonFriend.primaryActivity}
          secondaryActivity={nonFriend.secondaryActivity}
          gender={nonFriend.gender}
          timezone={nonFriend.timezone}
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