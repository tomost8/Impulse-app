import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { s } from 'react-native-size-matters';
import { router } from 'expo-router';
import LoginPopup from './LoginPopup';

interface GetStartedScreenProps {
  error: string | null;
  tryLogin: (
    email: string, 
    password: string, 
    rememberMe: boolean, 
    onSuccess?: () => void
  ) => void;
}

const GetStartedScreen = ({ tryLogin, error }: GetStartedScreenProps) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Logo */}
        <Image
          source={require('@/assets/images/bigLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Headline */}
        <Text style={styles.titleText}>
          Let's get{'\n'}started
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        {/* Create Account Button */}
        <TouchableOpacity 
          style={styles.createAccountButton} 
          onPress={() => router.push('/(auth)/createAccount')}
        >
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => setShowLoginPopup(true)}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      <LoginPopup 
        isVisible={showLoginPopup}
        error={error}
        onClose={() => setShowLoginPopup(false)}
        tryLogin={tryLogin}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0EDFD',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: s(24),
    paddingTop: s(55), // Adjust this value to move logo up/down
  },
  bottomContainer: {
    paddingHorizontal: s(24),
    paddingBottom: s(38), // Adjust bottom padding
    alignItems: 'center',
  },
  logo: {
    width: s(180),
    height: s(180),
    marginBottom: s(125),
    alignSelf: 'center',
  },
  titleText: {
    fontSize: s(40),
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#DE728D',
    textAlign: 'left',
    lineHeight: s(50),
    paddingTop: 75, 
  },
  createAccountButton: {
    backgroundColor: '#DE728D',
    paddingVertical: s(16),
    paddingHorizontal: s(32),
    borderRadius: s(100),
    width: s(318), // Fixed width from Figma
    alignItems: 'center',
    marginBottom: s(24),
  },
  createAccountText: {
    fontSize: s(16),
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: s(14),
    color: '#242020',
    fontFamily: 'Open Sans',
  },
  loginLink: {
    fontSize: s(14),
    color: '#DE728D',
    fontWeight: '600',
    fontFamily: 'Open Sans',
  },
});

export default GetStartedScreen;
