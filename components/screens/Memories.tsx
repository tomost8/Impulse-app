import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { s } from 'react-native-size-matters';

// In a single file, define the DayComponent inline:
function DayComponent({ date, imagesByDate }) {
  const dateKey = date.dateString; // e.g. "2023-07-03"
  const hasImage = imagesByDate[dateKey];

  return (
    <View style={dayStyles.dayContainer}>
      {hasImage ? (
        <Image source={hasImage} style={dayStyles.dayImage} />
      ) : (
        <View style={dayStyles.noImage} />
      )}
      <Text style={dayStyles.dayText}>{date.day}</Text>
    </View>
  );
}

// Example images (replace these URIs with your own images or require() statements)
const dayImages = {
  '2023-07-05': { uri: 'https://picsum.photos/id/237/200/300' },
  '2023-07-12': { uri: 'https://picsum.photos/id/238/200/300' },
  '2023-07-23': { uri: 'https://picsum.photos/id/239/200/300' },
};

export default function App() {
  const [imagesByDate, setImagesByDate] = useState({});

  // For demonstration, we’ll just hard-code some data on mount
  useEffect(() => {
    // In a real app, you might fetch from an API or local DB
    setImagesByDate(dayImages);
  }, []);

  // Check if there is any image for the current month
  const anyImages = Object.keys(imagesByDate).length > 0;

  // The current date
  const currentDate = new Date();
  const INITIAL_DATE = currentDate.toISOString().split('T')[0];

  const handleDayPress = (day) => {
    console.log('Day pressed:', day);
    // You could navigate to a “detail” screen or open a modal if desired
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Memories</Text>
        </View>

        {/* Calendar Container */}
        <View style={styles.calendarContainer}>
          <Calendar
            current={INITIAL_DATE}
            firstDay={1}
            hideExtraDays
            onDayPress={handleDayPress}
            dayComponent={({ date }) => (
              <DayComponent date={date} imagesByDate={imagesByDate} />
            )}
            theme={{
              // Primary color for calendar arrows
              arrowColor: '#DE728D',
              textDayFontSize: 14,
              dayTextColor: '#1E1E1E',
            }}
          />
        </View>

        {/* Monthly Recap Card */}
        {anyImages && (
          <View style={styles.monthlyRecapContainer}>
            <Text style={styles.monthlyRecapTitle}>View Monthly Recap</Text>
            <TouchableOpacity
              style={styles.monthlyRecapButton}
              onPress={() => {
                console.log('Navigating to Monthly Recap screen...');
                // e.g. navigation.navigate('MemoriesRecap', { posts: ... })
              }}
            >
              {/* Example image placeholder - can be removed or replaced */}
              <Image
                source={{
                  uri: 'https://via.placeholder.com/150/FF7F7F/FFFFFF?text=Recap',
                }}
                style={styles.monthlyRecapImage}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
    zIndex: 1, // ensures text is on top of the image
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // Updated to the new background color
    backgroundColor: '#E0EDFD',
  },
  root: {
    flex: 1,
  },
  header: {
    backgroundColor: '#E0EDFD',
    paddingVertical: s(15),
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: s(18),
    fontWeight: '600',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    margin: s(15),
    borderRadius: s(20),
    paddingVertical: s(10),
    // shadow or elevation for a card effect
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  monthlyRecapContainer: {
    backgroundColor: '#fff',
    marginHorizontal: s(15),
    marginBottom: s(30),
    borderRadius: s(20),
    padding: s(15),
    alignItems: 'center',
  },
  monthlyRecapTitle: {
    fontSize: s(16),
    fontWeight: '500',
    marginBottom: s(10),
  },
  monthlyRecapButton: {
    width: '100%',
    borderRadius: s(10),
    overflow: 'hidden',
    // Primary button color
    backgroundColor: '#DE728D',
  },
  monthlyRecapImage: {
    width: '100%',
    height: s(120),
    resizeMode: 'cover',
  },
});
