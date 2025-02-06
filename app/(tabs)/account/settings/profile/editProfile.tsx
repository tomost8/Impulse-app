import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '@/constants/testStyles';
import { router } from 'expo-router';
import { useGetUser } from '@/hooks/graphql/users/queries';
import useUserInfo from '@/hooks/useUserInfo';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@/hooks/graphql/users/mutations';

export default function EditProfileScreen() {
  const { authToken, userId } = useUserInfo();
  const { user } = useGetUser(userId as number);
  
  // Initialize state for form data
  const [formData, setFormData] = useState({
    profile_picture: '',
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    dob: '',
    gender: '',
    timezone: '',
    bio: '',
    primary_goal: '',
    secondary_goal: '',
  });

  const [updateUser] = useMutation(UPDATE_USER);

  // Populate form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        profile_picture: user.profile_picture || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        username: user.username || '',
        dob: user.dob || '',
        gender: user.gender || '',
        timezone: user.timezone || '',
        bio: user.bio || '',
        primary_goal: user.primary_goal || '',
        secondary_goal: user.secondary_goal || '',
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const { data } = await updateUser({
        variables: {
          input: {
            profile_picture: formData.profile_picture,
            first_name: formData.first_name,
            last_name: formData.last_name,
            username: formData.username,
            dob: formData.dob,
            gender: formData.gender,
            timezone: formData.timezone,
            bio: formData.bio,
            primary_goal: formData.primary_goal,
            secondary_goal: formData.secondary_goal,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      console.log('Profile updated successfully:', data);
      router.push('/account/settings');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          placeholder="Profile Picture"
          placeholderTextColor="gray"
          value={formData.profile_picture}
          onChangeText={(text) => handleInputChange('profile_picture', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          editable={false}
      />
      <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="gray"
          value={formData.first_name}
          onChangeText={(text) => handleInputChange('first_name', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="gray"
          value={formData.last_name}
          onChangeText={(text) => handleInputChange('last_name', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="gray"
          value={formData.username}
          onChangeText={(text) => handleInputChange('username', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          placeholderTextColor="gray"
          value={formData.dob}
          onChangeText={(text) => handleInputChange('dob', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Gender"
          placeholderTextColor="gray"
          value={formData.gender}
          onChangeText={(text) => handleInputChange('gender', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Timezone"
          placeholderTextColor="gray"
          value={formData.timezone}
          onChangeText={(text) => handleInputChange('timezone', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Bio"
          placeholderTextColor="gray"
          value={formData.bio}
          onChangeText={(text) => handleInputChange('bio', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Primary Goal"
          placeholderTextColor="gray"
          value={formData.primary_goal}
          onChangeText={(text) => handleInputChange('primary_goal', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Secondary Goal"
          placeholderTextColor="gray"
          value={formData.secondary_goal}
          onChangeText={(text) => handleInputChange('secondary_goal', text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.text}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

