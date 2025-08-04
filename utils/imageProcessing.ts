import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';

export const pickImage = async (
  handleFormDataChange: (field: string, value: string) => void, 
  field: string = 'profile_picture'
) => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
  } catch (error) {
    console.error('Error picking image:', error);
    alert('Failed to pick image');
  }
};

interface PhotoInput {
  uri: string;
}

export async function processAndUploadImage(photo: PhotoInput | string): Promise<string> {
  // Return early if the photo is the default profile picture
  if (photo === DEFAULT_PROFILE_PICTURE) {
    return DEFAULT_PROFILE_PICTURE;
  }

  try {
    const sourceUri = typeof photo === 'string' ? photo : photo.uri;
    
    // Compress the image
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      sourceUri,
      [], // No transformations needed
      {
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    // Convert URI to Blob
    const response = await fetch(manipulatedImage.uri);
    const blob = await response.blob();

    // Create a unique filename
    const filename = `posts/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const storageRef = storage().ref(filename);

    // Upload to Firebase Storage
    const uploadResult = await storageRef.put(blob);
    
    // Get the download URL
    const downloadURL = await storageRef.getDownloadURL();
    
    return downloadURL;
  } catch (error) {
    console.error('Error processing and uploading image:', error);
    throw error;
  }
} 
