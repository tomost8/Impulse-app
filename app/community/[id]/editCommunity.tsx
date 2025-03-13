import { useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useUpdateCommunity } from '@/hooks/graphql/communities/mutations';
// Components
import EditCommunityScreen from '@/components/screens/social/communities/editcommunity';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';
import { processAndUploadImage } from '@/utils/imageProcessing';
import EditCommunityScreenOld from '@/components/old/social/community/EditCommunityScreen';

const EditCommunityPage = () => {
 const { userId, authToken } = useUserInfo();
 const { id } = useLocalSearchParams(); // communityId 
 // Mutations
 const {updateCommunity} = useUpdateCommunity();
 const [isUpdatingCommunity, setIsUpdatingCommunity] = useState(false);
 const handleUpdateCommunity = async () => {
  setIsUpdatingCommunity(true);
  try {
    const thumbnail = formData.thumbnail 
      ? await processAndUploadImage(formData.thumbnail)
      : null;
    // There is some issue with name being required or something?
    const input = {
      ...(formData.name && { name: formData.name }),
      ...(formData.description && { description: formData.description }),
      ...(thumbnail && { thumbnail })
    }
    console.log("input:", input);
    const response = await updateCommunity(Number(id), input);
    console.log(response);
  } catch (error) {
    console.error(error);
  } finally {
    setIsUpdatingCommunity(false);
  }
 }

 const [formData, setFormData] = useState({
  name: '',
  description: '',
  thumbnail: ''
 });

 const handleFormDataChange = (field: string, value: string) => {
  setFormData((prevData) => ({
    ...prevData,
    [field]: value,
  }));
 };

 if (pageDisplay) {
  return (
    <EditCommunityScreen
    />
  );
 } else {
  return (
    <EditCommunityScreenOld 
      formData={formData}
      handleFormDataChange={handleFormDataChange}
      isUpdatingCommunity={isUpdatingCommunity}
      handleUpdateCommunity={handleUpdateCommunity}
    />
  );
 }
};

export default AuthWrapper(EditCommunityPage);