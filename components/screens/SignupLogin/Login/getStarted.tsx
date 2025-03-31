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

const GetStartedScreen = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
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

      {/* Create Account Button */}
      <TouchableOpacity 
        style={styles.createAccountButton} 
        onPress={() => router.push('/signup/createAccount')}
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

      <LoginPopup 
        isVisible={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(20),
  },
  logo: {
    width: s(200),
    height: s(200),
    marginBottom: s(40),
  },
  titleText: {
    fontSize: s(48),
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#DE728D',
    textAlign: 'center',
    marginBottom: s(50),
    lineHeight: s(60),
  },
  createAccountButton: {
    backgroundColor: '#DE728D',
    paddingVertical: s(16),
    paddingHorizontal: s(30),
    borderRadius: s(100),
    width: '100%',
    alignItems: 'center',
    marginBottom: s(20),
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
