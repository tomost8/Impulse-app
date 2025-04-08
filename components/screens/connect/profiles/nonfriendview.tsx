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
import { getLabelByCategory } from '@/utils/goals';

interface NonFriendViewScreenProps {
  loading: boolean;
  nonFriend: any;
  communityCount: number;
}

const NonFriendViewScreen = (props: NonFriendViewScreenProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [showRequestSentPopup, setShowRequestSentPopup] = useState(false);

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
        {/* Header Section */}
        <View style={headerStyles.headerContainer}>
          {/* Crescent Background */}
          <View style={headerStyles.crescentContainer}>
            <View style={headerStyles.crescent} />
          </View>

          {/* Header Content */}
          <View style={headerStyles.headerContent}>
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={require("@/assets/icons/backArrow.png")}
                style={headerStyles.backIcon}
              />
            </TouchableOpacity>
            <Text style={headerStyles.headerTitle}>User Profile</Text>
          </View>

          {/* Profile Section */}
          <View style={headerStyles.profileSection}>
            <Image
              source={{ uri: props.nonFriend.profile_picture }}
              style={headerStyles.profileImage}
            />
            <Text style={headerStyles.name}>
              {props.nonFriend.first_name} {props.nonFriend.last_name}
            </Text>
            <Text style={headerStyles.username}>@{props.nonFriend.username}</Text>
          </View>
        </View>

        {/* Points Bar */}
        <PointsBar 
          points={props.nonFriend.point.points}
          communities={props.communityCount}
        />

        {/* Bio Section */}
        <Bio 
          bioText={props.nonFriend.bio}
          primaryActivity={getLabelByCategory(props.nonFriend.primary_goal)}
          secondaryActivity={getLabelByCategory(props.nonFriend.secondary_goal)}
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

const headerStyles = StyleSheet.create({
  headerContainer: {
    position: 'relative',
    paddingBottom: 16,
  },
  crescentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 350,
    overflow: 'hidden',
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
      { translateY: -350 },
    ],
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    zIndex: 1,
  },
  backIcon: {
    width: 11,
    height: 15,
    marginRight: 14,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 50,
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
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
});

export default NonFriendViewScreen;