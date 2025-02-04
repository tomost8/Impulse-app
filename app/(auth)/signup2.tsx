import { useState } from 'react';
import styles from '@/constants/testStyles';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator, Platform, Pressable, Modal, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
import { auth } from '@/config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/services/api/auth';

export default function Signup2() {
  const params = useLocalSearchParams();
  const { email, password, firstName, lastName, username } = params;
  console.log('params', params);

  const [bio, setBio] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState('');
  const [timezone, setTimezone] = useState(moment.tz.guess());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showTimezonePicker, setShowTimezonePicker] = useState(false);

  const [firebaseAuth] = useMutation(FIREBASE_AUTH, {
    onError: (error) => {
      console.error('GraphQL Error:', error);
      setError(error.message);
    }
  });

  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  const timezoneOptions = moment.tz.names();

  const handleSignup = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email as string, password as string);
      // currently not storing in firestore, only in firebase auth
      const authToken = await userCredential.user.getIdToken();
      const firebase_uid = userCredential.user.uid;

      const { data } = await firebaseAuth({
        variables: {
          input: {
            email,
            firebase_uid,
            first_name: firstName,
            last_name: lastName,
            dob: dateOfBirth.toISOString().split('T')[0],
            gender,
            timezone,
            username,
            bio,
          }
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      });

      if (data?.createUser?.success) {
        await AsyncStorage.setItem('authToken', authToken);
        if (data.createUser.user) {
          await AsyncStorage.setItem('userId', String(data.createUser.user.id));
          await AsyncStorage.setItem('idFirebase', firebase_uid);
        }
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      console.log('Signup failed', error);
      setError(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDateOfBirth(selectedDate);
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
      
      {(showDatePicker || Platform.OS === 'ios') && (
        <Modal
          transparent={true}
          visible={showDatePicker}
          animationType="slide"
        >
          <View style={dateStyles.modalContainer}>
            <View style={dateStyles.modalContent}>
              <DateTimePicker
                textColor="black"
                value={dateOfBirth}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
                style={dateStyles.datePicker}
              />
              {Platform.OS === 'ios' && (
                <Pressable 
                  style={dateStyles.modalButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text>Confirm</Text>
                </Pressable>
              )}
            </View>
          </View>
        </Modal>
      )}

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
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{dateOfBirth.toLocaleDateString() || "Select Date of Birth"}</Text>
      </Pressable>

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
      
      {isLoading ? (
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