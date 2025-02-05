import React, { useState } from 'react';
import styles from '@/constants/testStyles';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Switch } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { CREATE_CHAT } from '@/hooks/graphql/constants/chats';
import useUserInfo from '@/hooks/useUserInfo';

export default function GroupCreateScreen() {
  const {userId} = useUserInfo(); 
  const [formData, setFormData] = useState({
    profile_picture: '',
    group_name: '',
    password: '',
    confirm_password: '',
  });

  const [isPasswordOptional, setIsPasswordOptional] = useState(false);
  const [createChat] = useMutation(CREATE_CHAT);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCreateGroup = async () => {
    const { password, confirm_password } = formData;
    if (password !== confirm_password) {
      alert("Passwords do not match.");
      return;
    }
    if (!formData.group_name) {
      alert("Group name is required.");
      return;
    }
    if (!formData.profile_picture) {
      alert("Profile picture is required.");
      return;
    }

    const input = {
      type: "group",
      profile_pic: formData.profile_picture,
      title: formData.group_name,
      password: isPasswordOptional ? null : formData.password,
      creator_id: userId as number,
    };

    console.log(input);

    try {
      const { data } = await createChat({
        variables: {
          input,
        },
      });
      console.log('Chat created successfully:', data);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          placeholder="Profile Picture"
          value={formData.profile_picture}
          onChangeText={(text) => handleInputChange('profile_picture', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Group Name"
          value={formData.group_name}
          onChangeText={(text) => handleInputChange('group_name', text)}
      />
      <View >
        <Text style={styles.text}>Password</Text>
        <Switch
          value={isPasswordOptional}
          onValueChange={() => setIsPasswordOptional(!isPasswordOptional)}
        />
      </View>

      {!isPasswordOptional && (
        <>
          <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
          />
          <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={formData.confirm_password}
              onChangeText={(text) => handleInputChange('confirm_password', text)}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
        <Text style={styles.text}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
}