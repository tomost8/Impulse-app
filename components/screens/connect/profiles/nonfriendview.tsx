import React, { useState } from 'react';
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
import Bio from '@/components/ui/userprofile/bio';
import FriendRequestSentPopup from './friendrequestsent';

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
          <Text style={styles.title}>Partner Insights</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image 
            source={nonFriend.profileImage}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{nonFriend.name}</Text>
          <Text style={styles.username}>{nonFriend.username}</Text>
        </View>

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

      {/* Send Friend Request Button */}
      <TouchableOpacity 
        style={[
          styles.sendRequestButton,
          isRequestSent && styles.requestSentButton
        ]}
        onPress={handleSendRequest}
      >
        <Text style={styles.sendRequestText}>
          {isRequestSent ? "Request Sent" : "Send Friend Request"}
        </Text>
      </TouchableOpacity>

      {/* Friend Request Sent Popup */}
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
  },
  crescentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crescentImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  profileSection: {
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: '#666666',
  },
  sendRequestButton: {
    backgroundColor: '#DE728D',
    borderRadius: 100,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 34,
  },
  requestSentButton: {
    backgroundColor: 'rgba(222, 114, 141, 0.50)',
  },
  sendRequestText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default NonFriendViewScreen;