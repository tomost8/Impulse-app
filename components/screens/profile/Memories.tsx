import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { s } from 'react-native-size-matters';
import { router } from 'expo-router';
import Header from "@/components/ui/common/headers/Header";

function DayComponent({ date, imagesByDate }: { date: any; imagesByDate: any[] }) {
  // Get memory entry for each date
  const memoryForDate = imagesByDate.find((memory: any) => memory.date === date.dateString);
  const hasImage = memoryForDate && memoryForDate.mediaUrls.length > 0;

  const handleDayPress = () => {
    if (memoryForDate?.id) {
      router.push(`/post/${memoryForDate.id}`);
    } else {
      console.log('No memory for date:', date);
    }
  };

  return (
    <TouchableOpacity 
      style={dayStyles.dayContainer}
      onPress={handleDayPress}
      disabled={!memoryForDate}
    >
      {hasImage ? (
        <Image 
          source={{ uri: memoryForDate.mediaUrls[0] }} 
          style={dayStyles.dayImage} 
        />
      ) : (
        <View style={dayStyles.noImage} />
      )}
      <Text style={dayStyles.dayText}>{date.day}</Text>
    </TouchableOpacity>
  );
}

interface MemoriesProps {
  loading: boolean;
  memories: any[];
}

export default function Memories({ loading, memories }: MemoriesProps) {
  if (loading) {
    return (
        <Text>Loading...</Text>
    );
  }

  const currentDate = new Date();
  const INITIAL_DATE = currentDate.toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Header 
        title="Memories"
        onBackPress={() => router.back()}
      />

      <Calendar
        current={INITIAL_DATE}
        firstDay={1}
        hideExtraDays
        onDayPress={() => {}}
        dayComponent={({ date }: any) => (
          <DayComponent 
            date={date}
            imagesByDate={memories}
          />
        )}
        theme={{
          arrowColor: '#DE728D',
          textDayFontSize: 14,
          dayTextColor: '#1E1E1E',
        }}
      />
    </View>
  );
}

const dayStyles = StyleSheet.create({
  dayContainer: {
    width: s(40),
    height: s(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: s(2),
    position: 'relative',
  },
  dayImage: {
    width: s(40),
    height: s(50),
    borderRadius: s(6),
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  noImage: {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerBackground: {
    backgroundColor: '#E0EDFD',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: s(12),
    paddingLeft: 4, 
  },
  backIcon: {
    width: 12,
    height: 16,
    tintColor: '#242020',
    marginLeft: 5,
    marginRight: 5,
  },
  headerTitle: {
    color: '#242020',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    margin: s(15),
    borderRadius: s(20),
    paddingVertical: s(10),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
