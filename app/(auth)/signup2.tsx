import { useState } from 'react';
import styles from '@/constants/testStyles';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator, Platform, Pressable, Modal, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation } from '@apollo/client';

import moment from 'moment-timezone';

export default function Signup2() {


  const params = useLocalSearchParams();
  const { email, password, firstName, lastName, username } = params;
  //console.log('params', params);

  const [bio, setBio] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState('');
  const [timezone, setTimezone] = useState(moment.tz.guess());

  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showTimezonePicker, setShowTimezonePicker] = useState(false);


  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  const timezoneOptions = moment.tz.names();

  const handleSignup = () => {
    router.push({
      pathname: '/(auth)/signup3',
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
        //community code
      }
    });
  }


  return (
    <View style={styles.container}>

      {/* Gender Picker Modal */}
      <Modal
        transparent={true}
        visible={showGenderPicker}
        animationType="slide"
      >
        <View style={dateStyles.modalContainer}>
          <View style={dateStyles.modalContent}>
            <ScrollView>
              {genderOptions.map((option) => (
                <Pressable
                  key={option}
                  style={dateStyles.pickerItem}
                  onPress={() => {
                    setGender(option);
                    setShowGenderPicker(false);
                  }}
                >
                  <Text style={[
                    dateStyles.pickerItemText,
                    gender === option && dateStyles.selectedItem
                  ]}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable 
              style={dateStyles.modalButton}
              onPress={() => setShowGenderPicker(false)}
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Timezone Picker Modal */}
      <Modal
        transparent={true}
        visible={showTimezonePicker}
        animationType="slide"
      >
        <View style={dateStyles.modalContainer}>
          <View style={dateStyles.modalContent}>
            <ScrollView>
              {timezoneOptions.map((option) => (
                <Pressable
                  key={option}
                  style={dateStyles.pickerItem}
                  onPress={() => {
                    setTimezone(option);
                    setShowTimezonePicker(false);
                  }}
                >
                  <Text style={[
                    dateStyles.pickerItemText,
                    timezone === option && dateStyles.selectedItem
                  ]}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable 
              style={dateStyles.modalButton}
              onPress={() => setShowTimezonePicker(false)}
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable 
        style={dateStyles.dateButton}
        onPress={() => {/* No longer needed for date picker */}}
      >
        <Text>{age !== null ? `${age} years` : "Enter Age"}</Text>
      </Pressable>

      <TextInput 
        placeholder="Age" 
        placeholderTextColor="gray"
        value={age !== null ? String(age) : ''}
        onChangeText={(text) => setAge(Number(text))}
        keyboardType="numeric"
        style={[styles.input]}
        maxLength={3} // Optional: limit input length
      />

      <Pressable 
        style={dateStyles.dateButton}
        onPress={() => setShowGenderPicker(true)}
      >
        <Text>{gender || "Select Gender"}</Text>
      </Pressable>

      <Pressable 
        style={dateStyles.dateButton}
        onPress={() => setShowTimezonePicker(true)}
      >
        <Text>{timezone || "Select Timezone"}</Text>
      </Pressable>

      <TextInput 
        placeholder="Bio (optional)" 
        placeholderTextColor="gray"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={3}
        style={[styles.input]}
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
  dateButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  datePicker: {
    height: 200,
    width: Platform.OS === 'ios' ? '100%' : undefined,
  },
  pickerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  pickerItemText: {
    fontSize: 16,
  },
  selectedItem: {
    color: 'blue',
    fontWeight: 'bold',
  },
});