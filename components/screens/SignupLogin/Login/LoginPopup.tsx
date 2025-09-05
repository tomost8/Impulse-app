import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  Image,
} from 'react-native';
import { s } from 'react-native-size-matters';
import { router } from 'expo-router';
import ForgotPassword from './forgotPassword';

interface LoginPopupProps {
  isVisible: boolean;
  error: string | null;
  onClose: () => void;
  tryLogin: (
    email: string, 
    password: string, 
    rememberMe: boolean, 
    onSuccess?: () => void
  ) => void;
}


const LoginPopup: React.FC<LoginPopupProps> = ({ isVisible, error, onClose, tryLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = async () => {
    tryLogin(email, password, rememberMe, onClose);
  }

  const handleCreateAccount = () => {
    onClose();
    router.push('/(auth)/createAccount');
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.title}>Hi, Welcome Back</Text>

          {/* Email/Username Input */}
          <TextInput
            style={styles.input}
            placeholder="Email or Username"
            placeholderTextColor="#979797"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter Password"
              placeholderTextColor="#979797"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={styles.unhideButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={require('@/assets/icons/unhide.png')}
                style={[
                  styles.unhideIcon,
                  showPassword && styles.unhideIconActive
                ]}
              />
            </TouchableOpacity>
          </View>

          {/* Remember Me & Forgot Password */}
          <View style={styles.optionsRow}>
            <TouchableOpacity 
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={styles.checkbox}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Auto-login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowForgotPassword(true)}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Create Account Link */}
          <View style={styles.createAccountContainer}>
            <Text style={styles.noAccountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.createNowText}>Create Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ForgotPassword 
        isVisible={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: s(24),
    alignItems: 'center',
  },
  title: {
    fontSize: s(24),
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#DE728D',
    marginBottom: s(32),
  },
  input: {
    width: '100%',
    height: s(48),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: s(100),
    paddingHorizontal: s(20),
    marginBottom: s(16),
    fontSize: s(14),
    fontFamily: 'Open Sans',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(16),
  },
  passwordInput: {
    flex: 1,
    height: s(48),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: s(100),
    paddingHorizontal: s(20),
    fontSize: s(14),
    fontFamily: 'Open Sans',
  },
  unhideButton: {
    position: 'absolute',
    right: s(20),
  },
  unhideIcon: {
    width: s(20),
    height: s(20),
    tintColor: '#979797',
  },
  unhideIconActive: {
    tintColor: '#DE728D',
  },
  optionsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: s(32),
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: s(20),
    height: s(20),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: s(4),
    marginRight: s(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#DE728D',
    fontSize: s(14),
    fontWeight: '600',
  },
  rememberText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  forgotText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    color: '#DE728D',
    fontWeight: '600',
  },
  loginButton: {
    width: '100%',
    height: s(48),
    backgroundColor: '#DE728D',
    borderRadius: s(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: s(24),
  },
  loginButtonText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  createAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  createNowText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#DE728D',
  },
});

export default LoginPopup;
