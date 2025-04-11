import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { s } from "react-native-size-matters";
import { router } from "expo-router";
import AccountChangedConfirmation from '../popups/AccountChangedConfirmation';

interface SupportScreenProps {
  loading: boolean;
  handleUpdateUser: () => void;
}

const SupportScreen = ({ handleUpdateUser, loading }: SupportScreenProps) => {
  if (loading) {
    return <ActivityIndicator />;
  }
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleApply = () => {
    if (code === 'INSPIRE') {
      handleUpdateUser();
      setError('');
      setShowConfirmation(true);
    } else {
      setError('Error: Code is incorrect');
    }
  };

  const handleDeleteAccountPress = () => {
    Linking.openURL('https://share.hsforms.com/1w35t-H25T2CMEpiTciIoyAscwc9');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
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
            <Text style={styles.headerTitle}>Support and Account Deletion</Text>
          </View>
        </SafeAreaView>
      </View>
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Community Leader Account Change</Text>
        <View style={styles.codeSection}>
          <TextInput
            style={styles.codeInput}
            placeholder="Enter given code"
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={handleApply}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteAccountButton}
        onPress={handleDeleteAccountPress}
      >
        <Text style={styles.buttonText}>Account Deletion Form</Text>
      </TouchableOpacity>
      <AccountChangedConfirmation 
        visible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    backgroundColor: '#E0EDFD',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: 16,
  },
  codeSection: {
    flexDirection: 'row',
    gap: 10,
  },
  codeInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  applyButton: {
    height: 48,
    paddingHorizontal: 24,
    backgroundColor: '#DE728D',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
  errorText: {
    color: '#DE728D',
    fontSize: 12,
    fontFamily: 'Open Sans',
    marginTop: 8,
    marginLeft: 16,
  },
  deleteAccountButton: {
    borderRadius: 30,
    backgroundColor: "#DE728D",
    marginTop: "auto",
    marginBottom: 40,
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
