import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '@/config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React from 'react';
import { Image, ImageProps } from 'react-native';


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

export const pickImage = async (handleFormDataChange: (field: string, value: string) => void) => {
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
        handleFormDataChange('profile_picture', uri);
        return uri; // Return the URI
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image');
    }
  };
