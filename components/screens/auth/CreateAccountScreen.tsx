import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { s } from 'react-native-size-matters';
import { router } from 'expo-router';
import { useSignup } from '@/contexts/SignupContext';

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

interface CreateAccountScreenProps {
  fieldErrors: FieldErrors;
  isValidating: boolean;
  validateAndProceed: () => Promise<void>;
  clearFieldError: (field: keyof FieldErrors) => void;
}

const CreateAccountScreen = ({ 
  fieldErrors, 
  isValidating, 
  validateAndProceed, 
  clearFieldError 
}: CreateAccountScreenProps) => {
  const { signupData, updateSignupData } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    updateSignupData({ [field]: value });
    clearFieldError(field as keyof FieldErrors);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Progress Bars */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressEmpty} />
          <View style={styles.progressEmpty} />
          <View style={styles.progressEmpty} />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.title}>Create Account</Text>

          {/* Error Messages */}
          {Object.values(fieldErrors).some(error => error) && (
            <View style={styles.errorContainer}>
              {fieldErrors.firstName && (
                <Text style={styles.errorMessage}>• {fieldErrors.firstName}</Text>
              )}
              {fieldErrors.lastName && (
                <Text style={styles.errorMessage}>• {fieldErrors.lastName}</Text>
              )}
              {fieldErrors.username && (
                <Text style={styles.errorMessage}>• {fieldErrors.username}</Text>
              )}
              {fieldErrors.email && (
                <Text style={styles.errorMessage}>• {fieldErrors.email}</Text>
              )}
              {fieldErrors.password && (
                <Text style={styles.errorMessage}>• {fieldErrors.password}</Text>
              )}
            </View>
          )}

          {/* Form Fields */}
          <View style={styles.formContainer}>
          <TextInput
            style={[
              styles.input,
              fieldErrors.firstName && styles.inputError
            ]}
            placeholder="First Name"
            placeholderTextColor="#979797"
            value={signupData.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
          />

          <TextInput
            style={[
              styles.input,
              fieldErrors.lastName && styles.inputError
            ]}
            placeholder="Last Name"
            placeholderTextColor="#979797"
            value={signupData.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
          />

          <TextInput
            style={[
              styles.input,
              fieldErrors.username && styles.inputError
            ]}
            placeholder="Username"
            placeholderTextColor="#979797"
            value={signupData.username}
            onChangeText={(value) => handleInputChange('username', value)}
            autoCapitalize="none"
          />

          <TextInput
            style={[
              styles.input,
              fieldErrors.email && styles.inputError
            ]}
            placeholder="Email Address"
            placeholderTextColor="#979797"
            value={signupData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.passwordInput,
                fieldErrors.password && styles.passwordInputError
              ]}
              placeholder="Enter Password"
              placeholderTextColor="#979797"
              value={signupData.password}
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
        </View>

        <View style={styles.bottomSection}>
          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/getStarted')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Next Button */}
          <TouchableOpacity 
            style={[
              styles.nextButton,
              (!signupData.firstName || !signupData.lastName || !signupData.username || !signupData.email || !signupData.password || isValidating) && styles.nextButtonDisabled
            ]}
            onPress={validateAndProceed}
            disabled={!signupData.firstName || !signupData.lastName || !signupData.username || !signupData.email || !signupData.password || isValidating}
          >
            {isValidating ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={[
                styles.nextButtonText,
                (!signupData.firstName || !signupData.lastName || !signupData.username || !signupData.email || !signupData.password || isValidating) && styles.nextButtonTextDisabled
              ]}>Next</Text>
            )}
          </TouchableOpacity>

          {/* Terms and Privacy */}
          <Text style={styles.termsText}>
            By signing up you are agreeing to our{' '}
            <Text style={styles.termsLink}>Terms of Use</Text> and our{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressContainer: {
    paddingTop: s(21),
    paddingHorizontal: s(20),
    marginBottom: s(22),
  },
  progressBar: {
    flexDirection: 'row',
    gap: s(5),
    height: s(4),
  },
  progressEmpty: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: s(2),
  },
  container: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingBottom: s(18),
    justifyContent: 'space-between', // Push bottom content to bottom
  },
  topSection: {
    flex: 1,
  },
  bottomSection: {
    // Bottom section stays at bottom
  },
  title: {
    fontSize: s(22),
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#242020',
    marginBottom: s(16),
  },
  errorContainer: {
    maxHeight: s(120), // Fixed max height for error messages
    marginBottom: s(12),
    marginTop: -6,
  },
  errorMessage: {
    color: '#DE728D',
    fontSize: s(12),
    fontFamily: 'Open Sans',
    marginBottom: s(4),
  },
  inputError: {
    borderColor: '#DE728D',
  },
  formContainer: {
    gap: s(16),
    marginBottom: s(48), // Increased space before "Already have an account"
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
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    height: s(48),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: s(100),
    paddingHorizontal: s(20),
    paddingRight: s(50),
    fontSize: s(14),
    fontFamily: 'Open Sans',
  },
  passwordInputError: {
    borderColor: '#DE728D',
  },
  unhideButton: {
    position: 'absolute',
    right: s(20),
    top: s(14),
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
    marginTop: s(-4),
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
  nextButtonDisabled: {
    backgroundColor: '#E1E1E1',
  },
  nextButtonText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  nextButtonTextDisabled: {
    color: '#979797',
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
