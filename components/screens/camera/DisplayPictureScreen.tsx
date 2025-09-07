import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback } from 'react-native';

interface DisplayPictureScreenProps {
  mainImageSource: { uri: string } | null;
  previewImageSource: { uri: string } | null;
  captionFooterVisible: boolean;
  isKeyboardVisible: boolean;
  caption: string;
  setCaption: (text: string) => void;
  setIsKeyboardVisible: (visible: boolean) => void;
  activityButtonVisible: boolean;
  usersButtonVisible: boolean;
  setActivityModalVisible: (visible: boolean) => void;
  setUsersModalVisible: (visible: boolean) => void;
  swapImages: () => void;
}

const DisplayPictureScreen = ({
  mainImageSource,
  previewImageSource,
  captionFooterVisible,
  isKeyboardVisible,
  caption,
  setCaption,
  setIsKeyboardVisible,
  activityButtonVisible,
  usersButtonVisible,
  setActivityModalVisible,
  setUsersModalVisible,
  swapImages,
}: DisplayPictureScreenProps) => {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Touchable Background */}
        <TouchableWithoutFeedback onPress={() => setIsKeyboardVisible(false)}>
          <View style={styles.backgroundTouchable}>
            {/* Full Screen Image */}
            <View style={styles.imageContainer}>
              {mainImageSource && (
                <Image
                  source={mainImageSource}
                  style={styles.mainImage}
                  resizeMode="contain"
                />
              )}
              {previewImageSource && (
                <TouchableOpacity
                  style={styles.previewImageWrapper}
                  onPress={swapImages}
                >
                  <Image
                    source={previewImageSource}
                    style={styles.previewImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>

        {/* Buttons + Captions */}
        <View style={styles.overlayContainer}>
          {activityButtonVisible && (
            <TouchableOpacity 
              style={styles.activityButton}
              onPress={() => setActivityModalVisible(true)}
            >
              <Text style={styles.buttonText}>Select Activity</Text>
            </TouchableOpacity>
          )}

          {captionFooterVisible && (
            <View style={styles.captionContainer}>
              <TextInput
                style={[
                  styles.captionInput,
                  isKeyboardVisible && { height: 'auto' }
                ]}
                placeholder="Add caption...."
                placeholderTextColor="#979797"
                value={caption}
                onChangeText={setCaption}
                multiline={true}
                onFocus={() => setIsKeyboardVisible(true)}
                onBlur={() => setIsKeyboardVisible(false)}
                returnKeyType="done"
                onSubmitEditing={() => setIsKeyboardVisible(false)}
                blurOnSubmit={true}
              />
            </View>
          )}

          {usersButtonVisible && (
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={() => setUsersModalVisible(true)}
            >
              <Text style={styles.nextButtonText}>Select Users</Text>
            </TouchableOpacity>
          )}
        </View>
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
  backgroundTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: '82%',
    zIndex: 2,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  previewImageWrapper: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 145,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 10,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 3,
  },
  captionContainer: {
    marginBottom: 13,
  },
  captionInput: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    minHeight: 20,
    paddingTop: 0,  // Remove default padding
    paddingBottom: 0,  // Remove default padding
  },
  activityButton: {
    backgroundColor: '#DE728D',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#DE728D',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default DisplayPictureScreen;