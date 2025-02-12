import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { SvgProps } from "react-native-svg";

// Update SVG imports to use .default
const HomeIconSvg = require("../../../assets/icons/home2.svg").default;
const ProfileIconSvg = require("../../../assets/icons/profile.svg").default;
const PeopleIconSvg = require("../../../assets/icons/people.svg").default;
const BarChartIconSvg = require("../../../assets/icons/barchart-2.svg").default;
//import CameraIconSvg from "../../../assets/icons/camera.svg";

const BottomNav = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
        <HomeIconSvg width="24" height="24" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Community")}>
        <PeopleIconSvg width="24" height="24" />
        <Text style={styles.label}>Community</Text>
      </TouchableOpacity>

      {/* Center Floating Camera Button */}
      <View style={styles.cameraWrapper}>
        <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate("Camera")}>
          {/* <CameraIconSvg width={28} height={28} /> */}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Leaderboard")}>
        <BarChartIconSvg width="24" height="24" />
        <Text style={styles.label}>Stats</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Profile")}>
        <ProfileIconSvg width="24" height="24" />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define PropTypes for clarity
BottomNav.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: "#333",
  },
  cameraWrapper: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    marginLeft: -30,
  },
  cameraButton: {
    width: 60,
    height: 60,
    backgroundColor: "pink",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
  },
});

export default BottomNav;
