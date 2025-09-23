import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from "react-native";
import { router } from "expo-router";
import { s } from "react-native-size-matters";

import { useAuth } from '@/contexts/AuthContext';

import Header from "@/components/ui/common/headers/Header";

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

function DualLensToggle({ 
  isEnabled, 
  onToggle 
}: { 
  isEnabled: boolean;
  onToggle: (value: boolean) => Promise<void> | void;
}) {
  return (
    <View style={styles.settingsRow}>
      <View style={styles.settingsLeft}>
        <Image 
          source={require("@/assets/icons/settingsCamera.png")} 
          style={styles.settingsIcon} 
        />
        <Text style={styles.settingsText}>Dual Lens Camera</Text>
      </View>
      <TouchableOpacity onPress={() => onToggle(!isEnabled)}>
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
  const { logout } = useAuth();
  
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

interface ProfileSettingsProps {
  loading: boolean;
  isDoubleCameraEnabled: boolean;
  onToggleDoubleCamera: (value: boolean) => Promise<void> | void; 
}

function ProfileSettings({ isDoubleCameraEnabled, onToggleDoubleCamera, loading }: ProfileSettingsProps) {
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(!loading && isDoubleCameraEnabled);
  const handleSwitchToggle = async (value: boolean) => {
    try {
      await onToggleDoubleCamera(value);
      setIsSwitchEnabled(value);
    } catch (error) {
      console.error('Failed to update dual lens settings:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Settings"
        onBackPress={() => router.back()}
      />

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
            icon={require("@/assets/icons/newFeedback.png")}
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
            icon={require("@/assets/icons/newInfo.png")}
            onPress={() => router.push('/(tabs)/account/settings/featureGuide')}
          />
          <DualLensToggle 
            isEnabled={isSwitchEnabled}
            onToggle={handleSwitchToggle}
          />
        </View>
        <LogoutButton />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerBackground: {
    backgroundColor: '#E0EDFD',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: s(12),
    paddingLeft: 4, 
  },
  backIcon: {
    width: 12,
    height: 16,
    tintColor: '#242020',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
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
    marginTop: s(230),
    marginBottom: 0,
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
