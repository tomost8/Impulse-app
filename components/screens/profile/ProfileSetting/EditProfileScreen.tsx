import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import PickerModal from "@/components/ui/common/pickers/PickerModal";
import { TIMEZONE_OPTIONS } from "@/utils/timezoneProcessing";
import { GENDER_OPTIONS, GOAL_OPTIONS } from "@/utils/userOptions";
import { getLabelByCategory } from "@/utils/goals";
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';
import { pickImage } from "@/utils/imageProcessing";
import { router } from "expo-router";
import { s } from "react-native-size-matters";

interface ProfileScreenProps {
  formData: any;
  handleFormDataChange: (field: string, value: string) => void;
  handleFormSubmit: (input: any) => void;
  isSubmitting: boolean;
}

const ProfileScreen = ({ formData, handleFormDataChange, handleFormSubmit, isSubmitting }: ProfileScreenProps) => {
  // Modal States
  const [isGenderModalVisible, setGenderModalVisible] = useState(false);
  const [isTimezoneModalVisible, setTimezoneModalVisible] = useState(false);
  const [isPrimaryGoalModalVisible, setPrimaryGoalModalVisible] = useState(false);
  const [isSecondaryGoalModalVisible, setSecondaryGoalModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
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
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={() => pickImage(handleFormDataChange)}>
          <Image
            source={{
              uri: formData.profile_picture ? formData.profile_picture : DEFAULT_PROFILE_PICTURE,
            }}
            style={[styles.profileImage, { borderWidth: 1, borderColor: 'black' }]}
            accessibilityLabel="Profile picture"
          />
        </TouchableWithoutFeedback>

        <Text style={styles.sectionTitle}>Personal Profile</Text>

        <ProfileField label="Email" value={formData.email} onChange={(newValue) => handleFormDataChange('email', newValue)} editable={false} />
        <ProfileField label="First Name" value={formData.first_name} onChange={(newValue) => handleFormDataChange('first_name', newValue)} />
        <ProfileField label="Last Name" value={formData.last_name} onChange={(newValue) => handleFormDataChange('last_name', newValue)} />
        <ProfileField label="Username" value={formData.username} onChange={(newValue) => handleFormDataChange('username', newValue)} />

        <View style={styles.row}>
          <ProfileNumberButton 
            label="Age" 
            value={String(formData.age)} 
            style={styles.halfWidth} 
            onPress={(value) => handleFormDataChange('age', value)}
          />
          <ProfileDropdown 
            label="Gender" 
            value={formData.gender} 
            style={styles.halfWidth} 
            onPress={() => setGenderModalVisible(true)}
          />
        </View>

        <ProfileDropdown 
          label="Timezone" 
          value={formData.timezone} 
          onPress={() => setTimezoneModalVisible(true)}
        />

        <ProfileField
          label="Bio"
          value={formData.bio}
          multiline
          onChange={(newValue) => handleFormDataChange('bio', newValue)}
        />

        <Text style={styles.sectionTitle}>Goal Setting</Text>

        <View style={styles.goalContainer}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalLabel}>Primary Goal</Text>
            <Text style={styles.pointsText}>100 points</Text>
          </View>
          <ProfileDropdown label="" value={getLabelByCategory(formData.primary_goal)} onPress={() => setPrimaryGoalModalVisible(true)} />
        </View>

        <View style={styles.goalContainer}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalLabel}>Secondary Goal</Text>
            <Text style={styles.pointsText}>75 points</Text>
          </View>
          <ProfileDropdown label="" value={getLabelByCategory(formData.secondary_goal)} onPress={() => setSecondaryGoalModalVisible(true)} />
        </View>

        <TouchableOpacity
          style={styles.editButton}
          accessibilityRole="button"
          accessibilityLabel="Save profile changes"
          onPress={() => handleFormSubmit(formData)}
        >
          <Text style={styles.editButtonText}>Save</Text>
        </TouchableOpacity>

        {/* Gender */}
        <PickerModal
          visible={isGenderModalVisible}
          onClose={() => setGenderModalVisible(false)}
          onValueSelected={(value) => handleFormDataChange('gender', value)}
          selectedValue={formData.gender}
          options={GENDER_OPTIONS}
          placeholder="Select Gender"
        />

        {/* Timezone Picker Modal */}
        <PickerModal
          visible={isTimezoneModalVisible}
          onClose={() => setTimezoneModalVisible(false)}
          onValueSelected={(value) => handleFormDataChange('timezone', value)}
          selectedValue={formData.timezone}
          options={TIMEZONE_OPTIONS}
          placeholder="Select Timezone"
        />

        {/* Primary Goal Picker Modal */}
        <PickerModal
          visible={isPrimaryGoalModalVisible}
          onClose={() => setPrimaryGoalModalVisible(false)}
          onValueSelected={(value) => {
            // Clear secondary goal if it matches the new primary goal
            if (value === formData.secondary_goal) {
              handleFormDataChange('secondary_goal', '');
            }
            handleFormDataChange('primary_goal', value);
          }}
          selectedValue={formData.primary_goal}
          options={GOAL_OPTIONS}
          placeholder="Select Primary Goal"
        />

        {/* Secondary Goal Picker Modal */}
        <PickerModal
          visible={isSecondaryGoalModalVisible}
          onClose={() => setSecondaryGoalModalVisible(false)}
          onValueSelected={(value) => handleFormDataChange('secondary_goal', value)}
          selectedValue={formData.secondary_goal}
          options={[
            { label: 'Select Secondary Goal', value: '' },
            ...GOAL_OPTIONS.filter(goal => goal.value !== formData.primary_goal)
          ]}
        />
      </View>
    </ScrollView>
  );
};

const ProfileField = ({ label, value, multiline, style, onChange, editable = true }: 
  { label: string, value: string, multiline?: boolean, style?: any, onChange: (value: string) => void, editable?: boolean }
) => {
  return (
    <View style={[styles.fieldContainer, style]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.fieldInput, multiline && styles.multilineInput]}
        value={value}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        editable={editable}
        onChangeText={editable ? onChange : undefined}
        accessibilityLabel={`${label}: ${value}`}
      />
    </View>
  );
};

const ProfileNumberButton = ({ label, value, style, onPress }: 
  { label: string, value: string, style?: any, onPress: (value: string) => void }) => {
  return (
    <View style={[styles.fieldContainer, style]}>
      {label && <Text style={styles.fieldLabel}>{label}</Text>}
      <TextInput
        style={styles.fieldInput}
        value={value}
        onChangeText={onPress}
        keyboardType="number-pad"
        accessibilityLabel={`Enter ${label}`}
      />
    </View>
  );
};

const ProfileDropdown = ({ label, value, style, onPress }: { label: string, value: string, style?: any, onPress: () => void }) => {
  return (
    <View style={[styles.fieldContainer, style]}>
      {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
      <TouchableOpacity
        style={styles.dropdown}
        accessibilityRole="button"
        accessibilityLabel={`Select ${label}: ${value}`}
        onPress={onPress}
      >
        <Text style={styles.dropdownText}>{value}</Text>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ab7928ee58d5e6eaacc9a47d497d2cb82fe4bd8bac2a9e4f266afd4199bba17",
          }}
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  contentContainer: {
    borderRadius: 30,
    maxWidth: 480,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignSelf: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    color: "#242020",
    marginBottom: 23,
    marginTop: 20,
  },
  fieldContainer: {
    marginBottom: 23,
  },
  fieldLabel: {
    fontFamily: "Open Sans",
    fontSize: 16,
    color: "#A4ACBC",
    marginBottom: 8,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: "rgba(225, 225, 225, 1)",
    borderRadius: 30,
    padding: 14,
    fontFamily: "Open Sans",
    fontSize: 16,
    color: "#000000",
  },
  multilineInput: {
    height: 190,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(225, 225, 225, 1)",
    borderRadius: 30,
    padding: 14,
  },
  dropdownText: {
    fontFamily: "Open Sans",
    fontSize: 16,
    color: "#000000",
  },
  dropdownIcon: {
    width: 16,
    height: 16,
  },
  goalContainer: {
    marginBottom: 5,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  goalLabel: {
    fontFamily: "Open Sans",
    fontSize: 16,
    color: "#A4ACBC",
  },
  pointsText: {
    fontFamily: "Open Sans",
    fontSize: 14,
    color: "#DE728D",
  },
  editButton: {
    backgroundColor: "#DE728D",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 15,
  },
  editButtonText: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default ProfileScreen;
