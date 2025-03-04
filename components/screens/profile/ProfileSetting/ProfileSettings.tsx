import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useUserInfo } from '@/services/UserContext';
import { router } from "expo-router";

function StatusBar() {
  return (
    <View style={styles.statusBar}>
      <Text style={styles.statusBarText}>9:41</Text>
    </View>
  );
}

function Header({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back">
        <Image
          resizeMode="contain"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1cf6bb94afb5d6115325e0467b1703e045f5e803b4808c857c76e41ac22db75f?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
          }}
          style={styles.backIcon}
          accessibilityLabel="Back arrow"
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

function SettingsItem({ title, icon, onPress }: { title: string, icon: string, onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.settingsItem} accessibilityRole="button" onPress={onPress}>
      <View style={styles.titleContainer}>
        <Text style={styles.settingsItemTitle}>{title}</Text>
      </View>
      <Image
        resizeMode="contain"
        source={{ uri: icon }}
        style={styles.settingsItemIcon}
        accessibilityLabel={`${title} icon`}
      />
    </TouchableOpacity>
  );
}

function LogoutButton() {
  const { logout } = useUserInfo();
  return (
    <TouchableOpacity style={styles.logoutButton} 
      onPress={async () => {
        await logout();
        router.push('/login');
      }}
      accessibilityRole="button"
    >
      <Text style={styles.logoutText}>Log out</Text>
    </TouchableOpacity>
  );
}

const settingsData = [
  {
    title: "Profile",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/04f4411f0aa9e54dd584399b6f29e82f98838c9db3341442840cf84e699b9e5b?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
    onPress: () => router.push('/account/settings/profile')
  },
  {
    title: "Reminders and Notifications",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/66b17b43478f6b836b40167500b35f5e0bf27316f52e75f0da57374dabf05796?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
    onPress: () => router.push('/account/settings/notifications')
  },
  {
    title: "Give Feedback",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d36419f949bae7f0a72c6e63590da697cec07f012076ae23f86e3fe5c9d6d38c?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
    onPress: () => router.push('/account/settings/feedback')
  },
  {
    title: "Reset Password",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b6da9d1a1978dbe7bfd30045f0de99205cd7ffb41deb21782f7fcd9e6f450a97?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
    onPress: () => router.push('/account/settings/password')
  },
  {
    title: "Support and Account Deletion",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f7b5683c63d4ab61ad16380b6a31e301b6f4172013255937e71993fe6998bafd?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
    onPress: () => router.push('/account/settings/deletion')
  },
];

function ProfileSettings() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Header title="Profile Settings" />
      <ScrollView style={styles.content}>
        <View style={styles.settingsContainer}>
          {settingsData.map((item, index) => (
            <SettingsItem key={index} title={item.title} icon={item.icon} onPress={item.onPress}/>
          ))}
          <View style={styles.dualLensContainer}>
            <Image
              resizeMode="contain"
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1c96ab32e166367e5bc9343db50222ddfe098276a956fede6ff699bd5c43f43c?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
              }}
              style={styles.dualLensImage}
              accessibilityLabel="Dual Lens Camera Icon"
            />
            <View style={styles.dualLensTextContainer}>
              <Text style={styles.dualLensText}>Dual Lens Camera</Text>
            </View>
          </View>
        </View>
        <LogoutButton />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 30,
    maxWidth: 480,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  statusBar: {
    paddingTop: 11,
  },
  statusBarText: {
    color: "#242020",
    textAlign: "center",
    fontFamily: "SF Pro Text, sans-serif",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: -0.41,
    marginLeft: 37,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 32,
    marginBottom: 9,
  },
  backIcon: {
    width: 7,
    aspectRatio: 0.5,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 21,
  },
  title: {
    fontFamily: "Poppins, sans-serif",
    color: "#242020",
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 47,
  },
  settingsContainer: {
    marginBottom: 20,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 37,
    paddingVertical: 10,
    marginBottom: 25,
  },
  settingsItemTitle: {
    fontFamily: "Open Sans, sans-serif",
    color: "#242020",
    fontWeight: "600",
    fontSize: 16,
  },
  settingsItemIcon: {
    width: 9,
    aspectRatio: 0.6,
  },
  dualLensContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
    paddingVertical: 2,
  },
  dualLensImage: {
    width: 23,
    aspectRatio: 1.04,
  },
  dualLensTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  dualLensText: {
    fontFamily: "Open Sans, sans-serif",
    color: "#242020",
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#DE728D",
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 70,
    alignItems: "center",
    marginTop: 30,
  },
  logoutText: {
    fontFamily: "Poppins, sans-serif",
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ProfileSettings;
