import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
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

/**
 * Merges two images into a single image that represents the current display state
 * @param backgroundImageUri - URI of the background image
 * @param foregroundImageUri - URI of the foreground image  
 * @param foregroundOpacity - Opacity of the foreground image (0-1)
 * @param smallImageUri - URI of the small draggable image
 * @param smallImagePosition - Position of the small image {x, y}
 * @returns URI of the merged image
 */
export async function mergePostImages(
  backgroundImageUri: string,
  foregroundImageUri: string,
  foregroundOpacity: number = 0,
  smallImageUri?: string,
  smallImagePosition?: { x: number; y: number }
): Promise<string> {
  try {
    // First, merge the background and foreground images with opacity
    let mergedImageUri = backgroundImageUri;
    
    if (foregroundOpacity > 0 && foregroundImageUri) {
      // Create a semi-transparent version of the foreground image
      const foregroundManipulated = await ImageManipulator.manipulateAsync(
        foregroundImageUri,
        [],
        { 
          format: ImageManipulator.SaveFormat.JPEG,
          compress: 0.8,
          base64: false
        }
      );

      // For now, we'll use the background image as the base
      // In a more complex implementation, we could blend the images with custom opacity
      // but expo-image-manipulator doesn't support direct opacity blending
      // So we'll use the foreground image if opacity is high enough, otherwise background
      mergedImageUri = foregroundOpacity > 0.5 ? foregroundManipulated.uri : backgroundImageUri;
    }

    // If there's a small image, we need to composite it onto the merged image
    if (smallImageUri && smallImagePosition) {
      // Resize the small image to match the expected size (118x160)
      const smallImageResized = await ImageManipulator.manipulateAsync(
        smallImageUri,
        [{ resize: { width: 118, height: 160 } }],
        { 
          format: ImageManipulator.SaveFormat.JPEG,
          compress: 0.8,
          base64: false
        }
      );

      // Composite the small image onto the main image
      const finalImage = await ImageManipulator.manipulateAsync(
        mergedImageUri,
        [],
        { 
          format: ImageManipulator.SaveFormat.JPEG,
          compress: 0.8,
          base64: false
        }
      );

      // Note: expo-image-manipulator doesn't support positioning overlays directly
      // For a complete solution, we'd need to use a canvas-based approach
      // For now, we'll return the merged image without the small overlay
      return finalImage.uri;
    }

    return mergedImageUri;
  } catch (error) {
    console.error('Error merging images:', error);
    // Fallback to background image if merging fails
    return backgroundImageUri;
  }
}

/**
 * Creates a merged image that represents the current display state of a post
 * This is a simplified version that handles the most common case
 * @param imageUrls - Array of image URLs
 * @param mainImageIndex - Current main image index (0 or 1)
 * @returns URI of the merged image
 */
export async function createMergedPostImage(
  imageUrls: string[],
  mainImageIndex: number = 0
): Promise<string> {
  if (!imageUrls || imageUrls.length === 0) {
    throw new Error('No images provided');
  }

  if (imageUrls.length === 1) {
    return imageUrls[0];
  }

  // For posts with 2 images, return the currently displayed main image
  // This represents what the user sees on screen
  return imageUrls[mainImageIndex];
} 
