import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Linking } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import * as MediaLibrary from 'expo-media-library';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';
import { PostImageRef } from './PostImage';

interface HeaderProps {
  username?: string;
  profileImage?: string;
  imageUrls?: string[];
  mainImageIndex?: number;
  imageRef?: React.RefObject<PostImageRef | null>;
}

const Header: React.FC<HeaderProps> = ({ 
  username = "",
  profileImage,
  imageUrls = [],
  mainImageIndex = 0,
  imageRef
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const saveImageToGallery = async () => {
    try {
      setIsSaving(true);
      const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        setSaveMessage('Saving image...');
        try {
          // Capture the actual rendered view as an image
          if (imageRef?.current) {
            const capturedImageUri = await imageRef.current.captureImage();
            await MediaLibrary.saveToLibraryAsync(capturedImageUri);
            setSaveMessage('Image saved!');
            setTimeout(() => setSaveMessage(''), 1500);
          } else {
            throw new Error('Image ref not available');
          }
        } catch (captureError) {
          console.error('Error capturing view:', captureError);
          // Fallback to saving individual images if capture fails
          setSaveMessage('Saving image...');
          for (let i = 0; i < imageUrls.length; i++) {
            try {
              await MediaLibrary.saveToLibraryAsync(imageUrls[i]);
              setSaveMessage(`Saving ${i + 1}/${imageUrls.length}...`);
            } catch (imageError) {
              console.error(`Error saving image ${i + 1}:`, imageError);
            }
          }
          setSaveMessage('Images saved!');
          setTimeout(() => setSaveMessage(''), 1500);
        }
      } else if (canAskAgain === false) {
        // Permission permanently denied, show alert to go to settings
        Alert.alert(
          'Permission Required',
          'To save images to your gallery, please enable photo library access in your device settings.',
          [
            { 
              text: 'Cancel', 
              style: 'cancel',
              onPress: () => {
                setSaveMessage('Permission denied');
                setTimeout(() => setSaveMessage(''), 1500);
              }
            },
            { 
              text: 'Open Settings', 
              onPress: () => {
                Linking.openSettings();
                //setSaveMessage('Check settings and try again');
                //setTimeout(() => setSaveMessage(''), 1000);
              }
            }
          ]
        );
      } else {
        // Permission denied but can ask again - android only pretty much, need to test
        setSaveMessage('Permission denied');
        setTimeout(() => setSaveMessage(''), 1000);
      }
    } catch (error) {
      console.error('Error saving images:', error);
      setSaveMessage('Save failed');
      setTimeout(() => setSaveMessage(''), 1000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.profileContainer}>
          <Image 
            source={profileImage ? { uri: profileImage } : { uri: DEFAULT_PROFILE_PICTURE }}
            style={styles.profilePicture}
          />
        </View>
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.saveContainer}>
        {saveMessage ? (
          <Text style={styles.saveMessage} numberOfLines={1}>{saveMessage}</Text>
        ) : null}
        <TouchableOpacity 
          style={[
            styles.saveButton,
            (!imageUrls || imageUrls.length === 0) && styles.disabledButton
          ]}
          onPress={saveImageToGallery}
          disabled={isSaving || !imageUrls || imageUrls.length === 0}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#DE728D" />
          ) : (
            <MaterialCommunityIcons
              name="download-outline"
              size={20}
              color={(!imageUrls || imageUrls.length === 0) ? "#CCCCCC" : "#666666"}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  username: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
    fontWeight: '600',
  },
  saveContainer: {
    alignItems: 'flex-end',
  },
  saveButton: {
    padding: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  saveMessage: {
    fontSize: 10,
    fontFamily: 'Open Sans',
    color: '#DE728D',
    textAlign: 'right',
    marginBottom: 2,
  },
});

export default Header;
