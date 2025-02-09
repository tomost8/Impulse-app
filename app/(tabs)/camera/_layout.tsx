import styles from '@/constants/testStyles';

import { Stack } from 'expo-router';
import { createContext, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

// Define the context type
export type HeaderContextType = {
  category: string;
  setCategory: (category: string) => void;
  pictureTaken: boolean;
  setPictureTaken: (pictureTaken: boolean) => void;
  flash: boolean;
  setFlash: (flash: boolean) => void;
};

// Create the context
export const HeaderContext = createContext<HeaderContextType | null>(null);

function CameraHeader() {
  const context = React.useContext(HeaderContext);

  if (!context) return null;

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => {
        router.back();
        context.setCategory('');
        if (context.pictureTaken) {
          router.back();
          context.setPictureTaken(false);
        }
      }}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      
      <Text style={styles.text}>{context.category}</Text>
      
      <TouchableOpacity onPress={() => context.setFlash(!context.flash)}>
        {context.flash ? (
          <Ionicons name="flash" size={24} color="white" />
        ) : (
          <Ionicons name="flash-off" size={24} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default function CameraLayout() {
  const [category, setCategory] = useState('Camera');
  const [pictureTaken, setPictureTaken] = useState(false);
  const [flash, setFlash] = useState(false);
  return (
    <HeaderContext.Provider 
      value={{
        category,
        setCategory,
        pictureTaken,
        setPictureTaken,
        flash,
        setFlash,
      }}
    >
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{
            header: () => <CameraHeader />,
          }}
        />
        <Stack.Screen 
          name="displayPicture" 
          options={{
            header: () => <CameraHeader />,
          }}
        />
      </Stack>
    </HeaderContext.Provider>
  );
}

