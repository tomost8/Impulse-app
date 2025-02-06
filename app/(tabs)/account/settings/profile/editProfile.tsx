import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
// Components
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '@/constants/testStyles';
import { router } from 'expo-router';
// Debug
import { debugRenders } from '@/constants/debug';

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
  if (isUserLoading || isSubmitting) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          placeholder="Profile Picture"
          placeholderTextColor="gray"
          value={formData.profile_picture}
          onChangeText={(text) => handleFormDataChange('profile_picture', text)}
      />
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
          value={formData.age}
          onChangeText={(text) => handleFormDataChange('age', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Gender"
          placeholderTextColor="gray"
          value={formData.gender}
          onChangeText={(text) => handleFormDataChange('gender', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Timezone"
          placeholderTextColor="gray"
          value={formData.timezone}
          onChangeText={(text) => handleFormDataChange('timezone', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Bio"
          placeholderTextColor="gray"
          value={formData.bio}
          onChangeText={(text) => handleFormDataChange('bio', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Primary Goal"
          placeholderTextColor="gray"
          value={formData.primary_goal}
          onChangeText={(text) => handleFormDataChange('primary_goal', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Secondary Goal"
          placeholderTextColor="gray"
          value={formData.secondary_goal}
          onChangeText={(text) => handleFormDataChange('secondary_goal', text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={styles.text}>Save Profile</Text>
      </TouchableOpacity>
    </View>
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
      const input = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value !== '' && key !== 'email')
      );
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

  // Debug
  const loading = isSubmitting;
  if (debugRenders && !loading) {
    console.log("Rendering EditProfilePage\n",
      "User:", userRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
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