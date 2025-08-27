import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Linking,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import { s } from "react-native-size-matters";
import { router } from "expo-router";
import Header from "@/components/ui/common/headers/Header";



const FeedbackScreen = () => {
  const handleFeedbackForm = () => {
    Linking.openURL('https://share.hsforms.com/1XRfLG1DsS929ZXpTqtXcrAscwc9');
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Give Feedback"
        onBackPress={() => router.back()}
      />
      <ScrollView style={styles.content}>
        <Text style={styles.heading}>We want to hear from you!</Text>
        <Text style={styles.description}>
          We value your input more than anything. Tell us what's working, what's not, or what you'd love to see next! Who knows? Your suggestion might just become our next feature!{"\n\n"}
          As a thank you for leaving feedback you will be entered in a raffle for various gift card prizes. Reward selection is in the form below!
        </Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.feedbackButton}
        onPress={handleFeedbackForm}
      >
        <Text style={styles.buttonText}>Feedback Form</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerBackground: {
    backgroundColor: '#E0EDFD',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: s(12),
    paddingLeft: 4, 
  },
  backIcon: {
    width: 12,
    height: 16,
    tintColor: '#242020',
    marginLeft: 5,
    marginRight: 5,
  },
  headerTitle: {
    color: '#242020',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: s(25),
    paddingTop: s(20),
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#242020',
    marginBottom: s(12),
  },
  description: {
    fontSize: 15,
    fontFamily: 'Open Sans',
    color: '#242020',
    fontWeight: '500',
    lineHeight: s(18),
  },
  feedbackButton: {
    backgroundColor: '#DE728D',
    marginHorizontal: s(20),
    marginBottom: s(40),
    padding: s(13),
    borderRadius: s(100),
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: s(16),
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default FeedbackScreen;
