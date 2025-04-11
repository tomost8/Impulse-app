import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { s } from "react-native-size-matters";
import { router } from "expo-router";

function Header() {
  return (
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
          <Text style={styles.headerTitle}>Reset Password</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

function PasswordInput({ 
  placeholder, 
  value, 
  onChangeText 
}: { 
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          placeholder={placeholder}
          placeholderTextColor="#979797"
        />
        <TouchableOpacity 
          style={styles.hideButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={require("@/assets/icons/hide.png")}
            style={styles.hideIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface ResetPasswordScreenProps {
  loading: boolean;
}

const ResetPasswordScreen = ({ loading }: ResetPasswordScreenProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    // Handle password reset logic here
    console.log('Reset Password');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <PasswordInput
          placeholder="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <PasswordInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleResetPassword}
      >
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
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
  content: {
    paddingHorizontal: s(20),
    paddingTop: s(20),
  },
  inputContainer: {
    marginBottom: s(16),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: s(100),
    height: s(48),
  },
  input: {
    flex: 1,
    paddingHorizontal: s(20),
    fontSize: s(12),
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  hideButton: {
    padding: s(12),
    marginRight: s(8),
  },
  hideIcon: {
    width: s(24),
    height: s(24),
  },
  resetButton: {
    backgroundColor: '#DE728D',
    marginHorizontal: s(20),
    marginTop: 'auto',
    marginBottom: 40,
    padding: s(13),
    borderRadius: s(100),
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: s(16),
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default ResetPasswordScreen;
