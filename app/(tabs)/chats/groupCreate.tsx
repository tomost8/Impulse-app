import {useState, useEffect, useRef} from 'react';
import { router } from 'expo-router';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { processAndUploadImage } from '@/utils/imageProcessing';
// GraphQL hooks
import { useCreateGroup } from '@/hooks/graphql/chats/mutations';
// Components
import StartGroupScreen from '@/components/screens/connect/startgroup';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';


const CreateGroupPage = () => {
  const {userId, authToken} = useUserInfo();

  // Mutations
  const {createGroup} = useCreateGroup();
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const handleCreateGroup = async () => {
    setIsCreatingGroup(true);
    let response_log = "";
    try {
      const profile_pic = await processAndUploadImage(formData.profile_pic);
      const input = {
        type: "group",
        creator_id: userId as number,
        profile_pic: profile_pic,
        title: formData.name,
        password: formData.isPasswordEnabled ? formData.password : null,
      };
      response_log += "Form Data:\n" + JSON.stringify(formData) + "\n";
      const response = await createGroup(input);
      if (response.success) {
        response_log = "Group created successfully with ID " + response.chat.id + ":\n" + response_log;
      } else {
        throw new Error("Response.success from createGroup was false:" + response.errors);
      }
      console.log(response_log);
      router.replace('/chats');
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setIsCreatingGroup(false);
    }
  };

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    profile_pic: '',
    isPasswordEnabled: false,
    password: '',
    confirm_password: '',
  });

  const handleFormDataChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handlePasswordToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      isPasswordEnabled: !prevData.isPasswordEnabled,
    }));
  };

  // Debug
  if (debugRenders) {
    console.log("Rendering CreateGroupPage");
  }

  return (
    <StartGroupScreen 
      loading={isCreatingGroup}
      formData={formData}
      handleFormDataChange={handleFormDataChange}
      handlePasswordToggle={handlePasswordToggle}
      handleCreateGroup={handleCreateGroup}
    />
  );
}

export default AuthWrapper(CreateGroupPage);
