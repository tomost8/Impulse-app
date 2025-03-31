import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { s } from 'react-native-size-matters';
import { router } from 'expo-router';

const CreateAccountScreen = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error message when user starts typing
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = (): boolean => {
    // Check if all fields are filled
    const isAnyFieldEmpty = Object.values(formData).some(value => value.trim() === '');
    if (isAnyFieldEmpty) {
      setErrorMessage('All information has to be filled out');
      return false;
    }

    // Check password length
    if (formData.password.length < 8) {
      setErrorMessage('Password does not meet requirements');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    // Clear any existing error message
    setErrorMessage('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    // If validation passes, navigate to PersonalProfile
    router.push('/Signup/personalProfile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Error Message */}
      {errorMessage && (
        <Text style={styles.errorMessage}>Error: {errorMessage}</Text>
      )}

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, errorMessage && styles.inputError]}
          placeholder="First Name"
          placeholderTextColor="#979797"
          value={formData.firstName}
          onChangeText={(value) => handleInputChange('firstName', value)}
        />

        <TextInput
          style={[styles.input, errorMessage && styles.inputError]}
          placeholder="Last Name"
          placeholderTextColor="#979797"
          value={formData.lastName}
          onChangeText={(value) => handleInputChange('lastName', value)}
        />

        <TextInput
          style={[styles.input, errorMessage && styles.inputError]}
          placeholder="Username"
          placeholderTextColor="#979797"
          value={formData.username}
          onChangeText={(value) => handleInputChange('username', value)}
        />

        <TextInput
          style={[styles.input, errorMessage && styles.inputError]}
          placeholder="Email Address"
          placeholderTextColor="#979797"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.passwordInput, 
              errorMessage === 'Password does not meet requirements' && styles.inputError
            ]}
            placeholder="Enter Password"
            placeholderTextColor="#979797"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry={!showPassword}
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
        <Text style={styles.passwordHint}>Must be at least 8 characters</Text>
      </View>

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Terms and Privacy */}
      <Text style={styles.termsText}>
        By signing up you are agreeing to our{' '}
        <Text style={styles.termsLink}>Terms of Use</Text> and our{' '}
        <Text style={styles.termsLink}>Privacy Policy</Text>.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: s(20),
  },
  title: {
    fontSize: s(32),
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: s(32),
  },
  errorMessage: {
    color: '#DE728D',
    fontSize: s(12),
    fontFamily: 'Open Sans',
    marginBottom: s(16),
  },
  formContainer: {
    gap: s(16),
  },
  input: {
    height: s(48),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: s(100),
    paddingHorizontal: s(20),
    fontSize: s(14),
    fontFamily: 'Open Sans',
  },
  inputError: {
    borderColor: '#DE728D',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
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
  passwordHint: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    color: '#979797',
    marginTop: s(-8),
    marginLeft: s(20),
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: s(24),
  },
  loginText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  loginLink: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    color: '#DE728D',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#DE728D',
    height: s(48),
    borderRadius: s(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: s(24),
  },
  nextButtonText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  termsText: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    color: '#242020',
    textAlign: 'center',
    marginTop: s(16),
  },
  termsLink: {
    color: '#DE728D',
    fontWeight: '600',
  },
});

export default CreateAccountScreen; 