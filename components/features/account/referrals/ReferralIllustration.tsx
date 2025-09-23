import React from "react";
import { View, Image, StyleSheet } from "react-native";

const ReferralIllustration = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/referrals/greencheck.png")} // replace with your asset
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  image: {
    width: 220,
    height: 160,
  },
});

export default ReferralIllustration;
