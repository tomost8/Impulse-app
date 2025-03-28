import { router, useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// Services
import { useUserInfo } from '@/services/UserContext';
import { processAndUploadImage } from '@/utils/imageProcessing';
// GraphQL hooks
import { useGetCommunity, useGetCommunityCategories } from '@/hooks/graphql/communities/queries';
import { useUpdateCommunity, useCreateCommunityCategory, useDeleteCommunityCategory } from '@/hooks/graphql/communities/mutations';
// Components
import EditCommunityScreen from '@/components/screens/social/communities/editcommunityscreen';
// Debug
import { debugRenders } from '@/utils/debug';

const EditCommunityPage = () => {
 const { id } = useLocalSearchParams(); // communityId 
 //const { userId, authToken } = useUserInfo();
 const [renderCounter, setRenderCounter] = useState(0);

 // Queries
 const communityRef = useRef<any | null>(null);
 const hasFetchedCommunity = useRef(false);
 const { community, fetched: hasNewCommunityData } = useGetCommunity(Number(id), !hasFetchedCommunity.current);

 const categoriesRef = useRef<any[] | null>(null);
 const hasFetchedCommunityCategories = useRef(false);
 const { communityCategories, fetched: hasNewCommunityCategoriesData } = useGetCommunityCategories(Number(id), !hasFetchedCommunityCategories.current);

 useEffect(() => {
   if (!hasNewCommunityData && !hasNewCommunityCategoriesData) {
     return;
   }
   if (hasNewCommunityData) {
      const communityInfo = {
        name: community.name,
        description: community.description,
        thumbnail: community.thumbnail
      }
     communityRef.current = communityInfo;
     hasFetchedCommunity.current = true;
     setFormData(communityInfo);
   }
   if (hasNewCommunityCategoriesData) {
     const categoryLabels = communityCategories.map((categoryObj: any) => categoryObj.category);
     categoriesRef.current = categoryLabels;
     setSelectedCategories(categoryLabels);
     hasFetchedCommunityCategories.current = true;
   }
   if (hasFetchedCommunity.current && hasFetchedCommunityCategories.current) {
     setRenderCounter(prev => prev + 1);
   }
 }, [hasNewCommunityData, hasNewCommunityCategoriesData]);

 // Mutations
 const {updateCommunity} = useUpdateCommunity();
 const {createCommunityCategory} = useCreateCommunityCategory();
 const {deleteCommunityCategory} = useDeleteCommunityCategory();
 const [isUpdatingCommunity, setIsUpdatingCommunity] = useState(false);
 const handleUpdateCommunity = async () => {
  setIsUpdatingCommunity(true);
  try {
    let response_log = "";
    // Update Community: upload new thumbnail if it exists
    const hasNewThumbnail = formData.thumbnail && formData.thumbnail !== communityRef.current?.thumbnail;
    const thumbnail = hasNewThumbnail
      ? await processAndUploadImage(formData.thumbnail)
      : null;
    const input = {
      name: formData.name || communityRef.current?.name,
      description: formData.description,
      ...(thumbnail && { thumbnail })
    }
    response_log += `Input: ${JSON.stringify(input)}\n`;
    
    const response = await updateCommunity(Number(id), input);
    if (response.success) {
      response_log += `Details successfully updated: ${JSON.stringify(response.community)}\n`;
    } else {
      throw new Error("Response.success from updateCommunity was false: " + response.errors);
    }

    // Update categories: toAdd
    const toAdd = selectedCategories.filter(category => !categoriesRef.current?.includes(category));  
    for (const category of toAdd) {
      const input_category_add = {
        community_id: Number(id),
        category: category
      }
      const categoryResponse = await createCommunityCategory(input_category_add);
      if (categoryResponse.success) {
        response_log += `Category successfully added: ${category}\n`;
      } else {
        throw new Error("Response.success from createCommunityCategory was false:" + categoryResponse.errors);
      }
    }

    // Update categories: toDelete
    const toDelete = categoriesRef.current?.filter(category => !selectedCategories.includes(category)) || [];
    for (const category of toDelete) {
      const categoryResponse = await deleteCommunityCategory(category, Number(id));
      if (categoryResponse.success) {
        response_log += `Category successfully deleted: ${category}\n`;
      } else {
        throw new Error("Response.success from deleteCommunityCategory was false:" + categoryResponse.errors);
      }
    }
    
    console.log("Community updated successfully:\n", response_log);
    router.back();
  } catch (error) {
    console.error("Error updating community:", error);
  } finally {
    setIsUpdatingCommunity(false);
  }
 }

  // Form Data
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

 const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

 const handleCategoryToggle = (categoryId: string) => {
  setSelectedCategories(prev => 
    prev.includes(categoryId) 
      ? prev.filter(id => id !== categoryId)
      : [...prev, categoryId]
  );
};

 // Debug
 const loadingData = !hasFetchedCommunity.current || !hasFetchedCommunityCategories.current || isUpdatingCommunity;
 if (debugRenders && !loadingData) {
  console.log("Rendering EditCommunityPage. Counter: ", renderCounter,
    "\nCommunity:", communityRef.current,
    "\nForm Data:", formData,
    "\nCategories:", categoriesRef.current,
    "\nSelected Categories:", selectedCategories
  );
 }

  return (
    <EditCommunityScreen
      loading={loadingData}
      formData={formData}
      handleFormDataChange={handleFormDataChange}
      selectedCategories={selectedCategories}
      handleToggleCategory={handleCategoryToggle}
      handleUpdateCommunity={handleUpdateCommunity}
    />
  );
};

export default AuthWrapper(EditCommunityPage);