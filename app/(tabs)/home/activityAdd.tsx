import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { createActivity } from '@/hooks/api/useActivites';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List } from 'react-native-paper';
import useUserInfo from '@/hooks/useUserInfo';


export default function ActivityAddScreen() {
  const { authToken, userId } = useUserInfo();

  //input: name, description, category, duration, scheduledDatetime, postId, userId
  const handleActivityCreation = (category: string, date: string) => {
    const { activity, isLoading, error } = createActivity(
      authToken as string, // Pass the authToken as the first argument
      userId as number, // Replace with the actual userId
      category, // Use the passed category
      date, // Use the passed date
    );
    // Handle activity creation result (e.g., show a message, navigate, etc.)
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Accordion title="Food" id="1">
          //start time, activity duration, description
          <List.Item title="Additional information about Food" />
          <TouchableOpacity style={styles.button} onPress={() => handleActivityCreation('Food', '2025-01-15T13:00:00Z')}>
            <Text style={styles.text}>Create Food Activity</Text>
          </TouchableOpacity>
        </List.Accordion>
        <List.Accordion title="Wellness" id="2">
          <List.Item title="Additional information about Wellness" />
          <TouchableOpacity style={styles.button} onPress={() => handleActivityCreation('Wellness', '2025-01-15T13:00:00Z')}>
            <Text style={styles.text}>Create Wellness Activity</Text>
          </TouchableOpacity>
        </List.Accordion>
        <List.Accordion title="Working Out" id="3">
          <List.Item title="Additional information about Working Out" />
          <TouchableOpacity style={styles.button} onPress={() => handleActivityCreation('Working Out', '2025-01-15T13:00:00Z')}>
            <Text style={styles.text}>Create Working Out Activity</Text>
          </TouchableOpacity>
        </List.Accordion>
        <List.Accordion title="Studying / Working" id="4">
          <List.Item title="Additional information about Studying / Working" />
          <TouchableOpacity style={styles.button} onPress={() => handleActivityCreation('Studying / Working', '2025-01-15T13:00:00Z')}>
            <Text style={styles.text}>Create Studying / Working Activity</Text>
          </TouchableOpacity>
        </List.Accordion>
        <List.Accordion title="Rise and Shine" id="5">
          <List.Item title="Additional information about Rise and Shine" />
          <TouchableOpacity style={styles.button} onPress={() => handleActivityCreation('Rise and Shine', '2025-01-15T13:00:00Z')}>
            <Text style={styles.text}>Create Rise and Shine Activity</Text>
          </TouchableOpacity>
        </List.Accordion>
        <List.Accordion title="My Passion / Hobby" id="6">
          <List.Item title="Additional information about My Passion / Hobby" />
          <TouchableOpacity style={styles.button} onPress={() => handleActivityCreation('My Passion / Hobby', '2025-01-15T13:00:00Z')}>
            <Text style={styles.text}>Create My Passion / Hobby Activity</Text>
          </TouchableOpacity>
        </List.Accordion>
      </List.Section>
    </View>
  );
}