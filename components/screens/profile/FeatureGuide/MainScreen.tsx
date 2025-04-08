import React from 'react';
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

const FeatureGuide = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.push('/account/settings')}
          >
            <Image
              source={require("@/assets/icons/backArrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Feature Guide</Text>
        </View>
      </View>

      {/* Activity Cards Container */}
      <View style={styles.cardsContainer}>
        {/* Add Activity Card */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Image
              source={require("@/assets/icons/addActivity.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.cardTitle}>Add an Activity</Text>
        </View>

        {/* Complete Activity Card */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Image
              source={require("@/assets/icons/completeActivity.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.cardTitle}>Complete an Activity</Text>
        </View>

        {/* Join Community Card */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Image
              source={require("@/assets/icons/joinCommunity.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.cardTitle}>Join a Community</Text>
        </View>

        {/* Custom Notifications Card */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Image
              source={require("@/assets/icons/customNotifications.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.cardTitle}>Custom Notifications</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#E0EDFD',
    paddingTop: s(25),
    paddingBottom: s(16),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(16),
  },
  backButton: {
    marginRight: s(8),
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
    backgroundColor: '#F9E3E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#DE728D',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
});

export default FeatureGuide;
