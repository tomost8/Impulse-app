import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  SafeAreaView,
} from "react-native";
import { s } from "react-native-size-matters";
import { router } from "expo-router";

function Header() {
  return (
    <View style={styles.headerContainer}>
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
        <Text style={styles.headerTitle}>Support and Account Deletion</Text>
      </View>
    </View>
  );
}

const SupportScreen = () => {
  const handleDeleteAccountPress = () => {
    Linking.openURL('https://share.hsforms.com/1w35t-H25T2CMEpiTciIoyAscwc9');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.emailSection}>
        <View style={styles.emailContainer}>
          <Image 
            source={require("@/assets/icons/email.png")}
            style={styles.emailIcon}
          />
          <View>
            <Text style={styles.label}>Email Us At</Text>
            <Text style={styles.email}>support@findyourimpulse.com</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteAccountButton}
        onPress={handleDeleteAccountPress}
      >
        <Text style={styles.buttonText}>Account Deletion Form</Text>
      </TouchableOpacity>
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
    marginLeft: 5,
    marginRight: 5,
  },
  headerTitle: {
    color: '#242020',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  emailSection: {
    paddingHorizontal: s(20),
    paddingVertical: s(20),
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailIcon: {
    width: s(50),
    height: s(50),
    marginRight: s(12),
  },
  label: {
    color: "#A4ACBC",
    fontFamily: "Open Sans",
    fontSize: s(12),
    fontWeight: "400",
    marginBottom: 4,
  },
  email: {
    color: "#242020",
    fontFamily: "Open Sans",
    fontSize: s(15),
    fontWeight: "400",
  },
  deleteAccountButton: {
    borderRadius: 30,
    backgroundColor: "#DE728D",
    marginTop: "auto",
    marginBottom: 20,
    marginHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins",
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default SupportScreen;
