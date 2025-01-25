import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';


export default function ActivityViewScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Food</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Wellness</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Working Out</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Studying / Working</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Rise and Shine</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>My Passion / Hobby</Text>
      </View>
    </View>
  );
}