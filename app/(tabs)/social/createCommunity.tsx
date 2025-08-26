import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
import { processAndUploadImage } from '@/utils/imageProcessing';
import { router } from 'expo-router';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';
// GraphQL hooks
import { useCreateCommunity, useCreateCommunityCategory } from '@/hooks/graphql/communities/mutations';
// Components
import CreateCommunityScreen from '@/components/screens/social/main/createcommunityscreen';
// Debug
import { debugCreateCommunityPage } from '@/debug/utils';


const CreateCommunityPage = () => {
  const { fetching, user } = useDataProvider();

  // Mutations
  const {createCommunity} = useCreateCommunity();
  const {createCommunityCategory} = useCreateCommunityCategory();
  const [isCreatingCommunity, setIsCreatingCommunity] = useState(false);
  const handleCreateCommunity = async () => {
    if (fetching || !user?.id) {
      console.warn('Cannot create community: User data is not yet available');
      return;
    }

    setIsCreatingCommunity(true);
    let response_log = "";
    let communityId = null;
    try {
      const thumbnail = formData.thumbnail 
        ? await processAndUploadImage(formData.thumbnail)
        : null;
      const input = {
        influencer_id: user.id,
        name: formData.name,
        ...(formData.description && { description: formData.description }),
        ...(thumbnail && { thumbnail }),
        ...(formData.code && { code: formData.code }),
      }
      response_log += `Input: ${JSON.stringify(input)}\n`;

      const response = await createCommunity(input);
      if (response.success) {
        response_log += `Community successfully created: ${JSON.stringify(response.community)}\n`;
        communityId = response.community.id;
        // Create categories
        for (const category of selectedCategories) {
          const input_category = {
            community_id: communityId,
            category: category
          }
          const categoryResponse = await createCommunityCategory(input_category);
          if (categoryResponse.success) {
            response_log += `Category successfully added: ${categoryResponse.community_category.category}\n`;
          } else {
            throw new Error("Response.success from createCommunityCategory was false:" + categoryResponse.errors);
          }
        }
      } else {
        throw new Error("Response.success from createCommunity was false:" + response.errors);
      }
      console.log("Community successfully created:\n", response_log);
      await router.replace('/social');
      router.push(`/community/${communityId}`);
    } catch (error) {
      console.error('Error creating community:', error);
    } finally {
      setIsCreatingCommunity(false);
    }
  };

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    thumbnail: '',
    code: '',
  });

  const handleFormDataChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // Debug
  const loadingData = fetching || isCreatingCommunity;
  if (debugCreateCommunityPage && !loadingData) {
    const categoryList = selectedCategories.length > 0 ? selectedCategories.join(', ') : 'None';
    console.log(`📱 Rendering CreateCommunityPage\n  Form Data: ${JSON.stringify(formData)}\n  Selected Categories: ${categoryList}`);
  }

  return <CreateCommunityScreen
    loading={loadingData}
    formData={formData}
    handleFormDataChange={handleFormDataChange}
    selectedCategories={selectedCategories}
    handleToggleCategory={handleCategoryToggle}
    handleCreateCommunity={handleCreateCommunity}
  />;
};

export default AuthWrapper(CreateCommunityPage);