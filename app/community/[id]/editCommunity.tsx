import { useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useUpdateCommunity } from '@/hooks/graphql/communities/mutations';
// Components
import styles from '@/utils/testStyles';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import EditCommunityScreen from '@/components/screens/social/communities/editcommunity';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';
import { pickImage, processAndUploadImage } from '@/utils/imageProcessing';

function EditCommunityScreenOld({ 
    formData, handleFormDataChange, isUpdatingCommunity, handleUpdateCommunity 
}: { 
    formData: any, 
    handleFormDataChange: (field: string, value: string) => void, 
    isUpdatingCommunity: boolean, 
    handleUpdateCommunity: () => Promise<void> 
}) {
    if (isUpdatingCommunity) {
        return <Text>Loading...</Text>;
    }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Community</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={"gray"}
        value={formData.name}
        onChangeText={(text) => handleFormDataChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor={"gray"}
        value={formData.description}
        onChangeText={(text) => handleFormDataChange('description', text)}
      />
      <View style={styles.profileImageContainer}>
      <TouchableOpacity onPress={() => pickImage(handleFormDataChange, 'thumbnail')}>
          {formData.thumbnail ? (
            <Image source={{ uri: formData.thumbnail }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImagePlaceholderText}>Upload Photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateCommunity}>
        <Text style={styles.text}>Update Community</Text>
      </TouchableOpacity>
    </View>
  );
}

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
      formData={formData}
      handleFormDataChange={handleFormDataChange}
      isUpdatingCommunity={isUpdatingCommunity}
      handleUpdateCommunity={handleUpdateCommunity}
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