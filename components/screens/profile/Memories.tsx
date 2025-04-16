import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { s } from 'react-native-size-matters';
import { router } from 'expo-router';

function DayComponent({ date, imagesByDate, onPress }) {
  const dateKey = date.dateString;
  const hasImage = imagesByDate[dateKey];

  return (
    <TouchableOpacity 
      style={dayStyles.dayContainer}
      onPress={() => onPress(date)}
    >
      {hasImage ? (
        <Image source={hasImage} style={dayStyles.dayImage} />
      ) : (
        <View style={dayStyles.noImage} />
      )}
      <Text style={dayStyles.dayText}>{date.day}</Text>
    </TouchableOpacity>
  );
}

const dayImages = {
  '2023-07-05': { uri: 'https://picsum.photos/id/237/200/300' },
  '2023-07-12': { uri: 'https://picsum.photos/id/238/200/300' },
  '2023-07-23': { uri: 'https://picsum.photos/id/239/200/300' },
};

export default function Memories() {
  const [imagesByDate, setImagesByDate] = useState({});

  useEffect(() => {
    setImagesByDate(dayImages);
  }, []);

  const currentDate = new Date();
  const INITIAL_DATE = currentDate.toISOString().split('T')[0];

  const handleDayPress = (day) => {
    console.log('Day pressed:', day);
    // Handle day press - e.g., open modal or navigate to detail screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Image 
                source={require("@/assets/icons/backArrow.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Memories</Text>
          </View>
        </SafeAreaView>
      </View>

      <Calendar
        current={INITIAL_DATE}
        firstDay={1}
        hideExtraDays
        onDayPress={handleDayPress}
        dayComponent={({ date }) => (
          <DayComponent 
            date={date} 
            imagesByDate={imagesByDate} 
            onPress={handleDayPress}
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
    marginRight: s(8),
  },
  backIcon: {
    width: 10,
    height: 15,
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
