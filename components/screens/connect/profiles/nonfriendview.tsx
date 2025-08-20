import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import PointsBar from '@/components/ui/userprofile/pointsbar';
import Bio from '@/components/ui/userprofile/bio';
import FriendRequestSentPopup from './friendrequestsent';
import { getLabelByCategory } from '@/utils/goals';
import FriendRequestAccepted from './friendrequestaccepted';

interface NonFriendViewScreenProps {
  loading: boolean;
  nonFriend: any;
  communityCount: number;
  isPendingRequest?: boolean;
  pendingRole?: string;
  onAcceptRequest?: (friendId: number) => void;
  onSendRequest?: (friendId: number) => void;
}

const NonFriendViewScreen = (props: NonFriendViewScreenProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }
  const [showAcceptedPopup, setShowAcceptedPopup] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(props.isPendingRequest && props.pendingRole === 'sender');
  const [showRequestSentPopup, setShowRequestSentPopup] = useState(false);

  const handleSendRequest = () => {
    if (!isRequestSent) {
      props.onSendRequest?.(props.nonFriend.id);
      props.onSendRequest?.(props.nonFriend.id);
      setShowRequestSentPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowRequestSentPopup(false);
    setIsRequestSent(true);
  };

  const handleAcceptRequest = () => {
    if (props.onAcceptRequest) {
      props.onAcceptRequest(props.nonFriend.id);
    }
    if (props.onAcceptRequest) {
      props.onAcceptRequest(props.nonFriend.id);
    }
    setShowAcceptedPopup(true);
  };

  const handleAcceptedPopupClose = () => {
    setShowAcceptedPopup(false);
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
              source={{ uri: props.nonFriend.profile_picture }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{props.nonFriend.first_name} {props.nonFriend.last_name}</Text>
            <Text style={styles.username}>@{props.nonFriend.username}</Text>
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

      <View style={styles.buttonContainer}>
        {/* Update the accept button to use handleAcceptRequest */}
        <TouchableOpacity 
          style={styles.acceptRequestButton}
          onPress={handleAcceptRequest}
        >
          <Text style={styles.buttonText}>Accept Friend Request</Text>
        </TouchableOpacity>

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
      </View>

      {/* Add the accepted popup */}
      <FriendRequestAccepted 
        isVisible={showAcceptedPopup}
        onClose={handleAcceptedPopupClose}
      />

      {/* Existing sent popup */}
      <FriendRequestSentPopup 
        isVisible={showRequestSentPopup}
        onClose={handlePopupClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerExtension: {
    backgroundColor: '#E0EDFD',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 34,
    left: 20,
    right: 20,
  },
  acceptRequestButton: {
    height: 48,
    backgroundColor: '#DE728D',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15, // Gap between buttons
  },
  friendRequestButton: {
    height: 48,
    backgroundColor: '#DE728D',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
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