import { Stack } from 'expo-router';
import React, { createContext, useState, useEffect, useRef, useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { getLabelByCategory } from '@/utils/goals';

export const CameraHeaderContext = createContext<{
  id: number;
  setId: (id: number) => void;
  category: string;
  setCategory: (category: string) => void;
  pictureTaken: boolean;
  setPictureTaken: (pictureTaken: boolean) => void;
  flash: boolean;
  setFlash: (flash: boolean) => void;
}>({
  id: 0,
  setId: () => {},
  category: '',
  setCategory: () => {},
  pictureTaken: false,
  setPictureTaken: () => {},
  flash: false,
  setFlash: () => {},
});


function CameraHeader() {
  const header = React.useContext(CameraHeaderContext);

  if (!header) return null;

  return (
    <View style={headerStyles.header}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => {
        header.setPictureTaken(false);
        router.back();
      }}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      {/* Display Category Text for Selected Activity*/}
      <Text style={headerStyles.text}>{getLabelByCategory(header.category)}</Text>
      {/* Retake Button or Flash Button*/}
      {header.pictureTaken ? (
        <TouchableOpacity onPress={() => {
          header.setPictureTaken(false);
          router.back();
        }}>
          <Image 
            source={require("@/assets/icons/retake.png")}
            style={{ width: 24, height: 24, tintColor: '#FFFFFF' }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => header.setFlash(!header.flash)}>
          {header.flash ? (
            <Ionicons name="flash" size={24} color="white" />
          ) : (
            <Ionicons name="flash-off" size={24} color="white" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function CameraLayout() {
  const [pictureTaken, setPictureTaken] = useState(false);
  const [flash, setFlash] = useState(false);
  const [activityId, setActivityId] = useState(0);
  const [activityCategory, setActivityCategory] = useState('');

  // useMemo ensures context values are always updated when parameters change
  const contextValues = useMemo(() => {
    return {
      id: activityId,
      category: activityCategory,
      pictureTaken,
      flash,
      setId: (id: number) => {
        //console.log(`🎯 Context: setId(${id})`);
        setActivityId(id);
      },
      setCategory: (category: string) => {
        //console.log(`🎯 Context: setCategory(${category})`);
        setActivityCategory(category);
      },
      setPictureTaken,
      setFlash,
    };
  }, [activityId, activityCategory, pictureTaken, flash]);

  return (
    <CameraHeaderContext.Provider value={contextValues}>
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => <CameraHeader />,
        }}
      >
        <Stack.Screen 
          name="index" 
          key={`${activityId}-${activityCategory}`}
        />
        <Stack.Screen 
          name="displayPicture" 
        />
      </Stack>
    </CameraHeaderContext.Provider>
  );
}

// Rename styles to headerStyles to avoid conflicts
const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: '#000',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

