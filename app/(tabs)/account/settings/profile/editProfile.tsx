import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
// Components
import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, ScrollView, Platform } from 'react-native';
import styles from '@/utils/testStyles';
import { router } from 'expo-router';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';
// Debug
import { debugRenders } from '@/utils/debug';
import { processAndUploadImage, pickImage as pickImageFromProcessing } from '@/utils/imageProcessing';
import { Picker } from '@react-native-picker/picker';
import { GENDER_OPTIONS, GOAL_OPTIONS } from '@/utils/userOptions';
import { TIMEZONE_OPTIONS } from '@/utils/timezoneProcessing';
function EditProfileScreen({
  user,
  isUserLoading,
  formData,
  handleFormDataChange,
  handleFormSubmit,
  isSubmitting,
}: {
  user: any,
  isUserLoading: boolean,
  formData: any,
  handleFormDataChange: any,
  handleFormSubmit: any,
  isSubmitting: boolean,
}) {
  const pickImage = async () => {
    const uri = await pickImageFromProcessing(handleFormDataChange);
    if (uri) {
      console.log('Picked image URI:', uri);
      handleFormDataChange('profile_picture', uri);
    }
  };

  if (isUserLoading || isSubmitting) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          <Image
            source={formData.profile_picture ? 
              { uri: formData.profile_picture } : 
              user.profile_picture ? 
                { uri: user.profile_picture } :
                { uri: DEFAULT_PROFILE_PICTURE }
            }
            style={styles.profileImage}
          />
          <TouchableOpacity 
            onPress={pickImage}
          >
            <Text style={styles.text}>Edit Photo</Text>
          </TouchableOpacity>
        </View>
      <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={formData.email}
          onChangeText={(text) => handleFormDataChange('email', text)}
          editable={false}
      />
      <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="gray"
          value={formData.first_name}
          onChangeText={(text) => handleFormDataChange('first_name', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="gray"
          value={formData.last_name}
          onChangeText={(text) => handleFormDataChange('last_name', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="gray"
          value={formData.username}
          onChangeText={(text) => handleFormDataChange('username', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="gray"
          value={formData.age.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            const numValue = text.replace(/[^0-9]/g, '');
            handleFormDataChange('age', numValue);
          }}
      />
      <View style={[styles.input, { paddingHorizontal: 0 }]}>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(value) => handleFormDataChange('gender', value)}
          style={{ color: formData.gender ? '#000' : 'gray' }}
        >
          {GENDER_OPTIONS.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
      <View style={[styles.input, { paddingHorizontal: 0 }]}>
        <Picker
          selectedValue={formData.timezone}
          onValueChange={(value) => handleFormDataChange('timezone', value)}
          style={{ color: formData.timezone ? '#000' : 'gray' }}
        >
          <Picker.Item label="Select Timezone" value="" />
          {TIMEZONE_OPTIONS.map((tz) => (
            <Picker.Item key={tz.value} label={tz.label} value={tz.value} />
          ))}
        </Picker>
      </View>
      <TextInput
          style={styles.input}
          placeholder="Bio"
          placeholderTextColor="gray"
          value={formData.bio}
          onChangeText={(text) => handleFormDataChange('bio', text)}
      />
      <View style={[styles.input, { paddingHorizontal: 0 }]}>
        <Picker
          selectedValue={formData.primary_goal}
          onValueChange={(value) => handleFormDataChange('primary_goal', value)}
          style={{ color: formData.primary_goal ? '#000' : 'gray' }}
        >
          {GOAL_OPTIONS.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
      <View style={[styles.input, { paddingHorizontal: 0 }]}>
        <Picker
          selectedValue={formData.secondary_goal}
          onValueChange={(value) => handleFormDataChange('secondary_goal', value)}
          style={{ color: formData.secondary_goal ? '#000' : 'gray' }}
        >
          {GOAL_OPTIONS.filter(option => option.value !== formData.primary_goal)
            .map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={styles.text}>Save Profile</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const EditProfilePage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number, !hasFetchedUser.current);

  useEffect(() => {
    if (!hasNewUserData) {
      return;
    }
    if (hasNewUserData) {
      userRef.current = user;
      initializeFormData();
      hasFetchedUser.current = true;
    }
    if (hasFetchedUser.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewUserData]);

  // Mutations
  const { updateUser } = useUpdateUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormSubmit = async (input: any) => {
    setIsSubmitting(true);
    try {
      console.log('Form Data:', formData);
      // Check if profile_picture has a value and process it
      if (formData.profile_picture) {
        console.log('Processing profile picture:', formData.profile_picture);
        const downloadURL = await processAndUploadImage(formData.profile_picture);
        formData.profile_picture = downloadURL; // Update the profile_picture with the download URL
      }

      const input = Object.fromEntries(
        Object.entries(formData)
          .filter(([key, value]) => value !== '' && key !== 'email')
          .map(([key, value]) => [
            key,
            key === 'age' ? Number(value) : value
          ])
      );
      console.log('Input:', input);
      const response = await updateUser(input, authToken);
      console.log('User updated successfully:', response);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Form Data
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    age: '',
    gender: '',
    profile_picture: '',
    timezone: '',
    bio: '',
    primary_goal: '',
    secondary_goal: '',
  });

  const handleFormDataChange = (field: string, value: string) => {
    setFormData((formData) => ({
      ...formData,
      [field]: value,
    }));
  };

  const initializeFormData = () => {
    setFormData({
      profile_picture: userRef.current.profile_picture || '',
      email: userRef.current.email || '',
      first_name: userRef.current.first_name || '',
      last_name: userRef.current.last_name || '',
      username: userRef.current.username || '',
      age: userRef.current.age || '',
      gender: userRef.current.gender || '',
      timezone: userRef.current.timezone || '',
      bio: userRef.current.bio || '',
      primary_goal: userRef.current.primary_goal || '',
      secondary_goal: userRef.current.secondary_goal || '',
    });
  };

  if (!userRef.current?.profile_picture) {
    formData.profile_picture = DEFAULT_PROFILE_PICTURE;
    console.log("Setting default profile picture", formData);
  } else {
    formData.profile_picture = '';
    console.log("Resetting profile picture form data", formData);
  }

  // Debug
  const loading = isSubmitting;
  if (debugRenders && !loading) {
    console.log("Rendering EditProfilePage\n",
      "User:", userRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
      "Form Data:", formData, "\n",
    );
  }

  return (
    <EditProfileScreen
      user={userRef.current}
      isUserLoading={!hasFetchedUser.current}
      formData={formData}
      handleFormDataChange={handleFormDataChange}
      handleFormSubmit={handleFormSubmit}
      isSubmitting={isSubmitting}
    />
  );
}

export default AuthWrapper(EditProfilePage);