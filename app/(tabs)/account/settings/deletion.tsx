import { StyleSheet, View, Text } from 'react-native';


export default function DeletionScreen() {
  return (
    <View style={styles.titleContainer}>
        <Text style={styles.text}>
            deletion
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  },
});
