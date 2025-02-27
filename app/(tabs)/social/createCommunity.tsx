import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { processAndUploadImage, pickImage as pickImageFromProcessing } from '@/utils/imageProcessing';
// GraphQL hooks
import { useCreateCommunity, useCreateCommunityCategory } from '@/hooks/graphql/communities/mutations';
// Components
import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { goals } from '@/utils/goals';
// Debug
import { debugRenders } from '@/utils/debug';

function CreateCommunityScreen({
  handleCreateCommunity,
  isCreatingCommunity,
  formData,
  handleFormDataChange,
  communityCategories,
  handleCategoryChange,
}: {
  handleCreateCommunity: (input: any) => void;
  isCreatingCommunity: boolean;
  formData: any;
  handleFormDataChange: (field: string, value: string) => void;
  communityCategories: string[];
  handleCategoryChange: (category: string) => void;
}) {
  const pickImage = async () => {
    const uri = await pickImageFromProcessing(handleFormDataChange);
    if (uri) {
      console.log('Picked image URI:', uri);
      handleFormDataChange('thumbnail', uri);
    }
  };
  if (isCreatingCommunity) {
    return <Text>Loading...</Text>;
  }
  return (
    <View>
      <Text>Create Community</Text>
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
      <TouchableOpacity onPress={pickImage}>
          {formData.thumbnail ? (
            <Image source={{ uri: formData.thumbnail }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImagePlaceholderText}>Upload Photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {goals.map((goal) => (
        <View key={goal.id} style={styles.checkbox}>
          <Text style={styles.text}>{goal.label}</Text>
          <Checkbox
            status={communityCategories.includes(goal.category) ? 'checked' : 'unchecked'}
            onPress={() => handleCategoryChange(goal.category)}
          />
        </View>
      ))}
      <TouchableOpacity 
        style={[styles.button, !formData.name && {
          backgroundColor: 'gray',
          opacity: 0.5, 
        }]} 
        onPress={handleCreateCommunity} 
        disabled={!formData.name}
      >
        <Text>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const CreateCommunityPage = (props: any) => {
  const { userId, authToken } = props;

  // Mutations
  const {createCommunity} = useCreateCommunity();
  const {createCommunityCategory} = useCreateCommunityCategory();
  const [isCreatingCommunity, setIsCreatingCommunity] = useState(false);
  const handleCreateCommunity = async () => {
    setIsCreatingCommunity(true);
    const thumbnail = formData.thumbnail 
      ? await processAndUploadImage(formData.thumbnail)
      : null;
    try {
      const input = {
        influencer_id: userId,
        name: formData.name,
        ...(formData.description && { description: formData.description }),
        ...(thumbnail && { thumbnail }),
      }
      const response = await createCommunity(input);
      if (response.success) {
        const communityId = response.community.id;
        for (const category of communityCategories) {
          const input_category = {
            community_id: communityId,
            category: category
          }
          const categoryResponse = await createCommunityCategory(input_category);
          if (categoryResponse.success) {
          } else {
            throw new Error("createCommunityCategory response.success false:" + categoryResponse.errors);
          }
        }
        console.log("Community and Categories created successfully");
      } else {
        throw new Error("createCommunity response.success false:" + response.errors);
      }
    } catch (error) {
      console.error('Create Community failed:', error);
    } finally {
      setIsCreatingCommunity(false);
    }
  };

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    thumbnail: '',
  });
  const [communityCategories, setCommunityCategories] = useState<string[]>([]);

  // Form Data Handlers
  const handleFormDataChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCategoryChange = (category: string) => {
    setCommunityCategories((prev) => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // Debug
  if (debugRenders) {
    console.log("Rendering CreateCommunityPage");
  }

  return <CreateCommunityScreen
    handleCreateCommunity={handleCreateCommunity}
    isCreatingCommunity={isCreatingCommunity}
    formData={formData}
    handleFormDataChange={handleFormDataChange}
    communityCategories={communityCategories}
    handleCategoryChange={handleCategoryChange}
  />;
};

export default AuthWrapper(CreateCommunityPage);