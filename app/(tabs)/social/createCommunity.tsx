import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { processAndUploadImage } from '@/utils/imageProcessing';
// GraphQL hooks
import { useCreateCommunity, useCreateCommunityCategory } from '@/hooks/graphql/communities/mutations';
// Components
import CreateCommunityScreen from '@/components/screens/social/communities/createcommunityscreen';
// Debug
import { debugRenders } from '@/utils/debug';


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