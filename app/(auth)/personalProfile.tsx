import { useState } from 'react';
import styles from '@/utils/testStyles';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator, Platform, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import moment from 'moment-timezone';
import { Picker } from '@react-native-picker/picker';
import { GENDER_OPTIONS } from '@/utils/userOptions';
import { TIMEZONE_OPTIONS } from '@/utils/timezoneProcessing';

import PersonalProfileScreen from '@/components/screens/SignupLogin/Signup/personalProfile';

// Signup Page 2
export default function PersonalProfile() {
  return <PersonalProfileScreen />;

  const params = useLocalSearchParams();
  const { email, password, firstName, lastName, username } = params;
  //console.log('params', params);

  const [bio, setBio] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState('');
  const [timezone, setTimezone] = useState('');

  const handleSignup = () => {
    if (!timezone) {
      alert('Please select a timezone');
      return;
    }
    
    router.push({
      pathname: '/(auth)/primaryGoal',
      params: {
        email,
        password,
        firstName,
        lastName,
        username,
        age,
        gender,
        timezone,
        bio,
      }
    });
  }


  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Age" 
        placeholderTextColor="gray"
        value={age !== null ? String(age) : ''}
        onChangeText={(text) => setAge(Number(text))}
        keyboardType="numeric"
        style={[styles.input]}
        maxLength={3}
      />

      <View style={dateStyles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={dateStyles.picker}
        >
          {GENDER_OPTIONS.map((option) => (
            <Picker.Item 
              key={option.value} 
              label={option.label} 
              value={option.value}
            />
          ))}
        </Picker>
      </View>

      <View style={dateStyles.pickerContainer}>
        <Picker
          selectedValue={timezone}
          onValueChange={(itemValue) => setTimezone(itemValue)}
          style={dateStyles.picker}
        >
          <Picker.Item label="Select Timezone" value="" />
          {TIMEZONE_OPTIONS.map((option) => (
            <Picker.Item 
              key={option.value} 
              label={option.label} 
              value={option.value}
            />
          ))}
        </Picker>
      </View>

      <TextInput 
        placeholder="Bio (optional)" 
        placeholderTextColor="gray"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={3}
        style={[dateStyles.input, dateStyles.bioInput]}
      />
      
      {false ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button 
          title="Sign Up" 
          onPress={handleSignup}
          disabled={!gender || !timezone}
        />
      )}
    </View>
  );
}

const dateStyles = StyleSheet.create({
  ...styles,
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
});