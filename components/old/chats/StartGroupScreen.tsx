import styles from '@/utils/testStyles';
import { View, Text, TextInput, TouchableOpacity,  Image } from 'react-native';
import { Switch } from 'react-native-paper';
import { processAndUploadImage, pickImage as pickImageFromProcessing } from '@/utils/imageProcessing';
import {useState, useEffect, useRef} from 'react';

export default function CreateGroupScreenOld({
    formData,
    handleFormDataChange,
    handleCreateGroup, 
    isCreatingGroup,
    isPasswordOptional,
    setIsPasswordOptional,
  }: {
    formData: any, 
    handleFormDataChange: any,
    handleCreateGroup: any, 
    isCreatingGroup: boolean,
    isPasswordOptional: boolean,
    setIsPasswordOptional: any,
  }) {
    const pickImage = async () => {
      const uri = await pickImageFromProcessing(handleFormDataChange);
      if (uri) {
        console.log('Picked image URI:', uri);
        handleFormDataChange('profile_picture', uri);
      }
    };
  
    if (isCreatingGroup) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={pickImage}>
            {formData.profile_picture ? (
              <Image
                source={{ uri: formData.profile_picture }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImagePlaceholderText}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <TextInput
            style={styles.input}
            placeholder="Group Name"
            value={formData.group_name}
            onChangeText={(text) => handleFormDataChange('group_name', text)}
        />
        <View >
          <Text style={styles.text}>Password</Text>
          <Switch
            value={!isPasswordOptional}
            onValueChange={() => setIsPasswordOptional(!isPasswordOptional)}
          />
        </View>
  
        {!isPasswordOptional && (
          <View>
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleFormDataChange('password', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={formData.confirm_password}
                onChangeText={(text) => handleFormDataChange('confirm_password', text)}
            />
          </View>
        )}
  
        <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
          <Text style={styles.text}>Create Group</Text>
        </TouchableOpacity>
      </View>
    );
  }