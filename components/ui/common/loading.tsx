import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#DE728D" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },
});