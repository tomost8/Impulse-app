import { processAndUploadImage, pickImage as pickImageFromProcessing } from '@/utils/imageProcessing';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useCreateGroup } from '@/hooks/graphql/chats/mutations';
// Components
import StartGroupScreen from '@/components/screens/connect/startgroup';
// Debug
import { debugRenders } from '@/utils/debug';


const CreateGroupPage = (props: any) => {
  const {userId, authToken} = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Mutations
  const {createGroup} = useCreateGroup();
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const handleCreateGroup = async () => {
    setIsCreatingGroup(true);
    try {
      //const profile_pic = await processAndUploadImage(formData.profile_pic);
      const input = {
        type: "group",
        profile_pic: formData.profile_pic,
        title: formData.name,
        //password: isPasswordOptional ? null : formData.password,
        creator_id: userId as number,
      };
      console.log("Form Data:", formData, "\n", "Input:", input);
      /*
      const response = await createGroup(input);
      if (response.success) {
        console.log('Group created successfully:', response);
      } else {
        console.log('Error creating group:', response.errors);
      }
      */
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
