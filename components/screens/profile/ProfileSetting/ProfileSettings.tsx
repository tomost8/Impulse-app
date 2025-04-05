import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useUserInfo } from '@/services/UserContext';
import { router } from "expo-router";
import { s } from "react-native-size-matters";

function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Image
            source={require("@/assets/icons/backArrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Settings</Text>
      </View>
    </View>
  );
}

function SettingsItem({ 
  title, 
  icon, 
  onPress, 
  showArrow = true 
}: { 
  title: string, 
  icon: any, 
  onPress: () => void,
  showArrow?: boolean 
}) {
  return (
    <TouchableOpacity style={styles.settingsRow} onPress={onPress}>
      <View style={styles.settingsLeft}>
        <Image source={icon} style={styles.settingsIcon} />
        <Text style={styles.settingsText}>{title}</Text>
      </View>
      {showArrow && (
        <Image 
          source={require("@/assets/icons/arrowright.png")} 
          style={styles.arrowIcon}
        />
      )}
    </TouchableOpacity>
  );
}

function DualLensToggle() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.settingsRow}>
      <View style={styles.settingsLeft}>
        <Image 
          source={require("@/assets/icons/settingsCamera.png")} 
          style={styles.settingsIcon} 
        />
        <Text style={styles.settingsText}>Dual Lens Camera</Text>
      </View>
      <TouchableOpacity onPress={() => setIsEnabled(!isEnabled)}>
        <Image
          source={isEnabled ? 
            require("@/assets/icons/toggleOn.png") : 
            require("@/assets/icons/toggleOff.png")
          }
          style={styles.toggleIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

function LogoutButton() {
  const { logout } = useUserInfo();
  
  return (
    <TouchableOpacity 
      style={styles.logoutButton}
      onPress={async () => {
        await logout();
        router.push('/(auth)/getStarted');
      }}
    >
      <Image 
        source={require("@/assets/icons/logout.png")} 
        style={styles.logoutIcon} 
      />
      <Text style={styles.logoutText}>Log out</Text>
    </TouchableOpacity>
  );
}

function ProfileSettings() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <View style={styles.settingsContainer}>
          <SettingsItem
            title="Profile"
            icon={require("@/assets/icons/settingsProfile.png")}
            onPress={() => router.push('/account/settings/viewProfile')}
          />
          <SettingsItem
            title="Reminders and Notifications"
            icon={require("@/assets/icons/settingsNotification.png")}
            onPress={() => router.push('/account/settings/notifications')}
          />
          <SettingsItem
            title="Give Feedback"
            icon={require("@/assets/icons/settingsFeedback.png")}
            onPress={() => router.push('/account/settings/feedback')}
          />
          <SettingsItem
            title="Reset Password"
            icon={require("@/assets/icons/settingsResetPass.png")}
            onPress={() => router.push('/account/settings/password')}
          />
          <SettingsItem
            title="Support and Account Deletion"
            icon={require("@/assets/icons/settingsSupport.png")}
            onPress={() => router.push('/account/settings/deletion')}
          />
          <SettingsItem
            title="Feature Help Guide"
            icon={require("@/assets/icons/settingsGuide.png")}
            onPress={() => {}}
          />
          <DualLensToggle />
        </View>
        <LogoutButton />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#E0EDFD',
    paddingTop: s(25),
    paddingBottom: s(16),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(16),
  },
  backButton: {
    marginRight: s(8),
  },
  backIcon: {
    width: 10,
    height: 15,
    tintColor: '#242020',
    marginLeft: 5,
    marginRight: 5, 
  },
  headerTitle: {
    color: '#242020',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingTop: s(10),
  },
  settingsContainer: {
    paddingHorizontal: s(20),
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: s(12),
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    width: s(22),
    height: s(22),
    marginRight: s(12),
    resizeMode: 'contain',
  },
  settingsText: {
    fontSize: s(15),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#242020',
  },
  arrowIcon: {
    width: s(24),
    height: s(24),
    tintColor: '#5E6676',
  },
  toggleIcon: {
    width: s(51),
    height: s(31),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DE728D',
    marginHorizontal: s(20),
    marginTop: s(175),
    marginBottom: s(20),
    padding: s(13),
    borderRadius: s(100),
  },
  logoutIcon: {
    width: s(20),
    height: s(20),
    marginRight: s(8),
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: s(16),
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default ProfileSettings;
