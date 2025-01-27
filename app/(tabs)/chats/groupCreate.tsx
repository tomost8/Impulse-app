import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';


export default function GroupCreateScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Image Upload</Text>
        <Text style={styles.text}>Form with group name</Text>
        <Text style={styles.text}>Password Toggle</Text>
        <Text style={styles.text}>Password form with confirm</Text>
        <Text style={styles.text}>Create Group Button</Text>
      </View>
    </View>
  );
}