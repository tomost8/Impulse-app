import styles from '@/constants/testStyles';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Switch } from 'react-native-paper';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useCreateGroup } from '@/hooks/graphql/chats/mutations';
// Components
// Debug
import { debugRenders } from '@/constants/debug';

function CreateGroupScreen({
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
  if (isCreatingGroup) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          placeholder="Profile Picture"
          value={formData.profile_picture}
          onChangeText={(text) => handleFormDataChange('profile_picture', text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Group Name"
          value={formData.group_name}
          onChangeText={(text) => handleFormDataChange('group_name', text)}
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
              onChangeText={(text) => handleFormDataChange('password', text)}
          />
          <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={formData.confirm_password}
              onChangeText={(text) => handleFormDataChange('confirm_password', text)}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
        <Text style={styles.text}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
}

const CreateGroupPage = (props: any) => {
  const {userId, authToken} = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Mutations
  const {createGroup} = useCreateGroup();
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const handleCreateGroup = async (input: any) => {
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
    // Create Group
    setIsCreatingGroup(true);
    try {
      const input = {
        type: "group",
        profile_pic: formData.profile_picture,
        title: formData.group_name,
        password: isPasswordOptional ? null : formData.password,
        creator_id: userId as number,
      };
      const response = await createGroup(input);
      if (response.success) {
        console.log('Group created successfully:', response);
      } else {
        console.log('Error creating group:', response.errors);
      }
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setIsCreatingGroup(false);
    }
  };

  // Form Data
  const [isPasswordOptional, setIsPasswordOptional] = useState(false);

  const [formData, setFormData] = useState({
    profile_picture: '',
    group_name: '',
    password: '',
    confirm_password: '',
  });

  const handleFormDataChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Debug
  if (debugRenders) {
    console.log("Rendering CreateGroupPage");
  }

  return (
    <CreateGroupScreen
      formData={formData}
      handleFormDataChange={handleFormDataChange}
      handleCreateGroup={handleCreateGroup}
      isCreatingGroup={isCreatingGroup}
      isPasswordOptional={isPasswordOptional}
      setIsPasswordOptional={setIsPasswordOptional}
    />
  );
}

export default AuthWrapper(CreateGroupPage);
