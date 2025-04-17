import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';

const AddCaption = () => {
  const [caption, setCaption] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [showSelectUsers, setShowSelectUsers] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    setShowSelectUsers(true);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Image 
              source={require("@/assets/icons/backWhite.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Workout</Text>
        </View>

        {/* Image Preview */}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/testPost.png")}
            style={styles.previewImage}
            resizeMode="contain"
          />
        </View>

        {/* Caption Input */}
        <View style={styles.captionContainer}>
          <TextInput
            style={[
              styles.captionInput,
              isKeyboardVisible && styles.captionInputExpanded
            ]}
            placeholder="Add caption...."
            placeholderTextColor="#979797"
            value={caption}
            onChangeText={setCaption}
            multiline={true}
            onFocus={() => setIsKeyboardVisible(true)}
            onBlur={() => setIsKeyboardVisible(false)}
          />
        </View>

        {/* Next Button */}
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 11,
    height: 15,
    tintColor: '#FFFFFF',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    marginLeft: 12,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 1.33,
  },
  captionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  captionInput: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    maxHeight: 20, // Single line when keyboard is hidden
    minHeight: 20,
  },
  captionInputExpanded: {
    maxHeight: 100, // Expands when keyboard is visible
  },
  nextButton: {
    backgroundColor: '#DE728D',
    marginHorizontal: 20,
    marginBottom: 34,
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default AddCaption;
