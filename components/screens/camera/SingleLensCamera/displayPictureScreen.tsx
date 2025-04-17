import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

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
}: DisplayPictureScreenProps) => {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
    <SafeAreaView style={styles.safeArea}>
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
          <Image
            source={previewImageSource}
            style={styles.previewImage}
            resizeMode="contain"
          />
        )}
      </View>

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
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  previewImage: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 100,
    height: 133,
    borderRadius: 8,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  captionContainer: {
    marginBottom: 16,
  },
  captionInput: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    maxHeight: 20,
    minHeight: 20,
  },
  captionInputExpanded: {
    maxHeight: 100,
  },
  activityButton: {
    backgroundColor: '#DE728D',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#DE728D',
    marginHorizontal: 20,
    marginBottom: 34,
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