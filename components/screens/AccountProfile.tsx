import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export const AccountProfile = () => {
  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Account</Text>
          <Image
            source={{
              uri: "assets/images/Account/bigInfo.png",
            }}
            style={styles.settingsIcon}
            accessibilityLabel="Settings"
          />
      </View>

      <View style={styles.mainContent}>
        <Image
          source={{
            uri: "assets/images/Account/bigInfo.png",
          }}
          style={styles.profileImage}
          accessibilityLabel="Profile picture"
        />
        <Text style={styles.profileName}>First Name Last Name</Text>
        <Text style={styles.username}>@username</Text>

        {/* Points Section */}
        <View style={styles.pointsContainer}>
          <View style={styles.pointsHeader}>
            <Text style={styles.pointsGuide}>Points Earning Guide</Text>
            <Text style={styles.pointsValue}>5.1k / 7.5k pts</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
          </View>
          <Text style={styles.redeem}>Redeem</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Communities</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
        </View>

        <Text style={styles.bioText}>
          Lorem ipsum dolor sit amet consectetur. Elit nisi quam ac semper arcu.
          Magna suspendisse purus sed posuere tincidunt blandit nibh ornare
          nunc. Venenatis id quam gravida nisi. Morbi tincidunt convallis enim
          tristique mus. Tempus vitae morbi ut.
        </Text>

        {/* Working Section */}
        <View style={styles.workingSection}>
          <Text style={styles.sectionTitle}>What I'm Working On</Text>
          <View style={styles.workItem}>
            <Text style={styles.workText}>Working Out</Text>
            <Text style={styles.workType}>(Primary)</Text>
          </View>
          <View style={styles.workItem}>
            <Text style={styles.workText}>Rise & Shine</Text>
            <Text style={styles.workType}>(Secondary)</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>Female</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Timezone</Text>
            <Text style={styles.infoValue}>GMT +5</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.memoriesButton}
          accessibilityRole="button"
        >
          <Text style={styles.memoriesButtonText}>View All Memories</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  timeContainer: {
    paddingLeft: 37,
  },
  timeText: {
    color: "#000",
    fontFamily: "System",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: -0.41,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  headerTitle: {
    fontFamily: "Poppins",
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  settingsIcon: {
    width: 23,
    height: 23,
  },
  mainContent: {
    paddingHorizontal: 20,
    alignItems: "center",
    paddingTop: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  profileName: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
    color: "#000",
  },
  username: {
    fontFamily: "OpenSans",
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    marginTop: 5,
  },
  pointsContainer: {
    width: "100%",
    marginTop: 35,
  },
  pointsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  pointsGuide: {
    fontFamily: "OpenSans",
    fontSize: 10,
    fontWeight: "700",
    color: "#010001",
    textDecorationLine: "underline",
  },
  pointsValue: {
    fontFamily: "OpenSans",
    fontSize: 10,
    color: "#000",
  },
  progressContainer: {
    backgroundColor: "#faeaee",
    borderRadius: 10,
    height: 11,
    width: "100%",
  },
  progressBar: {
    backgroundColor: "#de728d",
    borderRadius: 10,
    height: 11,
    width: "68%",
  },
  redeem: {
    color: "#010001",
    fontSize: 10,
    fontFamily: "OpenSans",
    fontWeight: "700",
    textDecorationLine: "underline",
    textAlign: "right",
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff0f1",
    borderRadius: 20,
    marginTop: 35,
    padding: 15,
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statNumber: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  statLabel: {
    fontFamily: "OpenSans",
    fontSize: 14,
    color: "#000",
    marginTop: 5,
  },
  divider: {
    width: 1,
    height: 47,
    backgroundColor: "#d9d9d9",
    marginHorizontal: 33,
  },
  bioText: {
    fontFamily: "OpenSans",
    fontSize: 16,
    lineHeight: 22,
    color: "#000",
    marginTop: 35,
    textAlign: "left",
  },
  workingSection: {
    marginTop: 35,
    width: "100%",
  },
  sectionTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  workItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  workText: {
    fontFamily: "OpenSans",
    fontSize: 16,
    color: "#000",
  },
  workType: {
    fontFamily: "OpenSans",
    fontSize: 14,
    color: "#000",
    marginLeft: 12,
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
    gap: 32,
  },
  infoColumn: {
    alignItems: "center",
  },
  infoLabel: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  infoValue: {
    fontFamily: "OpenSans",
    fontSize: 14,
    color: "#000",
    marginTop: 6,
  },
  memoriesButton: {
    borderWidth: 1,
    borderColor: "#de728d",
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginTop: 35,
    width: 145,
  },
  memoriesButtonText: {
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight: "600",
    color: "#010001",
    textAlign: "center",
  },
});

export default AccountProfile;