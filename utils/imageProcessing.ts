import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';
import { Alert, Linking } from 'react-native';

const openAppSettings = () => {
  Linking.openSettings();
};

export const pickImage = async (
  handleFormDataChange: (field: string, value: string) => void, 
  field: string = 'profile_picture'
) => {
  try {
    // First check current permission status
    const currentPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    
    if (currentPermission.status === 'granted') {
      // Permission already granted, proceed with image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        handleFormDataChange(field, uri);
        return uri;
      }
      return;
    }
    
    // If permission is not granted, try to request it
    const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status === 'granted') {
      // Permission granted, proceed with image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        handleFormDataChange(field, uri);
        return uri;
      }
    } else if (canAskAgain === false) {
      // Permission permanently denied, show alert to go to settings
      Alert.alert(
        'Permission Required',
        'To select images from your gallery, please enable photo library access in your device settings.',
        [
          { 
            text: 'Cancel', 
            style: 'cancel',
            onPress: () => {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          },
          { 
            text: 'Open Settings', 
            onPress: () => {
              openAppSettings();
              alert('Please enable photo library access in settings and try again.');
            }
          }
        ]
      );
    } else {
      // Permission denied but can ask again
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  } catch (error) {
    console.error('Error picking image:', error);
    alert('Failed to pick image');
  }
};

interface PhotoInput {
  uri: string;
}

export async function uploadImage(photo: PhotoInput | string, folder: string = 'unclassified'): Promise<string> {
  // Return early if the photo is the default profile picture
  if (photo === DEFAULT_PROFILE_PICTURE) {
    return DEFAULT_PROFILE_PICTURE;
  }

  try {
    const sourceUri = typeof photo === 'string' ? photo : photo.uri;
    const response = await fetch(sourceUri);
    const blob = await response.blob();

    const filename = `images/${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const storageRef = storage().ref(filename);

    // Upload to Firebase Storage
    const uploadResult = await storageRef.put(blob);
    
    // Get the download URL
    const downloadURL = await storageRef.getDownloadURL();
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
} 
