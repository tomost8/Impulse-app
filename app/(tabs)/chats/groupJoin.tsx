import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';


export default function GroupJoinScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Join a Group</Text>
      </View>
    </View>
  );
}