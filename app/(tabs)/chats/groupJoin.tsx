import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Searchbar } from 'react-native-paper';


export default function GroupJoinScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.section}>
      <Searchbar
          placeholder="Search username"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
        <Text style={styles.text}>We get all groups and display image + name + join button</Text>
      </View>
    </View>
  );
}