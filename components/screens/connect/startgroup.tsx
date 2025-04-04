import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

interface StartGroupScreenProps {
  loading: boolean;
  formData: {
    name: string;
    profile_pic: string | null;
    isPasswordEnabled: boolean;
    password: string;
    confirm_password: string;
  };
  handleFormDataChange: (field: string, value: string) => void;
  handlePasswordToggle: (field: string, value: boolean) => void;
  handleCreateGroup: () => void;
}

const StartGroupScreen = (props: StartGroupScreenProps) => {
  if (props.loading) {
    return (
      <Text>Loading...</Text>
    );
  }

  const [errorMessage, setErrorMessage] = useState('');

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        props.handleFormDataChange('profile_pic', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const checkCreate = () => {
    setErrorMessage('');

    if (!props.formData.profile_pic) {
      setErrorMessage('Error: Must upload a profile picture');
      return;
    }

    if (!props.formData.name.trim()) {
      setErrorMessage('Error: Must enter a group name');
      return;
    }

    if (props.formData.isPasswordEnabled && 
        props.formData.password !== props.formData.confirm_password) {
      setErrorMessage('Error: Password does not match');
      return;
    }

    props.handleCreateGroup();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Image 
                source={require("@/assets/icons/backArrow.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Starting My Own Group</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Image Upload */}
            <TouchableOpacity 
              style={styles.imageUploadContainer}
              onPress={handleImagePick}
            >
              {props.formData.profile_pic ? (
                <Image
                  source={{ uri: props.formData.profile_pic }}
                  style={styles.groupImage}
                />
              ) : (
                <>
                  <Image 
                    source={require("@/assets/icons/addphoto.png")}
                    style={styles.uploadIcon}
                  />
                  <Text style={styles.uploadText}>Upload Image</Text>
                  <Text style={styles.imageSizeText}>120x120</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Group Name Input */}
            <TextInput
              style={styles.input}
              placeholder="Group Name"
              value={props.formData.name}
              onChangeText={(text) => props.handleFormDataChange('name', text)}
            />

            {/* Password Toggle */}
            <View style={styles.passwordToggleContainer}>
              <Text style={styles.passwordLabel}>Password</Text>
              <TouchableOpacity 
                onPress={() => props.handlePasswordToggle('isPasswordEnabled', !props.formData.isPasswordEnabled)}
              >
                <Image 
                  source={props.formData.isPasswordEnabled ? 
                    require("@/assets/icons/toggleOn.png") : 
                    require("@/assets/icons/toggleOff.png")
                  }
                  style={styles.toggleIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Password Inputs (Conditional) */}
            {props.formData.isPasswordEnabled && (
              <>
                <TextInput
                  style={styles.input}
                  value={props.formData.password}
                  onChangeText={(text) => props.handleFormDataChange('password', text)}
                  placeholder="Enter password"
                  placeholderTextColor="#979797"
                  secureTextEntry={false}
                />
                <TextInput
                  style={styles.input}
                  value={props.formData.confirm_password}
                  onChangeText={(text) => props.handleFormDataChange('confirm_password', text)}
                  placeholder="Confirm password"
                  placeholderTextColor="#979797"
                  secureTextEntry={false}
                />
              </>
            )}

            {/* Error Message Display */}
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      {/* Create Button */}
      <TouchableOpacity 
        style={styles.createButton}
        onPress={checkCreate}
      >
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    height: 65,
    backgroundColor: '#E0EDFD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#242020',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#242020',
    marginLeft: 6,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    alignItems: 'center',
  },
  imageUploadContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#DE728D',
    marginBottom: 4,
  },
  uploadText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#DE728D',
  },
  imageSizeText: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  groupImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#242020',
    marginBottom: 16,
  },
  passwordToggleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  passwordLabel: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: "600",
    marginLeft: 4, 
    color: '#000000',
  },
  toggleIcon: {
    width: 51,
    height: 31,
    resizeMode: 'contain',
  },
  createButton: {
    width: '90%',
    height: 48,
    backgroundColor: '#DE728D',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 32,
    alignSelf: 'center',
  },
  createButtonText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorText: {
    color: '#DE728D',
    fontSize: 12,
    fontFamily: 'Open Sans',
    marginTop: 8,
    marginBottom: 16,
    alignSelf: 'flex-start',
    paddingLeft: 16,
  },
});

export default StartGroupScreen;
