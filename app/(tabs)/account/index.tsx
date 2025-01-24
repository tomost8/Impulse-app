import { router } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default function AccountScreen() {
  return (
    <View style={styles.titleContainer}>
        <Text style={styles.text}>
            Hello World (account)
        </Text>
        <TouchableOpacity onPress={() => router.push('account/settings')}>
            <Text style={styles.text}>
                Settings
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('account/friends')}>
            <Text style={styles.text}>
                Friends
            </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  },
});
