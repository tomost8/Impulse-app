import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { SvgXml } from "react-native-svg"; // ✅ Correctly handle SVGs

// Import SVGs correctly
import HomeIconSvg from "../../assets/icons/home2.svg";
import ProfileIconSvg from "../../assets/icons/profile.svg";
import PeopleIconSvg from "../../assets/icons/people.svg";
import BarChartIconSvg from "../../assets/icons/barchart-2.svg";
import CameraIconSvg from "../../assets/icons/camera.svg";

const BottomNav = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
        <SvgXml xml={HomeIcon} width={24} height={24} />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Community")}>
        <SvgXml xml={PeopleIcon} width={24} height={24} />
        <Text style={styles.label}>Community</Text>
      </TouchableOpacity>

      {/* Center Floating Camera Button */}
      <View style={styles.cameraWrapper}>
        <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate("Camera")}>
          <SvgXml xml={CameraIcon} width={28} height={28} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Leaderboard")}>
        <SvgXml xml={BarChartIcon} width={24} height={24} />
        <Text style={styles.label}>Stats</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Profile")}>
        <SvgXml xml={ProfileIcon} width={24} height={24} />
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
