import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Keyboard,
} from 'react-native';
import { s } from 'react-native-size-matters';
import { router } from 'expo-router';
import { TIMEZONE_OPTIONS } from '@/utils/timezoneProcessing';

const GENDER_OPTIONS = ['Male', 'Female', 'Non-Binary', 'Prefer Not to Answer'];

const PersonalProfileScreen = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    timezone: '',
    bio: '',
    communityCode: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showTimezonePicker, setShowTimezonePicker] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = (): boolean => {
    // Check required fields (age, gender, timezone)
    if (!formData.age || !formData.gender || !formData.timezone) {
      setErrorMessage('All required information must be filled out');
      return false;
    }

    // Check age requirement
    const age = parseInt(formData.age);
    if (age < 13) {
      setErrorMessage('Must be at least 13 years old to use this app');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateForm()) {
      return;
    }
    // Navigate to primary goal screen
    router.push('/(auth)/primaryGoal');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView 
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Progress Bars */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFilled} />
              <View style={styles.progressEmpty} />
              <View style={styles.progressEmpty} />
            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Personal Profile</Text>
            
            <Text style={styles.subtitle}>
              Fill out additional information about yourself. This will enable you to use all the features in the app properly.
            </Text>

            {errorMessage && (
              <Text style={styles.errorMessage}>Error: {errorMessage}</Text>
            )}

            <View style={styles.formContainer}>
              {/* Age Input */}
              <TextInput
                style={[styles.input, errorMessage && styles.inputError]}
                placeholder="Age"
                placeholderTextColor="#979797"
                value={formData.age}
                onChangeText={(value) => {
                  if (/^\d*$/.test(value)) {
                    handleInputChange('age', value);
                  }
                }}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
              />

              {/* Gender Dropdown */}
              <TouchableOpacity 
                style={[styles.dropdownButton, errorMessage && styles.inputError]}
                onPress={() => setShowGenderPicker(true)}
              >
                <Text style={[styles.dropdownText, !formData.gender && styles.placeholder]}>
                  {formData.gender || 'Gender'}
                </Text>
                <Image
                  source={require('@/assets/icons/arrow-down.png')}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>

              {/* Gender Picker Modal */}
              <Modal
                visible={showGenderPicker}
                transparent={true}
                animationType="slide"
              >
                <TouchableOpacity 
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setShowGenderPicker(false)}
                >
                  <View style={styles.modalContent}>
                    {GENDER_OPTIONS.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={styles.optionButton}
                        onPress={() => {
                          handleInputChange('gender', option);
                          setShowGenderPicker(false);
                        }}
                      >
                        <Text style={styles.optionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>

              {/* Timezone Dropdown */}
              <TouchableOpacity 
                style={[styles.dropdownButton, errorMessage && styles.inputError]}
                onPress={() => setShowTimezonePicker(true)}
              >
                <Text style={[styles.dropdownText, !formData.timezone && styles.placeholder]}>
                  {formData.timezone || 'Timezone'}
                </Text>
                <Image
                  source={require('@/assets/icons/arrow-down.png')}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>

              {/* Timezone Picker Modal */}
              <Modal
                visible={showTimezonePicker}
                transparent={true}
                animationType="slide"
              >
                <TouchableOpacity 
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setShowTimezonePicker(false)}
                >
                  <View style={styles.modalContent}>
                    <ScrollView>
                      {TIMEZONE_OPTIONS.map((timezone) => (
                        <TouchableOpacity
                          key={timezone.value}
                          style={styles.optionButton}
                          onPress={() => {
                            handleInputChange('timezone', timezone.label);
                            setShowTimezonePicker(false);
                          }}
                        >
                          <Text style={styles.optionText}>{timezone.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </TouchableOpacity>
              </Modal>

              {/* Bio Input */}
              <TextInput
                style={[styles.input, styles.bioInput]}
                placeholder="Bio (Optional)"
                placeholderTextColor="#979797"
                value={formData.bio}
                onChangeText={(value) => handleInputChange('bio', value)}
                multiline={true}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={true}
              />

              {/* Community Code Input */}
              <TextInput
                style={styles.input}
                placeholder="Community Code (Optional)"
                placeholderTextColor="#979797"
                value={formData.communityCode}
                onChangeText={(value) => handleInputChange('communityCode', value)}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={true}
              />
            </View>

            <Text style={styles.helperText}>
              Enter the code provided by the community leader
            </Text>

            {/* Navigation Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.nextButton}
                onPress={handleNext}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Timezone Picker Modal */}
        <Modal
          visible={showTimezonePicker}
          transparent={true}
          animationType="slide"
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowTimezonePicker(false)}
          >
            <View style={styles.modalContent}>
              <ScrollView>
                {TIMEZONE_OPTIONS.map((timezone) => (
                  <TouchableOpacity
                    key={timezone.value}
                    style={styles.optionButton}
                    onPress={() => {
                      handleInputChange('timezone', timezone.label);
                      setShowTimezonePicker(false);
                    }}
                  >
                    <Text style={styles.optionText}>{timezone.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressContainer: {
    paddingTop: s(22),
    paddingHorizontal: s(20),
    marginBottom: s(22),
  },
  progressBar: {
    flexDirection: 'row',
    gap: s(5),
    height: s(4),
  },
  progressFilled: {
    flex: 1,
    backgroundColor: '#DE728D',
    borderRadius: s(2),
  },
  progressEmpty: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: s(2),
  },
  container: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingBottom: s(20),
    minHeight: '100%', // Ensure container takes full height for proper scrolling
  },
  title: {
    fontSize: s(22),
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#242020',
    marginBottom: s(6),
  },
  subtitle: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    color: '#242020',
    marginBottom: s(22),
    lineHeight: s(18),
  },
  formContainer: {
    marginBottom: s(0),
  },
  helperText: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    color: '#979797',
    marginBottom: s(55),
    marginTop: -4,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(16),
    marginTop: s(8),
  },
  input: {
    height: s(48),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: s(100),
    paddingHorizontal: s(20),
    fontSize: s(12),
    fontFamily: 'Open Sans',
    marginBottom: s(12),
  },
  bioInput: {
    height: s(90),
    borderRadius: s(20),
    paddingTop: s(12),
    paddingBottom: s(12),
    textAlignVertical: 'top',
  },
  dropdownButton: {
    height: s(48),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: s(100),
    paddingHorizontal: s(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: s(12),
  },
  dropdownText: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  placeholder: {
    fontSize: s(12),
    color: '#979797',
  },
  dropdownIcon: {
    width: s(20),
    height: s(20),
    tintColor: '#979797',
  },
  errorMessage: {
    color: '#DE728D',
    fontSize: s(12),
    fontFamily: 'Open Sans',
    marginBottom: s(16),
  },
  inputError: {
    borderColor: '#DE728D',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: s(20),
    borderTopRightRadius: s(20),
    padding: s(20),
  },
  optionButton: {
    paddingVertical: s(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  optionText: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  backButton: {
    flex: 1,
    height: s(48),
    borderWidth: 1,
    borderColor: '#DE728D',
    borderRadius: s(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#DE728D',
  },
  nextButton: {
    flex: 1,
    height: s(48),
    backgroundColor: '#DE728D',
    borderRadius: s(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default PersonalProfileScreen;
