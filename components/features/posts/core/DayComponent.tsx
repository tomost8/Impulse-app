import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { s } from 'react-native-size-matters';
import { router } from 'expo-router';

interface DayComponentProps {
  date: any;
  imagesByDate: any[];
}

export default function DayComponent({ date, imagesByDate }: DayComponentProps) {
  const [imageLoading, setImageLoading] = useState(true);
  
  // Get memory entry for each date
  const memoryForDate = imagesByDate.find((memory: any) => memory.date === date.dateString);
  const hasImage = memoryForDate && memoryForDate.mediaUrls.length > 0;

  const handleDayPress = () => {
    if (memoryForDate?.id) {
      router.push(`/memories/${memoryForDate.id}`);
    } else {
      console.log('No memory for date:', date);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.dayContainer}
      onPress={handleDayPress}
      disabled={!memoryForDate}
    >
      {hasImage ? (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: memoryForDate.mediaUrls[0] }} 
            style={styles.dayMemoryImage}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
          
          {/* Loading indicator for calendar image */}
          {imageLoading && (
            <View style={styles.calendarLoadingOverlay}>
              <ActivityIndicator size="small" color="#DE728D" />
            </View>
          )}
          
          {/* Day number text centered over the image */}
          <Text style={styles.dayText}>{date.day}</Text>
        </View>
      ) : (
        <>
          <View style={styles.dayPlaceholder} />
          <Text style={styles.dayText}>{date.day}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Calendar day component styles
  dayContainer: {
    width: s(40),
    height: s(50),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    width: s(40),
    height: s(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayMemoryImage: {
    width: s(40),
    height: s(50),
    borderRadius: s(6),
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  calendarLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: s(6),
  },
  dayPlaceholder: {
    width: s(40),
    height: s(50),
    borderRadius: s(6),
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  dayText: {
    color: '#333',
    fontWeight: 'bold',
    zIndex: 1,
  },
});
