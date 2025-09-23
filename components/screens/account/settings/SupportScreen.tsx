import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Linking, TextInput, Platform, StatusBar } from "react-native";
import { s } from "react-native-size-matters";
import { router } from "expo-router";

import Header from "@/components/ui/common/headers/Header";
import LoadingOverlay from "@/components/ui/common/LoadingOverlay";
import { AccountChangedConfirmation } from '@/components/features/account';

interface SupportScreenProps {
  handleUpdateUser: () => Promise<void>;
}

const SupportScreen = ({ handleUpdateUser }: SupportScreenProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleApply = async () => {
    if (code === 'INSPIRE') {
      setError('');
      setIsUpdating(true);
      try {
        await handleUpdateUser(); 
        setCode('');
        setShowConfirmation(true); 
      } catch (error) {
        setError('Error: Update failed');
        console.error('Update failed:', error);
      } finally {
        setIsUpdating(false);
      }
    } else {
      setError('Error: Invalid Code');
    }
  };

  const handleDeleteAccountPress = () => {
    Linking.openURL('https://share.hsforms.com/1w35t-H25T2CMEpiTciIoyAscwc9');
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Support and Account Deletion"
        onBackPress={() => router.back()}
      />
      <View style={[styles.content, isUpdating && styles.disabledContent]}>
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
              editable={!isUpdating}
            />
            <TouchableOpacity 
              style={[styles.applyButton, isUpdating && styles.disabledButton]}
              onPress={handleApply}
              disabled={isUpdating}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <TouchableOpacity
          style={[styles.deleteAccountButton, isUpdating && styles.disabledButton]}
          onPress={handleDeleteAccountPress}
          disabled={isUpdating}
        >
          <Text style={styles.buttonText}>Account Deletion Form</Text>
        </TouchableOpacity>
      </View>
      
      <LoadingOverlay visible={isUpdating} />
      
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  disabledContent: {
    opacity: 0.5,
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
  disabledButton: {
    opacity: 0.6,
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
