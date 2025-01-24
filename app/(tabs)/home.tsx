import { StyleSheet, Image, Platform, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';


export default function HomeScreen() {

  return (
    <ScrollView style={styles.container}>

      <View style={styles.section}>
        <Text style={styles.text}>Quote of the Day</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Daily Goals</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Leaderboards</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#333', // Optional: adds visual separation between sections
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  communityName: {
    color: 'white',
    fontSize: 16,
    marginVertical: 4,
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 10,
  }
});