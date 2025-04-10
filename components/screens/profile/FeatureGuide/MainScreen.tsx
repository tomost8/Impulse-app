import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { s } from "react-native-size-matters";
import { router } from 'expo-router';
import AddActivities from './AddActivities';
import CompleteActivities from './CompleteActivities';
import CustomNotifications from './CustomNotifications';
import JoinCommunity from './JoinCommunity';
import WalkthroughPopup from './WalkthroughPopup';

const FeatureGuide = () => {
  const [showAddActivities, setShowAddActivities] = useState(false);
  const [showCompleteActivities, setShowCompleteActivities] = useState(false);
  const [showCustomNotifications, setShowCustomNotifications] = useState(false);
  const [showJoinCommunity, setShowJoinCommunity] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <Image
                source={require("@/assets/icons/backArrow.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Feature Guide</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Activity Cards Container */}
      <View style={styles.cardsContainer}>
        {/* Add Activity Card */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => setShowAddActivities(true)}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require("@/assets/icons/addActivity.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.cardTitle}>Add an Activity</Text>
        </TouchableOpacity>

        {/* Complete Activity Card */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => setShowCompleteActivities(true)}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require("@/assets/icons/completeActivity.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.cardTitle}>Complete an Activity</Text>
        </TouchableOpacity>

        {/* Join Community Card */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => setShowJoinCommunity(true)}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require("@/assets/icons/joinCommunity.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.cardTitle}>Join a Community</Text>
        </TouchableOpacity>

        {/* Custom Notifications Card */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => setShowCustomNotifications(true)}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require("@/assets/icons/customNotifications.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.cardTitle}>Custom Notifications</Text>
        </TouchableOpacity>

        {/* New box for testing popup */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => setShowWalkthrough(true)}
        >
          <View style={styles.iconContainer}>
            <View style={styles.emptyIcon} />
          </View>
          <Text style={styles.cardTitle}>Testing Popup</Text>
        </TouchableOpacity>
      </View>

      <AddActivities 
        visible={showAddActivities}
        onClose={() => setShowAddActivities(false)}
      />

      <CompleteActivities 
        visible={showCompleteActivities}
        onClose={() => setShowCompleteActivities(false)}
      />

      <CustomNotifications 
        visible={showCustomNotifications}
        onClose={() => setShowCustomNotifications(false)}
      />

      <JoinCommunity 
        visible={showJoinCommunity}
        onClose={() => setShowJoinCommunity(false)}
      />

      <WalkthroughPopup 
        visible={showWalkthrough}
        onClose={() => setShowWalkthrough(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#E0EDFD',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(16),
    paddingTop: s(10),
    paddingBottom: s(16),
  },
  backButton: {
    marginRight: s(12),
    marginLeft: 4,
  },
  backIcon: {
    width: 10,
    height: 15,
    tintColor: '#242020',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  cardsContainer: {
    padding: 16,
    gap: 18,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    gap: 12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },
  icon: {
    width: 55,
    height: 55,
    tintColor: '#DE728D',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  emptyIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FBD9E0',
    borderRadius: 12,
  },
});

export default FeatureGuide;
