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
  Platform
} from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const StartGroupScreen = () => {
  const [groupName, setGroupName] = useState('');
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [groupImage, setGroupImage] = useState<string | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setGroupImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleCreate = () => {
    console.log({
      groupName,
      isPasswordEnabled,
      password,
      confirmPassword,
      groupImage
    });
    // Handle group creation logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
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
            {groupImage ? (
              <Image
                source={{ uri: groupImage }}
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
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Group Name"
            placeholderTextColor="#979797"
          />

          {/* Password Toggle */}
          <View style={styles.passwordToggleContainer}>
            <Text style={styles.passwordLabel}>Password</Text>
            <TouchableOpacity 
              onPress={() => setIsPasswordEnabled(!isPasswordEnabled)}
            >
              <Image 
                source={isPasswordEnabled ? 
                  require("@/assets/icons/toggleOn.png") : 
                  require("@/assets/icons/toggleOff.png")
                }
                style={styles.toggleIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Password Inputs (Conditional) */}
          {isPasswordEnabled && (
            <>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor="#979797"
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm password"
                placeholderTextColor="#979797"
                secureTextEntry
              />
            </>
          )}

          {/* Create Button */}
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreate}
          >
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    marginLeft: 8,
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
    borderColor: '#DE728D',
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
    borderColor: '#DE728D',
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
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
    color: '#000000',
  },
  toggleIcon: {
    width: 51,
    height: 31,
    resizeMode: 'contain',
  },
  createButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#DE728D',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 32,
  },
  createButtonText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default StartGroupScreen;
