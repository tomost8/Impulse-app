import * as ImageManipulator from 'expo-image-manipulator';
import { storage } from '@/config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface PhotoInput {
  uri: string;
}

export async function processAndUploadImage(photo: PhotoInput | string): Promise<string> {
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
    const storageRef = ref(storage, filename);

    // Upload to Firebase Storage
    const uploadResult = await uploadBytes(storageRef, blob);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(uploadResult.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error processing and uploading image:', error);
    throw error;
  }
} 