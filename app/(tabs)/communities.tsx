import { StyleSheet, View, Text } from 'react-native';


export default function CommunityScreen() {
  return (
    <View style={styles.titleContainer}>
        <Text style={styles.text}>
            Hello World (communities)
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
